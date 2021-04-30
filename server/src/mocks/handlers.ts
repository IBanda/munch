import { rest } from 'msw';

export const handlers = [
  rest.get(
    'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          results: [],
        })
      );
    }
  ),
];
