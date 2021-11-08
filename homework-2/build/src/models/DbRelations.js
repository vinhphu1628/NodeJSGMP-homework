"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGroupModel = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const Group_1 = require("./Group");
const User_1 = require("./User");
exports.UserGroupModel = dbConfig_1.default.define('UserGroup', {}, { tableName: 'users_groups' });
User_1.UserModel.belongsToMany(Group_1.GroupModel, { through: 'UserGroup' });
Group_1.GroupModel.belongsToMany(User_1.UserModel, { through: 'UserGroup' });
