import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Character } from '../model/character.model';
import { CreateCharacterInput } from '../model/create.character.input';
import { CharacterFilterInput } from '../model/character.filter.input';
import { CharacterService } from 'src/services/character.service';
import { Character as CharacterORM } from "src/database/models/character";
import { Op } from 'sequelize';
import { Origin } from 'src/database/models/origin';
import { hashString } from 'src/utils/hash.service';
import { RedisRepository } from 'src/redis/redis.repository';
import { Inject } from '@nestjs/common';
import { LogExecutionTime } from 'src/decorators/LogExecutionTime';

@Resolver(of => Character)
export class CharacterResolver {
    private characters: Character[] = [];

    constructor(
        private characterService: CharacterService, 
        @Inject(RedisRepository) private readonly redisRepository: RedisRepository
    ) { }

    @Query(returns => [Character])
    @LogExecutionTime()
    async getCharacters(@Args('filters', { nullable: true }) filters?: CharacterFilterInput): Promise<Character[]> {

        let filteredCharacters = this.characters;

        const key = hashString(JSON.stringify(filters));

        const data = await this.redisRepository.get('ghql-rnm-', key);
        if (data) return JSON.parse(data);

        const where: any = {};
        const originWhere: any = {};

        if (filters) {
            if (filters.id !== undefined) {
                where.id = filters.id;
            }
            if (filters.name) {
                where.name = { [Op.like]: `%${filters.name}%` };
            }
            if (filters.status) {
                where.status = { [Op.like]: `%${filters.status}%` };
            }
            if (filters.species) {
                where.species = { [Op.like]: `%${filters.species}%` };
            }
            if (filters.gender) {
                where.gender = { [Op.like]: `%${filters.gender}%` };
            }
            if (filters.originName) {
                originWhere.name = { [Op.like]: `%${filters.originName}%` };
            }
            if (filters.originDimension) {
                originWhere.dimension = { [Op.like]: `%${filters.originDimension}%` };
            }
        }                

        filteredCharacters = (await CharacterORM.findAll({ where, include: [{ model: Origin, where: originWhere }], }));

        this.redisRepository.setWithExpiry('ghql-rnm-', key, JSON.stringify(filteredCharacters), 60);

        return filteredCharacters;
    }

    @Mutation(returns => Character)
    createCharacter(@Args('createCharacterInput') createCharacterInput: CreateCharacterInput): Character {
        const character: Character = {
            id: this.characters.length + 1,
            ...createCharacterInput,
            origin: {
                name: createCharacterInput.originName,
                dimension: createCharacterInput.originDimension,
            },
        };
        this.characters.push(character);
        return character;
    }
}
