import { User, UserModel } from '../models/User';

import { Op } from 'sequelize';

export const getAllUsers = async () => {
    try {
        const users = await UserModel.findAll();

        return users;
    } catch (error) {
        throw new Error();
    }
};

export const getAllUsersWithSubstring = async (loginSubstring: string) => {
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

export const getLimitUsers = async (limit: number) => {
    try {
        const users = await UserModel.findAll({ limit });

        return users;
    } catch (error) {
        throw new Error();
    }
};

export const getLimitUsersWithSubstring = async (loginSubstring: string, limit: number) => {
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


export const getAllUserByLogin = async (login: string) => {
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

export const getUserById = async (id: string) => {
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

export const createUser = async (userData: User) => {
    try {
        const user = await UserModel.create(userData);
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
        const user = await UserModel.update(
            { isDeleted: true },
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
