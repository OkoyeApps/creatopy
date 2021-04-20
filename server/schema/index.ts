import Mutation from './mutations';
import RootQuery from './queries'
import {GraphQLSchema} from 'graphql';

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});