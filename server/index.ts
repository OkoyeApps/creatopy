require('dotenv').config();
import express from 'express';
import env from './environment';
import db from './models';
import schema from './schema';
import { graphqlHTTP } from 'express-graphql';
const app = express();
const port = process.env.PORT || 3000;

(async () => {
    if (env.SYNC_DB === 'true') {
        await db.functions.syncDatabase();
    }
    if (env.SEED_DB === 'true') {
        await db.functions.seedDatabase();
    }


    // bind express with graphql
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true, 
    }));

    app.listen(port, () => {
        console.log('listening on port' + port);
    });
})();


