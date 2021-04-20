import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList, GraphQLNonNull,
    GraphQLInputType,
    GraphQLInputObjectType
} from 'graphql';
import db from '../models';
const { User, Project } = db;


const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        // password: { type: GraphQLString },
        email: { type: GraphQLString },
        projects: {
            type: GraphQLList(ProjectType),
            async resolve(parent, args) {
                return parent.Projects;
            }
        }
    })
});

const ProjectType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        Users: {
            type: new GraphQLList(UserType),
            async resolve(parent, args) {
                return parent.Users;
            }
        }
    })
});


/**
 * @todo fix this later
 */

const UserRegistrationType: GraphQLInputType = new GraphQLInputObjectType({
    fields: {
        firstName: {type : GraphQLString},
        lastName: {type : GraphQLString},
        password: {type : GraphQLString},
        email: {type : GraphQLString}
    },
    name: "UserRegistrationType"
});
//     firstName: String,
//     lastName: String,
//     password: String,
//     email: String

// });

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                let result = await User.findOne({ where: { id: args.id }, include: { model: Project } });
                delete result.password;
                return result;
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                return await Project.findOne({ where: { id: args.id }, include: { model: User } });
            }
        },
        users: {
            type: new GraphQLList(UserType),
            async resolve(parent, args) {
                return await User.findAll({ include: { model: Project } });
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            async resolve(parent, args) {
                return await Project.findAll({ include: { model: User } });
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        register: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLID) },
                email : { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                // let author = new Author({
                //     name: args.name,
                //     age: args.age
                // });
                // return author.save();
            }
        },
        // addBook: {
        //     type: BookType,
        //     args: {
        //         name: { type: new GraphQLNonNull(GraphQLString) },
        //         genre: { type: new GraphQLNonNull(GraphQLString) },
        //         authorId: { type: new GraphQLNonNull(GraphQLID) }
        //     },
        //     resolve(parent, args) {
        //         let book = new Book({
        //             name: args.name,
        //             genre: args.genre,
        //             authorId: args.authorId
        //         });
        //         return book.save();
        //     }
        // }
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});