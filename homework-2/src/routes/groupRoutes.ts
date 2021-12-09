import { Router } from 'express';

import {
    addUsersToGroup,
    createGroup,
    deleteGroup,
    getAllGroups,
    getGroupById,
    updateGroup
} from '../controllers/groupControllers';
import { checkTokenMiddleware } from '../middlewares/checkToken';
import { loggerMiddleware } from '../middlewares/logger';

const groupRouter = Router();

// get all groups
groupRouter.get('/groups', loggerMiddleware, checkTokenMiddleware, getAllGroups);

// get group by id
groupRouter.get('/groups/:id', loggerMiddleware, checkTokenMiddleware, getGroupById);

// create group
groupRouter.post('/groups', loggerMiddleware, checkTokenMiddleware, createGroup);

// update group
groupRouter.put('/groups/:id', loggerMiddleware, checkTokenMiddleware, updateGroup);

// delete user
groupRouter.delete('/groups/:id', loggerMiddleware, checkTokenMiddleware, deleteGroup);

// add users to group
groupRouter.post('/groups/:id/addUsers', loggerMiddleware, checkTokenMiddleware, addUsersToGroup);

export default groupRouter;
