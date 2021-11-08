"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = void 0;
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
exports.GroupModel = dbConfig_1.default.define('Group', {
    id: { type: sequelize_1.DataTypes.STRING, allowNull: false, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    permissions: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING), allowNull: false }
}, { tableName: 'groups' });
