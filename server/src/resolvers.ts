import { PubSub, withFilter } from 'apollo-server';
import { verifyJWT } from './lib/jwt';

const pubsub = new PubSub();

const key = process.env.GOOGLE_MAPS_API_KEY;

const resolvers = {
  Query: {
    restraurants: async (_, { coordinates: { lat, lng } }, { mapClient }) => {
      const places = await mapClient.placesNearby({
        params: {
          key,
          location: `${lat},${lng}`,
          keyword: 'indoor dinning',
          rankby: 'distance',
        },
      });
      return places.data.results;
    },
    restraurant: async (_, { id }, { mapClient, models }) => {
      const place = await mapClient.placeDetails({
        params: {
          key,
          place_id: id,
        },
      });
      const reviews = await models.Review.find({ placeId: id });
      return { ...place.data.result, reviews };
    },
  },
  Photo: {
    photo_reference: async (parent, _, { mapClient }) => {
      const photo = await mapClient.placePhoto({
        params: {
          key,
          photoreference: parent.photo_reference,
          maxwidth: 500,
        },
      });
      return photo.data.toString('base64');
    },
  },
  Mutation: {
    signup: async (_, { user: { email, name, password } }, { models }) => {
      const user = new models.User({ email, name });
      const jwt = await user.pHash(password);
      const newUser = await user.save();
      return {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        jwt,
      };
    },
    signin: async (_, { user: { email, password } }, { models }) => {
      const user = models.User.findOne({ email });
      const jwt: string | undefined = await user.compare(password);
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        jwt,
      };
    },
    postReview: async (_, { review }, { models, token }) => {
      const j = await verifyJWT(token, review.userId);
      console.log(j);
      const newReview = await models.Review.create(review);
      pubsub.publish('GET_REVIEW', { getReview: newReview });
      return newReview;
    },
  },
  Subscription: {
    getReview: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['GET_REVIEW']),
        (payload, variables) => payload.placeId === variables.placeId
      ),
    },
  },
};

export default resolvers;
