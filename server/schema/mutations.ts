import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { UserSchema, LoginResultSchema, ProjectSchema } from './schema';
import { authServices, projectServices, userServices } from '../services';

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        register: {
            type: LoginResultSchema,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                return await authServices.register({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password
                });
            }
        },
        login: {
            type: LoginResultSchema,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return await authServices.login({
                    password: args.password, email: args.email
                });
            }
        },
        createProject: {
            type: ProjectSchema,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                createdBy: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                return await projectServices.createProject({
                    title: args.title,
                    description: args.description,
                    createdBy: args.createdBy
                });
            }
        },
        joinProject: {
            type: ProjectSchema,
            args: {
                projectId: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                return await projectServices.joinProject(args.projectId, args.userId);
            }
        }
    }
});

export default Mutation;