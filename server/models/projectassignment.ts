'use strict';

import { Model, Sequelize, DataTypes } from 'sequelize';

interface ProjectAssignmentsAttributes {
  UserId: string;
  ProjectId: number;
}
module.exports = (sequelize: Sequelize) => {
  class ProjectAssignment extends Model<ProjectAssignmentsAttributes> implements ProjectAssignmentsAttributes {
    UserId!: string;
    ProjectId!: number;
    static associate(models: any) {
      // define association here
    }
  };
  ProjectAssignment.init({
    UserId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Projects',
        key: 'id'
      }
    },
    ProjectId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      } }
  }, {
    sequelize,
    modelName: 'ProjectAssignment',
  });
  return ProjectAssignment;
};