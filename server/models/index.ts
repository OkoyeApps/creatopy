'use strict';

import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import env from '../environment';
import UsersData from '../data/users.json';
import ProjectData from '../data/projects.json';
import ProjectAssignment from '../data/projectassignments.json';
const basename = path.basename(__filename);
const environment = env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[environment];
const db: any = {}; //will leave this as any because am trusting sequelize since this file was generated with the sequelize init command

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const seedDatabase = async () => {
  try {
    await db.User.bulkCreate(UsersData.map((x: any) => {
      return {
        ...x,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }));
    await db.Project.bulkCreate(ProjectData.map((x: any) => {
      return {
        ...x,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }));

    await db.ProjectAssignment.bulkCreate(ProjectAssignment.map((x: any) => x));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const syncDatabase = async () => {
  await sequelize.sync({ force: true });
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.functions = { seedDatabase, syncDatabase };

export default db;
