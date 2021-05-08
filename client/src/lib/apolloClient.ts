import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import simpleMerge from 'utils/simpleMerge';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === 'OperationDefinition' && def.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const indexMapper = {
  5: 0,
  4: 1,
  3: 2,
  2: 3,
  1: 4,
};

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          reviews: {
            keyArgs: ['placeId'],
            read(existing) {
              return existing;
            },
            merge(existing = { reviews: [] }, incoming, { readField }) {
              return {
                hasMore: incoming.hasMore,
                reviews: simpleMerge(existing.reviews, incoming.reviews, {
                  readField,
                  key: 'id',
                }),
              };
            },
          },
          places: {
            keyArgs: ['coordinates'],
            read(existing) {
              return existing;
            },
            merge(existing = { places: [] }, incoming, { readField }) {
              return {
                next_page_token: incoming.next_page_token,
                places: simpleMerge(existing.places, incoming.places, {
                  readField,
                  key: 'place_id',
                }),
              };
            },
          },
          ratings: {
            keyArgs: ['placeId'],
            read: (rating) => rating,
            merge: (existing = { ratings: [] }, incoming) => {
              const updated = [...existing.ratings];
              if (incoming.ratings.length === 1) {
                const pos: 1 | 2 | 3 | 4 | 5 = incoming.ratings[0];
                updated[indexMapper[pos]] += 1;
              }
              return {
                ratings: updated.length ? updated : incoming.ratings,
              };
            },
          },
        },
      },
    },
  }),
});

export default apolloClient;
