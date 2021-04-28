// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';
import { Client } from '@googlemaps/google-maps-services-js';
import './db';
import User from './models/user';
import Review from './models/review';

const client = new Client({});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: '/subscriptions',
  },
  context: ({ req, connection }) => {
    let token;
    if (connection) {
      token = connection.context.authorization;
    } else {
      token = req.headers.authorization;
    }
    return {
      mapClient: client,
      models: {
        User,
        Review,
      },
      token,
    };
  },
});

server
  .listen({
    port: process.env.PORT || 4000,
  })
  .then(({ url, subscriptionsUrl }) => {
    console.log(`Server running at: ${url}`);
    console.log(`Subscription server running at: ${subscriptionsUrl}`);
  });
