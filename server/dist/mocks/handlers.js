'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.handlers = void 0;
const msw_1 = require('msw');
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
exports.handlers = [
  msw_1.rest.get(
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
  msw_1.rest.get(
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
