import { Router } from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deteleUser
} from '../controllers/userControllers';

const userRouter = Router();

// get all users && auto-suggest list from limit users
userRouter.get('/users', getUsers);

// get user by id
userRouter.get('/users/:id', getUserById);

// create user
userRouter.post('/users', createUser);

// update user
userRouter.put('/users/:id', updateUser);

// delete user
userRouter.delete('/users/:id', deteleUser);

export default userRouter;
