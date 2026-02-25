import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';
import cors from 'cors';

dotenv.config();
async function startServer() {
    await connectDB();
    
    const app = express();
    const server = new ApolloServer({
        typeDefs: await typeDefs,
        resolvers: await resolvers
    });

    await server.start();

    app.use('/graphql', cors(), express.json(), expressMiddleware(server));

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}/graphql`);
    });
}

startServer();
