import { gql, ApolloServer } from 'apollo-server-express';
import typeDefs from '../schema';
import resolvers from '../resolvers';
import { createTestClient } from 'apollo-server-testing';
import mapClient from '../lib/mapClient';

const GET_RESTAURANTS = gql`
  query GetRestaurants($coordinates: RestaurantInput) {
    restaurants(coordinates: $coordinates) {
      name
    }
  }
`;

describe('Queries', () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mapClient }),
  });
  const { query } = createTestClient(server);

  test('Should get list of restraunts', async () => {
    const res = await query({
      query: GET_RESTAURANTS,
      variables: { coordinates: { lat: 40.73061, lng: -73.935242 } },
    });
    expect(res.data.restaurants).toHaveLength(0);
  });
});
