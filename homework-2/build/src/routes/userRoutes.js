"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const logger_1 = require("../middlewares/logger");
const userRouter = (0, express_1.Router)();
// get all users && auto-suggest list from limit users
userRouter.get('/users', logger_1.loggerMiddleware, userControllers_1.getUsersController);
// get user by id
userRouter.get('/users/:id', logger_1.loggerMiddleware, userControllers_1.getUserByIdController);
// create user
userRouter.post('/users', logger_1.loggerMiddleware, userControllers_1.createUserController);
// update user
userRouter.put('/users/:id', logger_1.loggerMiddleware, userControllers_1.updateUserController);
// delete user
userRouter.delete('/users/:id', logger_1.loggerMiddleware, userControllers_1.deleteUserController);
exports.default = userRouter;
