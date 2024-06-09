import { Controller, Get, Logger, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CharacterAttributes } from "src/database/models/character";
import ApiError from "src/dtos/responses/ApiErrors";
import { CharacterService } from "src/services/character.service";


@ApiTags('characters')
@Controller('characters')
export class CharacterController {
    
	private readonly logger = new Logger(CharacterService.name);

	constructor(private characters: CharacterService) {}

    public send(res: Response, statusCode: number = StatusCodes.OK): void {
		let obj = {};
		obj = res.locals.data;
		res.status(statusCode).send(obj);
	}

	@Get()
    public async getCharacter(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const id = req.params.id;
			const character: CharacterAttributes = await this.characters.getById(id);
			res.locals.data = character;
			// call base class method
			this.send(res);
		} catch (err) {
			next(err);
		}
	}

	@Post()
    public async createCharacter(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id, name, status, species, gender, OriginId } = req.body;
			
            if (!name || !id || !status || !species || !gender || !origin) {
				throw new ApiError(
					ReasonPhrases.BAD_REQUEST,
					StatusCodes.BAD_REQUEST,
				);
			}

			const character: CharacterAttributes = await this.characters.create({
                name,
				status,
				species,
				gender,
				OriginId				
			});

			res.locals.data = {
				character,
			};
			
			this.send(res, StatusCodes.CREATED);
		} catch (err) {
			next(err);
		}
	}	
}