require('dotenv').config();
import express, { Response, NextFunction } from 'express';
import env from './environment';
import db from './models';
import schema from './schema';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import cryptoUtil from './lib/crypto.util';
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(async (req: any, res: Response, next: NextFunction) => {
    let authorization = req.headers.authorization;
    if (authorization) {
        let result = await cryptoUtil.verifyJwt((authorization as string).replace("Bearer ", ""));
        if(result){
            req.locals = { auth: { ...(result as any)} };
        }
    }
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


