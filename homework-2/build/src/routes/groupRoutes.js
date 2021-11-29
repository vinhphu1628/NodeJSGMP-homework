"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const groupControllers_1 = require("../controllers/groupControllers");
const logger_1 = require("../middlewares/logger");
const groupRouter = (0, express_1.Router)();
// get all groups
groupRouter.get('/groups', logger_1.loggerMiddleware, groupControllers_1.getAllGroupsController);
// get group by id
groupRouter.get('/groups/:id', logger_1.loggerMiddleware, groupControllers_1.getGroupByIdController);
// create group
groupRouter.post('/groups', logger_1.loggerMiddleware, groupControllers_1.createGroupController);
// update group
groupRouter.put('/groups/:id', logger_1.loggerMiddleware, groupControllers_1.updateGroupController);
// delete user
groupRouter.delete('/groups/:id', logger_1.loggerMiddleware, groupControllers_1.deleteGroupController);
// add users to group
groupRouter.post('/groups/:id/addUsers', logger_1.loggerMiddleware, groupControllers_1.addUsersToGroupController);
exports.default = groupRouter;
