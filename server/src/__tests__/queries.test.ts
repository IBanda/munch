import db from '../db';
import { testClient, gql } from './__utils/testClient';

const GET_PLACES = gql`
  query GetPlaces($coordinates: PlaceInput) {
    places(coordinates: $coordinates) {
      name
      place_id
      formatted_address
      opening_hours {
        open_now
      }
    }
  }
`;

const GET_PLACE = gql`
  query GetPlace($id: ID!) {
    place(id: $id) {
      name
      place_id
      formatted_address
      opening_hours {
        open_now
      }
    }
  }
`;

describe('Queries', () => {
  test('[Query]:Should get list of restraunts', async () => {
    const { query } = await testClient();
    const res = await query(GET_PLACES, {
      variables: { coordinates: { lat: 40.73061, lng: -73.935242 } },
    });
    expect(res.data).toEqual({
      places: [
        {
          name: 'Court Square Diner',
          place_id: 'ChIJN6wFwihZwokRMtxwzGii9PI',
          formatted_address: null,
          opening_hours: {
            open_now: true,
          },
        },
        {
          name: 'Bellwether',
          place_id: 'ChIJ-SBdDCRZwokRu0x9Neuuoow',
          formatted_address: null,
          opening_hours: {
            open_now: false,
          },
        },
      ],
    });
  });

  test('[Query]:Should get restraunt details', async () => {
    const { query } = await testClient();
    const { connect, disconnect } = db();
    await connect();
    const res = await query(GET_PLACE, {
      variables: { id: 'ChIJN6wFwihZwokRMtxwzGii9PI' },
    });
    expect(res.data).toEqual({
      place: {
        name: 'Court Square Diner',
        place_id: 'ChIJN6wFwihZwokRMtxwzGii9PI',
        formatted_address: null,
        opening_hours: {
          open_now: true,
        },
      },
    });
    await disconnect();
  });
});
