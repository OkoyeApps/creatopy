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
                console.log("context check", context.locals);
                return await projectServices.getAllProjectsWithUsers();
            }
        },
        openProjects: {
            type: new GraphQLList(ProjectSchema),
            async resolve(parent, args, context) {
                // console.log("context check", context.locals);
                return await projectServices.getOpenProjects("b5818d3d-2d64-4b5e-b74e-1c09b12de401");
            }
        },
        myProjects: {
            type: new GraphQLList(ProjectSchema),
            async resolve(parent, args, context) {
                // console.log("context check", context.locals);
                return await projectServices.getMyProjects("a5e2372b-6e22-4abd-9a0d-4ca7595cd9b1");
            }
        }

    }
});

export default RootQuery;