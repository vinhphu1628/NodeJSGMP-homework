import { Model, Transaction } from 'sequelize';

import { UserGroup, UserGroupModel } from '../models/DbRelations';
import { Group, GroupModel } from '../models/Group';
import { UserModel } from '../models/User';

export const findAllGroups = async () => {
    try {
        const groups = await GroupModel.findAll({
            include: [UserModel]
        });

        return groups;
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

export const findGroupById = async (id: string) => {
    try {
        const group = await GroupModel.findOne({
            where: {
                id
            },
            include: [UserModel]
        });
        return group;
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

export const createNewGroup = async (groupData: Group, t: Transaction) => {
    try {
        const group = await GroupModel.create(groupData, { transaction: t });
        return group;
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
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
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
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
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
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
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};
