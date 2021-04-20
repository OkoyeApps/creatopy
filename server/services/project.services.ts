import db from '../models';
const { User, Project } = db;
class ProjectServices {
    async getSingleProjectWithUsersById(id: number) {
        let result = await Project.findOne({ where: { id: id }, include: { model: User } });
        return result;
    }

    async getAllProjectsWithUsers() {
        let result = await Project.findAll({ include: { model: User } });
        return result;
    }
}

export const projectServices =  new ProjectServices();