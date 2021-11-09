import sequelize from '../config/dbConfig';
import { GroupModel } from './Group';
import { UserModel } from './User';

export type UserGroup = {
    UserId: string;
    GroupId: string;
};

export const UserGroupModel = sequelize.define('UserGroup', {}, { tableName: 'users_groups' });

UserModel.belongsToMany(GroupModel, { through: 'UserGroup' });
GroupModel.belongsToMany(UserModel, { through: 'UserGroup' });
