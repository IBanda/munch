import { GraphQLError } from 'graphql';
import { graphql } from 'msw';
import places from './places.json';
import reviews from './reviews.json';

const handlers = [
  graphql.query('GetUser', (req, res, ctx) => {
    return res(
      ctx.data({
        user: null,
      })
    );
  }),
  graphql.mutation('Signup', (req, res, ctx) => {
    const {
      user: { name, email },
    } = req.variables;
    const users = [];
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      users.push({ id: '608e48a01e1d61a54c208752', email });
      localStorage.setItem('users', JSON.stringify(users));

      return res(
        ctx.data({
          signup: {
            id: '608e48a01e1d61a54c208752',
            name,
            email,
            profilePic: '',
          },
        })
      );
    }

    const store = JSON.parse(storedUsers);
    const ext = store.find(
      (user: { id: string; email: string }) => user.email === email
    );

    if (ext) {
      return res(ctx.errors([new GraphQLError('Email already exists')]));
    }

    store.push({ id: 2, email });
    return res(
      ctx.data({
        user: {
          id: 2,
          name,
          email,
          profilePic: '',
        },
      })
    );
  }),
  graphql.mutation('Logout', (req, res, ctx) => {
    return res(
      ctx.data({
        logout: null,
      })
    );
  }),
  graphql.mutation('Signin', (req, res, ctx) => {
    const user = {
      email: 'test@mail.com',
      password: '123456',
    };

    const {
      user: { email, password },
    } = req.variables;

    if (email !== user.email)
      return res(
        ctx.errors([new GraphQLError('User with this email does not exist')])
      );
    if (password !== user.password)
      return res(ctx.errors([new GraphQLError('Invalid password')]));

    return res(
      ctx.data({
        signin: {
          id: '608e48a01e1d61a54c208752',
          name: 'Test User',
          email: 'test@mail.com',
          profilePic: '',
        },
      })
    );
  }),
  graphql.query('GetPlaces', (req, res, ctx) => {
    const { keyword, next_page_token } = req.variables;
    if (!keyword && !next_page_token)
      return res(
        ctx.data({
          places,
        })
      );

    if (next_page_token) {
      return res(
        ctx.data({
          places: {
            places: [...places.places, ...places.places],
            next_page_token: null,
          },
        })
      );
    }

    return res(
      ctx.data({
        places: {
          places: [
            places.places.find((place) => place.name === keyword.split(' ')[2]),
          ],
          next_page_token: null,
        },
      })
    );
  }),
  graphql.query('GetPlace', (req, res, ctx) => {
    const { placeId } = req.variables;

    const place = {
      ...places.places.find((place) => place.place_id === placeId),
    };
    delete place.vicinity;
    return res(
      ctx.data({
        place: {
          ...place,
          formatted_address: '34-35 Maiden London',
          formatted_phone_number: '+654 435 6789',
          website: 'www.example.com',
          photos: [
            {
              photo_reference: '',
            },
            {
              photo_reference: '',
            },
            {
              photo_reference: '',
            },
            {
              photo_reference: '',
            },
            {
              photo_reference: '',
            },
          ],
          opening_hours: {
            open_now: true,
            weekday_text: [
              'Monday: 9:00 AM – 5:30 PM',
              'Tuesday: 9:00 AM – 5:30 PM',
              'Wednesday: 9:00 AM – 5:30 PM',
              'Thursday: 9:00 AM – 5:30 PM',
              'Friday: 9:00 AM – 5:30 PM',
              'Saturday: Closed',
              'Sunday: Closed',
            ],
          },
        },
      })
    );
  }),
  graphql.query('GetReviews', (req, res, ctx) => {
    const { placeId } = req.variables;
    const placeReviews = reviews.reviews.filter(
      (review) => review.placeId === placeId
    );

    return res(
      ctx.data({
        reviews: {
          reviews: placeReviews,
          hasMore: false,
        },
      })
    );
  }),
  graphql.query('GetRatings', (req, res, ctx) => {
    const { placeId } = req.variables;
    return res(
      ctx.data({
        ratings: {
          placeId,
          ratings: [0, 1, 1, 0, 0],
        },
      })
    );
  }),
  graphql.mutation('PostReview', (req, res, ctx) => {
    const {
      review: { review, placeId, rating, user: id },
    } = req.variables;
    return res(
      ctx.data({
        review: {
          id: '1',
          review,
          placeId,
          user: {
            id,
            name: 'Test User',
            profilePic: '',
          },
          images: [],
          rating,
          created_on: '1621835743225',
          __typename: 'Review',
        },
      })
    );
  }),
  graphql.mutation('DeleteReview', (req, res, ctx) => {
    const { id, placeId } = req.variables;
    const reviewToDelete = reviews.reviews.find((review) => review.id === id);

    return res(
      ctx.data({
        deleteReview: {
          id,
          placeId,
          rating: reviewToDelete?.rating,
          __typename: 'Review',
        },
      })
    );
  }),
];

export default handlers;
