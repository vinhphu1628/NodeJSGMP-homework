import { Request, Response } from 'express';

import sequelize from '../config/dbConfig';
import { Group } from '../models/Group';
import {
    addUsersToGroupById,
    createGroup,
    deleteGroupById,
    getAllGroups,
    getGroupById,
    updateGroupById
} from '../services/groupServices';

export const getAllGroupsController = async (req: Request, res: Response) => {
    try {
        const response = await getAllGroups();
        return res.json(response);
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
};

export const getGroupByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const response = await getGroupById(id);
        if (!response) {
            return res.send('No such group!');
        }

        return res.json(response);
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
};

export const createGroupController = async (req: Request, res: Response) => {
    const groupData: Group = req.body;

    try {
        await sequelize.transaction(async (t) => {
            await createGroup(groupData, t);
        });
        return res.send('Created group successfully!');
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
};

export const updateGroupController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const groupData: Group = req.body;

    try {
        const response = await updateGroupById(id, groupData);

        if (response[0] === 0) {
            return res.send('No such group!');
        }

        return res.send('Updated group successfully!');
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
};

export const deleteGroupController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await deleteGroupById(id);
        return res.send('Deleted group successfully!');
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
};

export const addUsersToGroupController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userIds: { userIds: string[] } = req.body;

    try {
        await sequelize.transaction(async (t) => {
            await addUsersToGroupById(id, userIds.userIds, t);
        });
        return res.send('Added users to group successfully!');
    } catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
};
