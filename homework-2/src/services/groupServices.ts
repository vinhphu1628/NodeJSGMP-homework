import { Model, Transaction } from 'sequelize';

import { UserGroup, UserGroupModel } from '../models/DbRelations';
import { Group, GroupModel } from '../models/Group';
import { UserModel } from '../models/User';

export const getAllGroups = async () => {
    try {
        const groups = await GroupModel.findAll({
            include: [UserModel]
        });

        return groups;
    } catch (error) {
        throw new Error();
    }
};

export const getGroupById = async (id: string) => {
    try {
        const group = await GroupModel.findOne({
            where: {
                id
            },
            include: [UserModel]
        });
        return group;
    } catch (error) {
        throw new Error();
    }
};

export const createGroup = async (groupData: Group, t: Transaction) => {
    try {
        const group = await GroupModel.create(groupData, { transaction: t });
        return group;
    } catch (error) {
        throw new Error();
    }
};

export const updateGroupById = async (id: string, groupData: Group) => {
    try {
        const group = await GroupModel.update(
            { ...groupData },
            {
                where: {
                    id
                }
            },
        );
        return group;
    } catch (error) {
        throw new Error();
    }
};

export const deleteGroupById = async (id: string) => {
    try {
        const group = await GroupModel.findOne<Model<Group>>({
            where: {
                id
            }
        });
        group?.destroy();
        const userGroupRelations = await UserGroupModel.findAll<Model<UserGroup>>({
            where: {
                GroupId: id
            }
        });
        userGroupRelations.forEach((userGroupRelation: Model<UserGroup>) => {
            userGroupRelation?.destroy();
        });
        return;
    } catch (error) {
        throw new Error();
    }
};

export const addUsersToGroupById = async (groupId: string, userIds: string[], t: Transaction) => {
    try {
        const promiseArray =  userIds.map(async (userId: string) => {
            const userGroupRelation = await UserGroupModel.findOne<Model<UserGroup>>({
                where: {
                    GroupId: groupId,
                    UserId: userId
                }
            });
            if (!userGroupRelation) {
                await UserGroupModel.create<Model<UserGroup>>(
                    {
                        GroupId: groupId,
                        UserId: userId
                    },
                    { transaction: t });
            }
        });

        await Promise.all(promiseArray);
        return;
    } catch (error) {
        throw new Error();
    }
};
