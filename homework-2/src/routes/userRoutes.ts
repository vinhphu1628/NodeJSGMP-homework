import { Router } from 'express';

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userControllers';
import { loggerMiddleware } from '../middlewares/logger';

const userRouter = Router();

// get all users && auto-suggest list from limit users
userRouter.get('/users', loggerMiddleware, getUsers);

// get user by id
userRouter.get('/users/:id', loggerMiddleware, getUserById);

// create user
userRouter.post('/users', loggerMiddleware, createUser);

// update user
userRouter.put('/users/:id', loggerMiddleware, updateUser);

// delete user
userRouter.delete('/users/:id', loggerMiddleware, deleteUser);

export default userRouter;
