'use strict';

import { Model, Sequelize, DataTypes } from 'sequelize';

interface ProjectAttributes {
  id: number;
  title: string;
  status: boolean | null;
  description : string;
  createdBy : string;
}

module.exports = (sequelize: Sequelize) => {
  class Project extends Model<ProjectAttributes> implements ProjectAttributes {
    id!: number;
    title!: string;
    status!: boolean;
    description! : string;
    createdBy! : string;
    static associate(models: any) {
      // define association here
      // Project.belongsToMany(models.User, {
      //   through: 'ProjectAssignments'
      // });
      // Project.hasMany(models.ProjectAssignment);
    }
  };
  Project.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, autoIncrement: true
    },
    title: DataTypes.STRING(50),
    status: { type: DataTypes.BOOLEAN, allowNull: true },
    description : {type: DataTypes.TEXT, allowNull: false},
    createdBy : {type: DataTypes.STRING(50), allowNull: false},
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};