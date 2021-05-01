import { rest } from 'msw';

const places = [
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
];

export const handlers = [
  rest.get(
    'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          results: places,
        })
      );
    }
  ),
  rest.get(
    'https://maps.googleapis.com/maps/api/place/details/json',
    (req, res, ctx) => {
      const id = req.url.searchParams.get('place_id');
      const place = places.find((place) => place.place_id === id);
      return res(
        ctx.status(200),
        ctx.json({
          result: place,
        })
      );
    }
  ),
];
