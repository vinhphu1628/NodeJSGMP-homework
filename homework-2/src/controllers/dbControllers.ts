import { Request, Response } from 'express';
import { Model } from 'sequelize';

import sequelize from '../config/dbConfig';
import { UserGroup, UserGroupModel } from '../models/DbRelations';
import { Group, GroupModel } from '../models/Group';
import { User, UserModel } from '../models/User';

export const resetDatabase = async (req: Request, res: Response) => {
    try {
        // drop all table
        await sequelize.drop();

        // reset users db
        await UserModel.sync({ force: true });
        await UserModel.create<Model<User>>({
            id: '1',
            login: 'vinhphu1628',
            password: 'Vinhphu1628',
            age: 24,
            isDeleted: false
        });
        await UserModel.create<Model<User>>({
            id: '2',
            login: 'vinh1628',
            password: 'Vinhphu1628',
            age: 21,
            isDeleted: false
        });
        await UserModel.create<Model<User>>({
            id: '3',
            login: 'phu1628',
            password: 'Vinhphu1628',
            age: 23,
            isDeleted: false
        });
        await UserModel.create<Model<User>>({
            id: '4',
            login: 'vinhphu',
            password: 'Vinhphu1628',
            age: 26,
            isDeleted: false
        });
        await UserModel.create<Model<User>>({
            id: '5',
            login: 'vinhphu1628',
            password: 'Vinhphu1628',
            age: 24,
            isDeleted: false
        });

        // reset groups db
        await GroupModel.sync({ force: true });
        await GroupModel.create<Model<Group>>({
            id: '1',
            name: 'guest',
            permissions: ['READ']
        });
        await GroupModel.create<Model<Group>>({
            id: '2',
            name: 'user',
            permissions: ['READ', 'SHARE', 'UPLOAD_FILES']
        });
        await GroupModel.create<Model<Group>>({
            id: '3',
            name: 'admin',
            permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
        });

        // reset users_groups db
        await UserGroupModel.sync({ force: true });
        await UserGroupModel.create<Model<UserGroup>>({
            UserId: '1',
            GroupId: '3'
        });
        await UserGroupModel.create<Model<UserGroup>>({
            UserId: '2',
            GroupId: '1'
        });
        await UserGroupModel.create<Model<UserGroup>>({
            UserId: '4',
            GroupId: '1'
        });
        await UserGroupModel.create<Model<UserGroup>>({
            UserId: '3',
            GroupId: '2'
        });
        await UserGroupModel.create<Model<UserGroup>>({
            UserId: '5',
            GroupId: '2'
        });

        res.send('Database reset successfully!');
    } catch (error) {
        throw new Error();
    }
};
