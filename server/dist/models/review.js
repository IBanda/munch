'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = require('mongoose');
const ReviewSchema = new mongoose_1.Schema({
  review: { type: String, required: true },
  user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
  placeId: { type: String, required: true },
  rating: Number,
  images: [String],
  created_on: { type: String, default: Date.now() },
});
const ReviewModel = mongoose_1.model('review', ReviewSchema);
exports.default = ReviewModel;
