import { ApolloClient, InMemoryCache } from '@apollo/client';
import simpleMerge from 'utils/simpleMerge';
import { createUploadLink } from 'apollo-upload-client';

export const cache = new InMemoryCache({
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

            merged = simpleMerge(existing.reviews, incoming.reviews, {
              readField,
              key: 'id',
            });

            return {
              hasMore: incoming.hasMore ?? existing.hasMore,
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
      },
    },
  },
});

const apolloClient = new ApolloClient({
  link: createUploadLink({
    // uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
  }),
  cache,
});

export default apolloClient;
