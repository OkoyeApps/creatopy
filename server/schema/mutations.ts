import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { UserSchema, LoginResultSchema } from './schema';
import { authServices } from '../services';

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        register: {
            type: UserSchema,
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
        }
    }
});

export default Mutation;