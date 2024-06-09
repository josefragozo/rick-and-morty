import { Origin } from "src/database/models/origin";


export class CharacterDto {
    id?: number;
    name: string;
    status: string;
    species: string;    
    gender: string;
    origin?: Origin;
}