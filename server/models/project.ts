'use strict';

import { Model, Sequelize, DataTypes } from 'sequelize';

interface ProjectAttributes {
  id: number;
  title: string;
  status: boolean | null;
}

module.exports = (sequelize: Sequelize) => {
  class Project extends Model<ProjectAttributes> implements ProjectAttributes {
    id!: number;
    title!: string;
    status!: boolean;
    static associate(models: any) {
      // define association here
      Project.belongsToMany(models.User, {
        through: 'ProjectAssignments'
      });
    }
  };
  Project.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, autoIncrement: true
    },
    title: DataTypes.STRING(50),
    status: { type: DataTypes.BOOLEAN, allowNull: true }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};