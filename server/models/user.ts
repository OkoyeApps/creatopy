'use strict';
import { Model, Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import cryptoUtil from '../lib/crypto.util';
interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

module.exports = (sequelize: Sequelize) => {
  class User extends Model<UserAttributes> implements UserAttributes {

    id!: string;
    firstName!: string;
    lastName!: string;
    password!: string;
    email!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static associate(models: any) {
      // define association here
      // models.
      User.belongsToMany(models.Project, {
        through: 'ProjectAssignments'
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false, primaryKey: true
    },
    firstName: { type: DataTypes.STRING(50), allowNull: false },
    lastName: { type: DataTypes.STRING(50), allowNull: false },
    email: {
      type: DataTypes.STRING(50), allowNull: false, unique: {
        msg: "Email address already in exists",
        name: "Email address"
      }
    },
    password: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize: sequelize, modelName: 'User'
  });

  User.addHook('beforeCreate', async (user: any, options) => {
    user.password = await cryptoUtil.createStringHash(user.password);
  });

  User.addHook('beforeBulkCreate', async (users: any[], options) => {
    for (const user of users) {
      let hash = await cryptoUtil.createStringHash(user.password);
      user.password = hash;
    }
  });
  return User;
};


