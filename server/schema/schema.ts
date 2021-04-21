import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
} from 'graphql';

export const UserSchema: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        projects: {
            type: GraphQLList(ProjectSchema),
            async resolve(parent, args) {
                return parent.Projects;
            }
        }
    })
});

export const ProjectSchema: GraphQLObjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        createdBy : {type : GraphQLString},
        Users: {
            type: new GraphQLList(UserSchema),
            async resolve(parent, args) {
                return parent.Users;
            }
        }
    })
});


export const LoginResultSchema: GraphQLObjectType = new GraphQLObjectType({
    name: 'LoginResult',
    fields: () => ({
        access_token: { type: GraphQLString },
        authDetail: {
            type: new GraphQLObjectType({
                name: 'authDetail',
                fields: () => ({
                    id: { type: GraphQLID },
                    firstName: { type: GraphQLString },
                    lastName: { type: GraphQLString },
                    email: { type: GraphQLString },
                })
            })
        }
    })
});