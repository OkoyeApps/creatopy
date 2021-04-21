require('dotenv').config();
import express, { Response, NextFunction } from 'express';
import env from './environment';
import db from './models';
import schema from './schema';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use((req: any, res: Response, next: NextFunction) => {
    req.locals = { auth: { userid: 1, firstName: "emmanuel" } };
    next();
});


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


