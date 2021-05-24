'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const getRatings_1 = __importDefault(require('./utils/getRatings'));
const s3_1 = require('./lib/s3');
const stream_1 = __importDefault(require('stream'));
const util_1 = require('util');
const fs_1 = __importDefault(require('fs'));
const os_1 = require('os');
const path_1 = require('path');
const apollo_server_express_1 = require('apollo-server-express');
const pipeline = util_1.promisify(stream_1.default.pipeline);
const key = process.env.GOOGLE_MAPS_API_KEY;
const resolvers = {
  Query: {
    places: (
      _,
      { coordinates: { lat, lng }, pagetoken = null, keyword = '' },
      { mapClient }
    ) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const params = {
          key,
          location: `${lat},${lng}`,
          keyword: keyword + 'restaurant',
          rankby: 'distance',
        };
        if (pagetoken) {
          params.pagetoken = pagetoken;
        }
        const places = yield mapClient.placesNearby({
          params,
        });
        return {
          places: places.data.results,
          next_page_token: places.data.next_page_token,
        };
      }),
    place: (_, { placeId }, { mapClient }) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const place = yield mapClient.placeDetails({
          params: {
            key,
            place_id: placeId,
          },
        });
        return place.data.result;
      }),
    reviews: (_, { placeId, limit = 6, offset = 0 }, { models }) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const reviews = yield models.Review.find({ placeId })
          .sort({ created_on: -1 })
          .limit(limit)
          .skip(offset)
          .populate('user');
        const count = yield models.Review.countDocuments({ placeId });
        const hasMore = count > offset + limit;
        return { reviews, hasMore };
      }),
    getUser: (_, __, { req, models }) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const id = req.session.user;
        if (!id) return null;
        const user = yield models.User.findOne({ _id: id });
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          profilePic: user.profilePic,
        };
      }),
    ratings: (_, { placeId }) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const ratings = yield getRatings_1.default(placeId);
        return { placeId, ratings };
      }),
  },
  Photo: {
    photo_reference: (parent, _, { mapClient }) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const photo = yield mapClient.placePhoto({
          params: {
            key,
            photoreference: parent.photo_reference,
            maxwidth: 500,
          },
        });
        return photo.data.toString('base64');
      }),
  },
  Place: {
    ratings: (parent) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const ratings = yield getRatings_1.default(parent.place_id);
        return ratings;
      }),
  },
  Mutation: {
    signup: (
      _,
      { user: { email, name, password, profilePic } },
      { models, req }
    ) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const doesUserExist = yield models.User.exists({ email });
        if (doesUserExist)
          throw new apollo_server_express_1.UserInputError(
            'Email already exists'
          );
        let imgUrl;
        if (profilePic) {
          const path = path_1.join(os_1.tmpdir(), profilePic.file.filename);
          yield pipeline(
            profilePic.file.createReadStream(),
            fs_1.default.createWriteStream(path)
          );
          imgUrl = yield s3_1.uploadImage(
            'prfpics-' + profilePic.file.filename,
            path
          );
        }
        const user = new models.User({ email, name, profilePic: imgUrl });
        yield user.pHash(password);
        const newUser = yield user.save();
        req.session.user = newUser.id;
        return {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          profilePic: newUser.profilePic,
        };
      }),
    signin: (_, { user: { email, password } }, { models, req }) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const user = yield models.User.findOne({ email });
        if (!user)
          throw new apollo_server_express_1.UserInputError(
            'User with this email does not exist'
          );
        const isValidPassword = yield user.compare(password);
        if (!isValidPassword)
          throw new apollo_server_express_1.ForbiddenError('Invalid password');
        req.session.user = user.id;
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          profilePic: user.profilePic,
        };
      }),
    postReview: (_, { review, files }, { req, models }) =>
      __awaiter(void 0, void 0, void 0, function* () {
        if (!req.session.user)
          throw new apollo_server_express_1.ForbiddenError(
            'You must be signed in to post a review'
          );
        const fileUrls = [];
        if (files === null || files === void 0 ? void 0 : files.length) {
          const resolvedFiles = yield Promise.all(
            files.map((file) => file.promise)
          );
          while (resolvedFiles.length) {
            const file = resolvedFiles.pop();
            const path = path_1.join(os_1.tmpdir(), file.filename);
            yield pipeline(
              file.createReadStream(),
              fs_1.default.createWriteStream(path)
            );
            const objUrl = yield s3_1.uploadImage(file.filename, path);
            fileUrls.push(objUrl);
          }
        }
        const newReview = yield models.Review.create(
          Object.assign(Object.assign({}, review), { images: fileUrls })
        );
        yield models.Review.populate(newReview, { path: 'user' });
        return newReview;
      }),
    deleteReview: (_, { id, hasImages }, { req, models }) =>
      __awaiter(void 0, void 0, void 0, function* () {
        if (!req.session.user)
          throw new apollo_server_express_1.ForbiddenError(
            'You must be signed'
          );
        let review;
        let images;
        if (hasImages) {
          review = yield models.Review.findById(id);
          images = review.images;
        }
        review = yield models.Review.findOneAndDelete({ _id: id });
        if (images) {
          yield s3_1.deleteImages(images);
        }
        return review;
      }),
    logout: (_, __, { req }) =>
      __awaiter(void 0, void 0, void 0, function* () {
        yield req.session.destroy();
        return null;
      }),
  },
};
exports.default = resolvers;
