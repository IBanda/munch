import getRatings from './utils/getRatings';
import { deleteImages, uploadImage } from './lib/s3';
import st from 'stream';
import { promisify } from 'util';
import fs from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { UserInputError, ForbiddenError } from 'apollo-server-express';

const pipeline = promisify(st.pipeline);

const key = process.env.GOOGLE_MAPS_API_KEY;

const resolvers = {
  Query: {
    places: async (
      _,
      { coordinates: { lat, lng }, pagetoken = null, keyword = '' },
      { mapClient }
    ) => {
      const params = {
        key,
        location: `${lat},${lng}`,
        keyword: keyword + 'restaurant',
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

    getUser: async (_, __, { req, models }) => {
      const id = req.session.user;
      if (!id) return null;
      const user = await models.User.findOne({ _id: id });
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      };
    },
    ratings: async (_, { placeId }) => {
      const ratings = await getRatings(placeId);
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
    ratings: async (parent) => {
      const ratings = await getRatings(parent.place_id);
      return ratings;
    },
  },
  Mutation: {
    signup: async (
      _,
      { user: { email, name, password, profilePic } },
      { models, req }
    ) => {
      const doesUserExist = await models.User.exists({ email });
      if (doesUserExist) throw new UserInputError('Email already exists');

      let imgUrl;
      if (profilePic) {
        const path = join(tmpdir(), profilePic.file.filename);
        await pipeline(
          profilePic.file.createReadStream(),
          fs.createWriteStream(path)
        );
        imgUrl = await uploadImage('prfpics-' + profilePic.file.filename, path);
      }

      const user = new models.User({ email, name, profilePic: imgUrl });
      await user.pHash(password);
      const newUser = await user.save();
      req.session.user = newUser.id;

      return {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
      };
    },
    signin: async (_, { user: { email, password } }, { models, req }) => {
      const user = await models.User.findOne({ email });
      if (!user)
        throw new UserInputError('User with this email does not exist');

      const isValidPassword = await user.compare(password);
      if (!isValidPassword) throw new ForbiddenError('Invalid password');
      req.session.user = user.id;
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      };
    },
    postReview: async (_, { review, files }, { req, models }) => {
      // if (!req.session.user)
      //   throw new ForbiddenError('You must be signed in to post a review');
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

      return newReview;
    },
    deleteReview: async (_, { id, hasImages }, { req, models }) => {
      // if (!req.session.user) throw new ForbiddenError('You must be signed');

      let review;
      let images;
      if (hasImages) {
        review = await models.Review.findById(id);
        images = review.images;
      }
      review = await models.Review.findOneAndDelete({ _id: id });

      if (images) {
        await deleteImages(images);
      }

      return review;
    },
    logout: async (_, __, { req }) => {
      await req.session.destroy();
      return null;
    },
  },
};

export default resolvers;
