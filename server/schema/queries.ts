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
            async resolve(parent, args) {
                return await projectServices.getAllProjectsWithUsers();
            }
        }
    }
});

export default RootQuery;