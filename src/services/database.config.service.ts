import { Injectable, OnModuleInit } from "@nestjs/common";
import { Character } from "src/database/models/character";
import { Origin } from "src/database/models/origin";

@Injectable()
export class DababaseConfigService implements OnModuleInit {
    onModuleInit() {
        Character.belongsTo(Origin);
        Origin.hasMany(Character);
    }
}