import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
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
                description: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args, context) {
                if (!context.locals || !context.locals.auth || !context.locals.auth.id) return null;
                return await projectServices.createProject({
                    title: args.title,
                    description: args.description,
                    createdBy: context.locals.auth.firstName + " " + context.locals.auth.lastName,
                    creatorId : context.locals.auth.id
                });
            }
        },
        joinProject: {
            type: ProjectSchema,
            args: {
                projectId: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args, context) {
                if (!context.locals || !context.locals.auth || !context.locals.auth.id) return null;
                return await projectServices.joinProject(args.projectId, context.locals.auth.id);
            }
        },
        resetPassword: {
            type: GraphQLBoolean,
            args: {
                oldPassword: { type: new GraphQLNonNull(GraphQLString) },
                newPassword: { type: new GraphQLNonNull(GraphQLString) },
                confirmPassword: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args, context) {
                return await authServices.resetPassword({
                    oldPassword: args.oldPassword,
                    newPassword: args.newPassword,
                    confirmPassword: args.confirmPassword,
                    userId: context.locals.userId
                });
            }
        }
    }
});

export default Mutation;