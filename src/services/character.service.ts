import { Character, CharacterAttributes, CharacterCreationAttributes } from "src/database/models/character";
import { Origin } from "src/database/models/origin";
import ApiError from "src/dtos/responses/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { GraphqlRickAnMortyService } from "./graphql.rnm.service";
import { ResultsDto } from "src/dtos/domain/character.response.dto";
import { getUniqueItemsById } from "src/utils/unique.service";

@Injectable()
export class CharacterService implements OnModuleInit {

    private readonly logger = new Logger(CharacterService.name);

    constructor(private gqlService: GraphqlRickAnMortyService) { }
    
    async onModuleInit() {
        this.logger.log('Running initial migration');
        await this.createInitials();           
    }

    async getById(id: string | number): Promise<CharacterAttributes> {
        try {
            const character = await Character.findByPk(id);
            if (!character) {
                throw new ApiError('Character not found', StatusCodes.NOT_FOUND);
            }
            return character;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async create(
        payload: CharacterCreationAttributes,
    ): Promise<CharacterAttributes> {
        try {
            const character = await Character.create(payload);
            return character;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async createInitials(): Promise<void> {

        try {

            const response = await this.gqlService.getInitial() as ResultsDto;
            const characters = response.characters.results.slice(0, 15);
            const origins = characters.filter(c => c.origin !== undefined).map(c => c.origin);

            const parsedOrigins = getUniqueItemsById(origins);

            for (const origin of parsedOrigins) {

                if(origin.id === null) continue;

                Origin.upsert(origin);
            }

            const charactersToInsert = characters.map(c => {
                return {
                    id: c.id,
                    name: c.name,
                    gender: c.gender,
                    species: c.species,
                    status: c.status,
                    OriginId: c.origin.id,
                } as CharacterAttributes
            });

            for(const character of charactersToInsert) {
                Character.upsert(character);
            }

        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}