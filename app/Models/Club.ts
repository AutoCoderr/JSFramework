import { Model, DataTypes } from "sequelize";
import { sequelize } from "../Core/DB";
import env from "../Core/env.js";
const {DB_PREFIX} = env;

import User from "./User";

export interface IClub {
    name: string;
}

export default class Club extends Model {
    public id!: number;
    public name!: string;
}

Club.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
    },
    {
        tableName: DB_PREFIX+"club",
        sequelize, // passing the `sequelize` instance is required
    }
);

Club.belongsToMany(User, { through: "Club_Users" });
User.belongsToMany(Club, { through: "Club_Users" });
