import Joi from 'joi';
import { DataTypes } from 'sequelize';

import sequelize from '../config/dbConfig';

export const UserModel = sequelize.define('User', {
    id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    login: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, validate: { min: 4, max: 130 } },
    isDeleted: DataTypes.BOOLEAN
}, { tableName: 'users' });

export type User = {
    id: string,
    login: string,
    password: string,
    age: number,
    isDeleted: boolean
}

export const userSchema = Joi
    .object()
    .keys({
        id: Joi.string().required(),
        login: Joi.required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{0,}$/).required(),
        age: Joi.number().integer().min(4).max(130).required(),
        isDeleted: Joi.boolean().required()
    });
