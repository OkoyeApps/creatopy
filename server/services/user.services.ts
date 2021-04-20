import db from '../models';
const { User, Project } = db;
class UserServices {
    async getSingleUserWithProjectsById(id: string) {
        let result = await User.findOne({ where: { id: id }, include: { model: Project } });
        if (result) {
            result = result.toJSON();
            delete result.password;
        }

        return result;
    }

    async getAllUserWithProjects() {
        let result = await User.findAll({ include: { model: Project } });
        if(result)
        return result;
    }
}

export const userServices =  new UserServices();