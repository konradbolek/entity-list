import express from "express";
import http from "http";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import Schema from "./graphql/Schema";
import Resolvers from "./graphql/Resolvers";

/**
 * Simple function to start ApolloServer 
 */
const startServer = async (typeDefs: any, resolvers: any) => {
  const app = express();
  const httpServer = http.createServer(app);
  const port: any = process.env.PORT;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startServer(Schema, Resolvers);
