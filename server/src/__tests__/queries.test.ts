import db from '../db';
import { testClient, gql } from './__utils/testClient';

const GET_PLACES = gql`
  query GetPlaces($coordinates: PlaceInput) {
    places(coordinates: $coordinates) {
      places {
        name
        place_id
        formatted_address
        opening_hours {
          open_now
        }
      }
      next_page_token
    }
  }
`;

const GET_PLACE = gql`
  query GetPlace($placeId: ID!) {
    place(placeId: $placeId) {
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
  test('[Query]:Should get list of places', async () => {
    const { query } = await testClient();
    const res = await query(GET_PLACES, {
      variables: { coordinates: { lat: 40.73061, lng: -73.935242 } },
    });
    expect(res.data).toEqual({
      places: {
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
        next_page_token: null,
      },
    });
  });

  test('[Query]:Should get place details', async () => {
    const { query } = await testClient();
    const { connect, disconnect } = db();
    await connect();
    const res = await query(GET_PLACE, {
      variables: { placeId: 'ChIJN6wFwihZwokRMtxwzGii9PI' },
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
