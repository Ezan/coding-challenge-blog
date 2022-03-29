import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { buildSchema } from 'type-graphql';
import { resolvers } from './graphql/resolvers';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
require('dotenv').config();
import cors from 'cors';

const startServer = async () => {
  try {
    const app = express();

    app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      }),
    );

    //const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }: any) => ({ req }) });
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: resolvers,
        emitSchemaFile: true,
        validate: false,
      }),
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    });
    await server.start();
    server.applyMiddleware({ app });

    const uri = process.env.MONGO_URI || '';
    await mongoose.connect(uri);

    app.listen({ port: 4000 }, () =>
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`),
    );
  } catch (err) {
    console.error(err);
  }
};

startServer();
