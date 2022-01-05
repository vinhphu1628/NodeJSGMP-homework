import { Router } from 'express';

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userControllers';
import { checkTokenMiddleware } from '../middlewares/checkToken';
import { loggerMiddleware } from '../middlewares/logger';

const userRouter = Router();

// get all users && auto-suggest list from limit users
userRouter.get('/users', loggerMiddleware, checkTokenMiddleware, getUsers);

// get user by id
userRouter.get('/users/:id', loggerMiddleware, checkTokenMiddleware, getUserById);

// create user
userRouter.post('/users', loggerMiddleware, checkTokenMiddleware, createUser);

// update user
userRouter.put('/users/:id', loggerMiddleware, checkTokenMiddleware, updateUser);

// delete user
userRouter.delete('/users/:id', loggerMiddleware, checkTokenMiddleware, deleteUser);

export default userRouter;
