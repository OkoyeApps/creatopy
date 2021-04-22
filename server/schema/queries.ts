import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLList } from 'graphql';
import { UserSchema, ProjectSchema } from './schema';
import { projectServices, userServices } from '../services';

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserSchema,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            async resolve(parent, args) {
                return await userServices.getSingleUserWithProjectsById(args.id);
            }
        },
        project: {
            type: ProjectSchema,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            async resolve(parent, args) {
                return await projectServices.getSingleProjectWithUsersById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserSchema),
            async resolve(parent, args) {
                return await userServices.getAllUserWithProjects();
            }
        },
        projects: {
            type: new GraphQLList(ProjectSchema),
            async resolve(parent, args, context) {
                return await projectServices.getAllProjectsWithUsers();
            }
        },
        openProjects: {
            type: new GraphQLList(ProjectSchema),
            async resolve(parent, args, context) {
                if (!context.locals || !context.locals.auth || !context.locals.auth.id) return null;
                return await projectServices.getOpenProjects(context.locals.auth.id);
            }
        },
        myProjects: {
            type: new GraphQLList(ProjectSchema),
            async resolve(parent, args, context) {
                if (!context.locals || !context.locals.auth || !context.locals.auth.id) return null;
                return await projectServices.getMyProjects(context.locals.auth.id);
            }
        }

    }
});

export default RootQuery;