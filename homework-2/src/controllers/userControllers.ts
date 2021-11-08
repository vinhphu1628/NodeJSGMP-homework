import { Request, Response } from 'express';
<<<<<<< HEAD
import { User, UserModel, userSchema } from '../models/User';
import { findLimitUsersWithSubstring, findAllUsersWithSubstring, findLimitUsers, findAllUsers, findUserById, createNewUser, updateUserById, deleteUserById } from '../services/userServices';

export const resetDatabase = async (req: Request, res: Response) => {
    try {
        await UserModel.sync({ force: true });
        await UserModel.create({
            id: '1',
            login: 'vinhphu1628',
            password: 'Vinhphu1628',
            age: 24,
            isDeleted: false
        });
        await UserModel.create({
            id: '2',
            login: 'vinh1628',
            password: 'Vinhphu1628',
            age: 21,
            isDeleted: false
        });
        await UserModel.create({
            id: '3',
            login: 'phu1628',
            password: 'Vinhphu1628',
            age: 23,
            isDeleted: false
        });
        await UserModel.create({
            id: '4',
            login: 'vinhphu',
            password: 'Vinhphu1628',
            age: 26,
            isDeleted: false
        });
        await UserModel.create({
            id: '5',
            login: 'vinhphu1628',
            password: 'Vinhphu1628',
            age: 24,
            isDeleted: false
        });
        res.send('Database reset successfully!');
    } catch (error) {
        throw new Error();
    }
};
=======

import sequelize from '../config/dbConfig';
import { User, userSchema } from '../models/User';
import {
    getLimitUsersWithSubstring,
    getAllUsersWithSubstring,
    getLimitUsers,
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
} from '../services/userServices';
>>>>>>> 6cd5760 (homework-4: finish homework-4)

export const getUsers = async (req: Request, res: Response) => {
    const { loginSubString, limit } = req.query;

    if (loginSubString) {
        if (limit) {
            // find users with login and limit
            try {
                const response = await findLimitUsersWithSubstring(loginSubString.toString(), parseInt(limit.toString(), 10));
                return res.json(response);
            } catch (error) {
                let errorMessage = 'Failed to query!';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                return res.status(400).send(errorMessage);
            }
        }

        // find users with login and no limit
        try {
            const response = await findAllUsersWithSubstring(loginSubString.toString());
            return res.json(response);
        } catch (error) {
            let errorMessage = 'Failed to query!';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return res.status(400).send(errorMessage);
        }
    } else {
        if (limit) {
            // show users with limit
            try {
                const response = await findLimitUsers(parseInt(limit.toString(), 10));
                return res.json(response);
            } catch (error) {
                let errorMessage = 'Failed to query!';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                return res.status(400).send(errorMessage);
            }
        }

        // show users with no limit
        try {
            const response = await findAllUsers();
            return res.json(response);
        } catch (error) {
            let errorMessage = 'Failed to query!';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return res.status(400).send(errorMessage);
        }
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const response = await findUserById(id);
        if (!response) {
            return res.send('No such user!');
        }

        return res.json(response);
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
};

export const createUser = async (req: Request, res: Response) => {
    const newUser: User = req.body;
    const userValidation = userSchema.validate(newUser);
    const userData = userValidation.value;
    const validationError = userValidation.error;

    if (validationError) {
        return res.status(400).send(validationError.details[0].message);
    }

    try {
<<<<<<< HEAD
        await createNewUser(userData);
=======
        await sequelize.transaction(async (t) => {
            await createUser(userData, t);
        });
>>>>>>> 6cd5760 (homework-4: finish homework-4)
        return res.send('Created user successfully!');
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const newUser: User = req.body;
    const userValidation = userSchema.validate(newUser);
    const userData = userValidation.value;
    const validationError = userValidation.error;

    if (validationError) {
        return res.status(400).send(validationError.details[0].message);
    }

    try {
        const response = await updateUserById(id, userData);

        if (response[0] === 0) {
            return res.send('No such user!');
        }

        return res.send('Updated user successfully!');
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
};

<<<<<<< HEAD
export const deteleUser = async (req: Request, res: Response) => {
=======
export const deleteUserController = async (req: Request, res: Response) => {
>>>>>>> 6cd5760 (homework-4: finish homework-4)
    const { id } = req.params;

    try {
        await deleteUserById(id);
        return res.send('Deleted user successfully!');
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
};
