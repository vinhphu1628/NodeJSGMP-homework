import { DataTypes } from 'sequelize';

import sequelize from '../config/dbConfig';

export type Permissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type Group = {
  id: string;
  name: string;
  permissions: Permissions[];
};

export const GroupModel = sequelize.define('Group', {
    id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    permissions: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false }
}, { tableName: 'groups' });
