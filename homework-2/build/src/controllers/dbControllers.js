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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetDatabaseController = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const DbRelations_1 = require("../models/DbRelations");
const Group_1 = require("../models/Group");
const User_1 = require("../models/User");
const resetDatabaseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // drop all table
        yield dbConfig_1.default.drop();
        // reset users db
        yield User_1.UserModel.sync({ force: true });
        yield User_1.UserModel.create({
            id: '1',
            login: 'vinhphu1628',
            password: 'Vinhphu1628',
            age: 24,
            isDeleted: false
        });
        yield User_1.UserModel.create({
            id: '2',
            login: 'vinh1628',
            password: 'Vinhphu1628',
            age: 21,
            isDeleted: false
        });
        yield User_1.UserModel.create({
            id: '3',
            login: 'phu1628',
            password: 'Vinhphu1628',
            age: 23,
            isDeleted: false
        });
        yield User_1.UserModel.create({
            id: '4',
            login: 'vinhphu',
            password: 'Vinhphu1628',
            age: 26,
            isDeleted: false
        });
        yield User_1.UserModel.create({
            id: '5',
            login: 'vinhphu1628',
            password: 'Vinhphu1628',
            age: 24,
            isDeleted: false
        });
        // reset groups db
        yield Group_1.GroupModel.sync({ force: true });
        yield Group_1.GroupModel.create({
            id: '1',
            name: 'guest',
            permissions: ['READ']
        });
        yield Group_1.GroupModel.create({
            id: '2',
            name: 'user',
            permissions: ['READ', 'SHARE', 'UPLOAD_FILES']
        });
        yield Group_1.GroupModel.create({
            id: '3',
            name: 'admin',
            permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
        });
        // reset users_groups db
        yield DbRelations_1.UserGroupModel.sync({ force: true });
        yield DbRelations_1.UserGroupModel.create({
            UserId: '1',
            GroupId: '3'
        });
        yield DbRelations_1.UserGroupModel.create({
            UserId: '2',
            GroupId: '1'
        });
        yield DbRelations_1.UserGroupModel.create({
            UserId: '4',
            GroupId: '1'
        });
        yield DbRelations_1.UserGroupModel.create({
            UserId: '3',
            GroupId: '2'
        });
        yield DbRelations_1.UserGroupModel.create({
            UserId: '5',
            GroupId: '2'
        });
        res.send('Database reset successfully!');
    }
    catch (error) {
        throw new Error();
    }
});
exports.resetDatabaseController = resetDatabaseController;
