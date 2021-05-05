import {
  PubSub,
  withFilter,
  UserInputError,
  ForbiddenError,
} from 'apollo-server-express';

const pubsub = new PubSub();

const key = process.env.GOOGLE_MAPS_API_KEY;

const resolvers = {
  Query: {
    restaurants: async (_, { coordinates: { lat, lng } }, { mapClient }) => {
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
    restaurant: async (_, { id }, { mapClient, models }) => {
      const place = await mapClient.placeDetails({
        params: {
          key,
          place_id: id,
        },
      });
      return place.data.result;
    },
    reviews: async (_, { placeId }, { models }) => {
      const reviews = await models.Review.find({ placeId }).populate('user');
      return reviews;
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
    signup: async (_, { user: { email, name, password } }, { models, req }) => {
      const doesUserExist = await models.User.exists({ email });
      if (doesUserExist)
        throw new UserInputError('User with this email already exists');

      const user = new models.User({ email, name });
      await user.pHash(password);
      const newUser = await user.save();
      req.session.user = newUser.id;
      return {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      };
    },
    signin: async (_, { user: { email, password } }, { models, req }) => {
      const user = await models.User.findOne({ email });
      if (!user)
        throw new UserInputError('User with this email does not exist');

      const isValidPassword = await user.compare(password);
      if (!isValidPassword)
        throw new ForbiddenError(
          'The password provided does not match the user'
        );
      req.session.user = user.id;
      return {
        id: user._id,
        name: user.name,
        email: user.email,
      };
    },
    postReview: async (_, { review }, { models }) => {
      const newReview = await models.Review.create(review);
      await models.Review.populate(newReview, { path: 'user' });
      pubsub.publish('GET_REVIEW', { getReview: newReview });
      return newReview;
    },
    editReview: async (_, { review, id }, { models }) => {
      const updatedReview = await models.Review.findOneAndUpdate(
        { _id: id },
        { review },
        { new: true }
      );
      return updatedReview;
    },
    deleteReview: async (_, { id }, { models }) => {
      const review = await models.Review.findOneAndDelete({ _id: id });
      return review._id;
    },
  },
  Subscription: {
    getReview: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['GET_REVIEW']),
        ({ getReview }, variables) => {
          return getReview.placeId === variables.placeId;
        }
      ),
    },
  },
};

export default resolvers;
