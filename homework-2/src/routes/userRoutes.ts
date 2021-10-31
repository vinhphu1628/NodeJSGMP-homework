import { Router } from 'express';
import { resetDatabaseController, getUsersController, getUserByIdController, createUserController, updateUserController, deteleUserController } from '../controllers/userControllers';

const userRouter = Router();

// reset database to my 5 initial rows
userRouter.post('/reset', resetDatabaseController);

// get all users && auto-suggest list from limit users
userRouter.get('/users', getUsersController);

// get user by id
userRouter.get('/users/:id', getUserByIdController);

// create user
userRouter.post('/users', createUserController);

// update user
userRouter.put('/users/:id', updateUserController);

// delete user
userRouter.delete('/users/:id', deteleUserController);

export default userRouter;
