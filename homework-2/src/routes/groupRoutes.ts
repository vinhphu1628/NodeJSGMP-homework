import { Router } from 'express';

import {
    addUsersToGroupController,
    createGroupController,
    deleteGroupController,
    getAllGroupsController,
    getGroupByIdController,
    updateGroupController
} from '../controllers/groupControllers';

const groupRouter = Router();

// get all groups
groupRouter.get('/groups', getAllGroupsController);

// get group by id
groupRouter.get('/groups/:id', getGroupByIdController);

// create group
groupRouter.post('/groups', createGroupController);

// update group
groupRouter.put('/groups/:id', updateGroupController);

// delete user
groupRouter.delete('/groups/:id', deleteGroupController);

// add users to group
groupRouter.post('/groups/:id/addUsers', addUsersToGroupController);

export default groupRouter;
