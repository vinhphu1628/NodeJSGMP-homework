"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.UserModel = void 0;
const joi_1 = __importDefault(require("joi"));
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
exports.UserModel = dbConfig_1.default.define('User', {
    id: { type: sequelize_1.DataTypes.STRING, allowNull: false, primaryKey: true },
    login: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    age: { type: sequelize_1.DataTypes.INTEGER, validate: { min: 4, max: 130 } },
    isDeleted: sequelize_1.DataTypes.BOOLEAN
}, { tableName: 'users' });
exports.userSchema = joi_1.default
    .object()
    .keys({
    id: joi_1.default.string().required(),
    login: joi_1.default.required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{0,}$/).required(),
    age: joi_1.default.number().integer().min(4).max(130).required(),
    isDeleted: joi_1.default.boolean().required()
});
