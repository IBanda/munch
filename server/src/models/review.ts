import { Document, model, Model, Schema } from 'mongoose';

interface Review extends Document {
  review: string;
  userId: string;
  placeId: string;
  rating: number;
}

const ReviewSchema: Schema = new Schema({
  review: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  placeId: { type: String, required: true },
  rating: Number,
  created_on: { type: String, default: Date.now() },
});

const ReviewModel: Model<Review> = model('review', ReviewSchema);
export default ReviewModel;
