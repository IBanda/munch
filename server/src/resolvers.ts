import getRatings from './utils/getRatings';
import uploadImage from './lib/uploadImage';
import st from 'stream';
import { promisify } from 'util';
import fs from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import {
  PubSub,
  withFilter,
  UserInputError,
  ForbiddenError,
} from 'apollo-server-express';

const pipeline = promisify(st.pipeline);

const pubsub = new PubSub();
const key = process.env.GOOGLE_MAPS_API_KEY;

const resolvers = {
  Query: {
    places: async (
      _,
      { coordinates: { lat, lng }, pagetoken = null },
      { mapClient }
    ) => {
      const params = {
        key,
        location: `${lat},${lng}`,
        keyword: 'indoor dinning',
        rankby: 'distance',
      };

      if (pagetoken) {
        (params as any).pagetoken = pagetoken;
      }

      const places = await mapClient.placesNearby({
        params,
      });

      return {
        places: places.data.results,
        next_page_token: places.data.next_page_token,
      };
    },
    place: async (_, { placeId }, { mapClient }) => {
      const place = await mapClient.placeDetails({
        params: {
          key,
          place_id: placeId,
        },
      });
      return place.data.result;
    },
    reviews: async (_, { placeId, limit = 6, offset = 0 }, { models }) => {
      const reviews = await models.Review.find({ placeId })
        .sort({ created_on: -1 })
        .limit(limit)
        .skip(offset)
        .populate('user');
      const count = await models.Review.countDocuments({ placeId });
      const hasMore = count > offset + limit;

      return { reviews, hasMore };
    },
    ratings: async (_, { placeId }) => {
      const ratings = getRatings(placeId);
      return { placeId, ratings };
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
  Place: {
    async ratings(parent) {
      const ratings = getRatings(parent.place_id);
      return ratings;
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
    postReview: async (_, { review, files }, { models }) => {
      const fileUrls = [];
      if (files?.length) {
        const resolvedFiles = await Promise.all(
          files.map((file) => file.promise)
        );
        while (resolvedFiles.length) {
          const file: any = resolvedFiles.pop();
          const path = join(tmpdir(), file.filename);
          await pipeline(file.createReadStream(), fs.createWriteStream(path));
          const objUrl = await uploadImage(file.filename, path);
          fileUrls.push(objUrl);
        }
      }
      const newReview = await models.Review.create({
        ...review,
        images: fileUrls,
      });

      await models.Review.populate(newReview, { path: 'user' });
      pubsub.publish('GET_REVIEW', { getReview: newReview });
      pubsub.publish('GET_RATINGS', {
        getRating: { placeId: newReview.placeId, ratings: [newReview.rating] },
      });
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
    getRating: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['GET_RATINGS']),
        ({ getRating }, variables) => getRating.placeId === variables.placeId
      ),
    },
  },
};

export default resolvers;
