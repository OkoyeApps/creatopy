import db from '../models';
import { Op } from 'sequelize';
import AppError from '../lib/appError';
const { User, Project } = db;

type createProjectDto = {
    title: string;
    description: string;
    createdBy: string;
};
class ProjectServices {

    async createProject(data: createProjectDto) {
        return await Project.create(data);
    }

    async getSingleProjectWithUsersById(id: number) {
        let result = await Project.findOne({ where: { id: id }, include: { model: User } });
        return result;
    }

    async getAllProjectsWithUsers() {
        let result = await Project.findAll({ include: { model: User } });
        return result;
    }
    async joinProject(projectId: number, userId: string) {
        try {
            let user = await User.findByPk(userId);

            if (!user) throw new AppError("user does not exist", "USER");
            let project = await Project.findByPk(projectId);

            if (!project) throw new AppError("project does not exist", "USER");
            await user.addProjects(project);

            return User.findOne({ where: { id: userId }, include: { model: Project } });
        } catch (error) {
            if (error instanceof AppError) return error;

            throw new Error("something went wrong but guess what, it's not your fault");
        }
    }

    async getMyProjects(userId: string) {
        return Project.findAll({
            include: {
                model: User,
                where: {
                    id: {
                        [Op.eq]: userId
                    },
                },
                include: {
                    model: Project,
                    where: {
                        id: {
                            [Op.ne]: userId
                        }
                    },
                    include: { model: User}
                }
            }
        });
    }

    async getOpenProjects(userId: string) {
        try {
            let result = await Project.findAll({
                include: {
                    model: User, where: {
                        id: {
                            [Op.ne]: userId
                        }
                    }
                }
            });
            return result;
        } catch (error) {
            console.log(error);
        }

    }


}

export const projectServices = new ProjectServices();