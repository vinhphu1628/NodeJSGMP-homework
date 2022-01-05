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
exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserById = exports.getAllUserByLogin = exports.getLimitUsersWithSubstring = exports.getLimitUsers = exports.getAllUsersWithSubstring = exports.getAllUsers = void 0;
const sequelize_1 = require("sequelize");
const User_1 = require("../models/User");
const DbRelations_1 = require("../models/DbRelations");
const Group_1 = require("../models/Group");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.UserModel.findAll({
            include: [Group_1.GroupModel]
        });
        return users;
    }
    catch (error) {
        throw new Error();
    }
});
exports.getAllUsers = getAllUsers;
const getAllUsersWithSubstring = (loginSubstring) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.UserModel.findAll({
            where: {
                login: {
                    [sequelize_1.Op.like]: `%${loginSubstring}%`
                }
            },
            include: [Group_1.GroupModel]
        });
        return users;
    }
    catch (error) {
        throw new Error();
    }
});
exports.getAllUsersWithSubstring = getAllUsersWithSubstring;
const getLimitUsers = (limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.UserModel.findAll({
            limit,
            include: [Group_1.GroupModel]
        });
        return users;
    }
    catch (error) {
        throw new Error();
    }
});
exports.getLimitUsers = getLimitUsers;
const getLimitUsersWithSubstring = (loginSubstring, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.UserModel.findAll({
            where: {
                login: {
                    [sequelize_1.Op.like]: `%${loginSubstring}%`
                }
            },
            limit,
            include: [Group_1.GroupModel]
        });
        return users;
    }
    catch (error) {
        throw new Error();
    }
});
exports.getLimitUsersWithSubstring = getLimitUsersWithSubstring;
const getAllUserByLogin = (login) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.UserModel.findAll({
            where: {
                login
            },
            include: [Group_1.GroupModel]
        });
        return user;
    }
    catch (error) {
        throw new Error();
    }
});
exports.getAllUserByLogin = getAllUserByLogin;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.UserModel.findOne({
            where: {
                id
            },
            include: [Group_1.GroupModel]
        });
        return user;
    }
    catch (error) {
        throw new Error();
    }
});
exports.getUserById = getUserById;
const createUser = (userData, t) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.UserModel.create(userData, { transaction: t });
        return user;
    }
    catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
});
exports.createUser = createUser;
const updateUserById = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.UserModel.update(Object.assign({}, userData), {
            where: {
                id
            }
        });
        return user;
    }
    catch (error) {
        throw new Error();
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.UserModel.update({ isDeleted: true }, {
            where: {
                id
            }
        });
        const userGroupRelations = yield DbRelations_1.UserGroupModel.findAll({
            where: {
                UserId: id
            }
        });
        userGroupRelations.forEach((userGroupRelation) => {
            userGroupRelation === null || userGroupRelation === void 0 ? void 0 : userGroupRelation.destroy();
        });
        return;
    }
    catch (error) {
        throw new Error();
    }
});
exports.deleteUserById = deleteUserById;
