// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import typeDefs from './schema';
import resolvers from './resolvers';
import User from './models/user';
import Review from './models/review';
import session from 'express-session';
import mongoDBSession from 'connect-mongodb-session';
import mapClient from './lib/mapClient';
import mocks from './utils/mocks';
import cors from 'cors';
import { graphqlUploadExpress } from 'graphql-upload';

export default async function apolloExpressServer() {
  const app = express();
  const Store = mongoDBSession(session);

  const store = new Store({
    uri: process.env.MONGO_URI as string,
    collection: 'session',
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: false,
    subscriptions: {
      path: '/subscriptions',
    },
    context: ({ req, res }) => {
      if (req) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      }
      return {
        mapClient,
        models: {
          User,
          Review,
        },
        req,
      };
    },
    mocks: process.env.MOCK ? mocks : false,
  });
  await server.start();
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(
    session({
      secret: process.env.COOKIE_SECRET as string,
      resave: false,
      saveUninitialized: false,
      store,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    })
  );
  app.use(graphqlUploadExpress({ maxFileSize: 2000000, maxFiles: 3 }));
  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  return { server, httpServer };
}
