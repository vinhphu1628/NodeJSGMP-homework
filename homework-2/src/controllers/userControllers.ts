import { Request, Response } from 'express';

import sequelize from '../config/dbConfig';
import { User, userSchema } from '../models/User';
import {
    findLimitUsersWithSubstring,
    findAllUsersWithSubstring,
    findLimitUsers,
    findAllUsers,
    findUserById,
    createNewUser,
    updateUserById,
    deleteUserById
} from '../services/userServices';

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
        await sequelize.transaction(async (t) => {
            await createNewUser(userData, t);
        });
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

export const deteleUser = async (req: Request, res: Response) => {
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
