import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import simpleMerge from 'utils/simpleMerge';
import { createUploadLink } from 'apollo-upload-client';
import updateRating from 'utils/updateRating';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true,
  },
});

const httpLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
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
              let merged;

              if (existing.reviews.length && incoming.reviews.length === 1) {
                let existingCopy = [...existing.reviews].reverse();
                merged = simpleMerge(existingCopy, incoming.reviews, {
                  readField,
                  key: 'id',
                }).reverse();
              } else {
                merged = simpleMerge(existing.reviews, incoming.reviews, {
                  readField,
                  key: 'id',
                });
              }

              return {
                hasMore: incoming.hasMore,
                reviews: merged,
              };
            },
          },
          places: {
            keyArgs: ['coordinates', 'keyword', 'opennow'],
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
              let updated = [...existing.ratings];
              if (incoming.ratings.length === 1) {
                updated = updateRating(updated, incoming.ratings[0]);
              }

              return {
                placeId: existing.placeId || incoming.placeId,
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
