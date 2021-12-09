import { Request, Response, NextFunction } from 'express';
import { Model } from 'sequelize/types';
import { generateAccessToken } from '../helpers/jwt';
import { User } from '../models/User';
import { findUserByLogin } from '../services/userServices';


export const login = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user: Model<User> | null = await findUserByLogin(req.body.login);
        if (!user || user.getDataValue('password') !== req.body.password) {
            return next(new Error('Invalid user'));
        }
        return res.status(200).json({
            token: generateAccessToken(req.body.login)
        });
    } catch (error) {
        return next(error);
    }
};
