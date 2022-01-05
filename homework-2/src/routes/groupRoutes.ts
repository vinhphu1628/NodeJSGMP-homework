import { Router } from 'express';

import {
    addUsersToGroup,
    createGroup,
    deleteGroup,
    getAllGroups,
    getGroupById,
    updateGroup
} from '../controllers/groupControllers';

const groupRouter = Router();

// get all groups
groupRouter.get('/groups', getAllGroups);

// get group by id
groupRouter.get('/groups/:id', getGroupById);

// create group
groupRouter.post('/groups', createGroup);

// update group
groupRouter.put('/groups/:id', updateGroup);

// delete user
groupRouter.delete('/groups/:id', deleteGroup);

// add users to group
groupRouter.post('/groups/:id/addUsers', addUsersToGroup);

export default groupRouter;
