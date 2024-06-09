import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../index';

// Define the attributes interface
interface OriginAttributes {
    id?: number;
    name: string;
    dimension: string;
    type: string;  
    created?: Date;
    updated?: Date;
}

// Optional fields for creation
interface OriginCreationAttributes extends Optional<OriginAttributes, 'id'> { }

// Define the Origin model
class Origin extends Model<OriginAttributes, OriginCreationAttributes> implements OriginAttributes {
    public id!: number;
    public name!: string;
    public dimension!: string;
    public type!: string

    public readonly created!: Date;
}

// Initialize the Origin model
Origin.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dimension: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING,
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
        tableName: 'origins',
        timestamps: false,
    }
);

export { Origin, OriginAttributes, OriginCreationAttributes };