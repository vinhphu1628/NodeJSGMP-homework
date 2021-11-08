import { DataTypes } from 'sequelize';

import sequelize from '../config/dbConfig';

export type UserGroup = {
    userId: string;
    groupId: string;
};

export const UserGroupModel = sequelize.define('UserGroup', {
    userId: { type: DataTypes.STRING, allowNull: false },
    groupId: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'users_groups' });
