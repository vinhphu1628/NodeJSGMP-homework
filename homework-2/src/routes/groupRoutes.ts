import { Router } from 'express';

import {
    addUsersToGroup,
    createGroup,
    deleteGroup,
    getAllGroups,
    getGroupById,
    updateGroup
} from '../controllers/groupControllers';
import { loggerMiddleware } from '../middlewares/logger';

const groupRouter = Router();

// get all groups
groupRouter.get('/groups', loggerMiddleware, getAllGroups);

// get group by id
groupRouter.get('/groups/:id', loggerMiddleware, getGroupById);

// create group
groupRouter.post('/groups', loggerMiddleware, createGroup);

// update group
groupRouter.put('/groups/:id', loggerMiddleware, updateGroup);

// delete user
groupRouter.delete('/groups/:id', loggerMiddleware, deleteGroup);

// add users to group
groupRouter.post('/groups/:id/addUsers', loggerMiddleware, addUsersToGroup);

export default groupRouter;
