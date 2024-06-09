import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../index';

// Define the attributes interface
interface CharacterAttributes {
    id?: number;
    name: string;
    status: string;
    species: string;    
    gender: string;
    OriginId?: number;
    created?: Date;
    updated?: Date;
}

// Optional fields for creation
interface CharacterCreationAttributes extends Optional<CharacterAttributes, 'id'> { }

// Define the Character model
class Character extends Model<CharacterAttributes, CharacterCreationAttributes> implements CharacterAttributes {
    public id!: number;
    public name!: string;
    public status!: string;
    public species!: string;
    public gender!: string;
    public OriginId!: number;

    public readonly created!: Date;
}

// Initialize the Character model
Character.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        species: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        OriginId: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize,
        tableName: 'characters',
        timestamps: false,
    }
);

export { Character, CharacterAttributes, CharacterCreationAttributes };
