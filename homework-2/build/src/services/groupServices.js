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
exports.addUsersToGroupById = exports.deleteGroupById = exports.updateGroupById = exports.createGroup = exports.getGroupById = exports.getAllGroups = void 0;
const DbRelations_1 = require("../models/DbRelations");
const Group_1 = require("../models/Group");
const User_1 = require("../models/User");
const getAllGroups = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = yield Group_1.GroupModel.findAll({
            include: [User_1.UserModel]
        });
        return groups;
    }
    catch (error) {
        throw new Error();
    }
});
exports.getAllGroups = getAllGroups;
const getGroupById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield Group_1.GroupModel.findOne({
            where: {
                id
            },
            include: [User_1.UserModel]
        });
        return group;
    }
    catch (error) {
        throw new Error();
    }
});
exports.getGroupById = getGroupById;
const createGroup = (groupData, t) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield Group_1.GroupModel.create(groupData, { transaction: t });
        return group;
    }
    catch (error) {
        throw new Error();
    }
});
exports.createGroup = createGroup;
const updateGroupById = (id, groupData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield Group_1.GroupModel.update(Object.assign({}, groupData), {
            where: {
                id
            }
        });
        return group;
    }
    catch (error) {
        throw new Error();
    }
});
exports.updateGroupById = updateGroupById;
const deleteGroupById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield Group_1.GroupModel.findOne({
            where: {
                id
            }
        });
        group === null || group === void 0 ? void 0 : group.destroy();
        const userGroupRelations = yield DbRelations_1.UserGroupModel.findAll({
            where: {
                GroupId: id
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
exports.deleteGroupById = deleteGroupById;
const addUsersToGroupById = (groupId, userIds, t) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promiseArray = userIds.map((userId) => __awaiter(void 0, void 0, void 0, function* () {
            const userGroupRelation = yield DbRelations_1.UserGroupModel.findOne({
                where: {
                    GroupId: groupId,
                    UserId: userId
                }
            });
            if (!userGroupRelation) {
                yield DbRelations_1.UserGroupModel.create({
                    GroupId: groupId,
                    UserId: userId
                }, { transaction: t });
            }
        }));
        yield Promise.all(promiseArray);
        return;
    }
    catch (error) {
        throw new Error();
    }
});
exports.addUsersToGroupById = addUsersToGroupById;
