import { Model, Op, Transaction } from 'sequelize';

import { User, UserModel } from '../models/User';
import { UserGroupModel, UserGroup } from '../models/DbRelations';

export const findAllUsers = async () => {
    try {
        const users = await UserModel.findAll();

        return users;
    } catch (error) {
        throw new Error();
    }
};

export const findAllUsersWithSubstring = async (loginSubstring: string) => {
    try {
        const users = await UserModel.findAll({
            where: {
                login: {
                    [Op.like]: `%${loginSubstring}%`
                }
            }
        });

        return users;
    } catch (error) {
        throw new Error();
    }
};

export const findLimitUsers = async (limit: number) => {
    try {
        const users = await UserModel.findAll({ limit });

        return users;
    } catch (error) {
        throw new Error();
    }
};

export const findLimitUsersWithSubstring = async (loginSubstring: string, limit: number) => {
    try {
        const users = await UserModel.findAll({
            where: {
                login: {
                    [Op.like]: `%${loginSubstring}%`
                }
            },
            limit
        });
        return users;
    } catch (error) {
        throw new Error();
    }
};


export const findAllUserByLogin = async (login: string) => {
    try {
        const user = await UserModel.findAll({
            where: {
                login
            }
        });
        return user;
    } catch (error) {
        throw new Error();
    }
};

export const findUserById = async (id: string) => {
    try {
        const user = await UserModel.findOne({
            where: {
                id
            }
        });
        return user;
    } catch (error) {
        throw new Error();
    }
};

export const createNewUser = async (userData: User, t: Transaction) => {
    try {
        const user = await UserModel.create(userData, { transaction: t });
        return user;
    } catch (error) {
        throw new Error();
    }
};

export const updateUserById = async (id: string, userData: User) => {
    try {
        const user = await UserModel.update(
            { ...userData },
            {
                where: {
                    id
                }
            },
        );
        return user;
    } catch (error) {
        throw new Error();
    }
};

export const deleteUserById = async (id: string) => {
    try {
        await UserModel.update(
            { isDeleted: true },
            {
                where: {
                    id
                }
            },
        );
        const userGroupRelations = await UserGroupModel.findAll<Model<UserGroup>>({
            where: {
                userId: id
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
