"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
require("dotenv/config");
exports.sequelize = new sequelize_1.Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
exports.testConnection = testConnection;
exports.default = exports.sequelize;
