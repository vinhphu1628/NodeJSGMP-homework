import { Model, Op, Transaction } from 'sequelize';

import { User, UserModel } from '../models/User';
import { UserGroupModel, UserGroup } from '../models/DbRelations';
import { GroupModel } from '../models/Group';

export const findAllUsers = async () => {
    try {
        const users = await UserModel.findAll<Model<User>>({
            include: [GroupModel]
        });

        return users;
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

export const findAllUsersWithSubstring = async (loginSubstring: string) => {
    try {
        const users = await UserModel.findAll<Model<User>>({
            where: {
                login: {
                    [Op.like]: `%${loginSubstring}%`
                }
            },
            include: [GroupModel]
        });

        return users;
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

export const findLimitUsers = async (limit: number) => {
    try {
        const users = await UserModel.findAll<Model<User>>({
            limit,
            include: [GroupModel]
        });

        return users;
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

export const findLimitUsersWithSubstring = async (loginSubstring: string, limit: number) => {
    try {
        const users = await UserModel.findAll<Model<User>>({
            where: {
                login: {
                    [Op.like]: `%${loginSubstring}%`
                }
            },
            limit,
            include: [GroupModel]
        });
        return users;
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};


export const findAllUserByLogin = async (login: string) => {
    try {
        const user = await UserModel.findAll<Model<User>>({
            where: {
                login
            },
            include: [GroupModel]
        });
        return user;
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

export const findUserById = async (id: string) => {
    try {
        const user = await UserModel.findOne<Model<User>>({
            where: {
                id
            },
            include: [GroupModel]
        });
        return user;
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

export const createNewUser = async (userData: User, t: Transaction) => {
    try {
        const user = await UserModel.create(userData, { transaction: t });
        return user;
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
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
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
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
                UserId: id
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

export const findUserByLogin = async (login: string) => {
    try {
        const user = await UserModel.findOne<Model<User>>({
            where: {
                login
            }
        });
        return user;
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};
