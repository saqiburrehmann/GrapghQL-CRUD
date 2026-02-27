import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";

import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";

import { connectDB } from "./config/db.js";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";

dotenv.config();

async function startServer() {
  await connectDB();

  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const wsServer = new WebSocketServer({ server: httpServer, path: "/graphql" });
  const serverCleanup = useServer({ schema }, wsServer);

  const apolloServer = new ApolloServer({ schema, csrfPrevention: false,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();

  app.use( "/graphql", cors(), graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }), express.json(), expressMiddleware(apolloServer));

  const PORT = process.env.PORT;

  httpServer.listen(PORT, () => { console.log(`Server running at http://localhost:${PORT}/graphql`)});
}

startServer().catch((error) => {
  console.error("Server startup error:", error);
});