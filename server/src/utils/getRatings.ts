import Review from '../models/review';

export default async function getRatings(placeId: string) {
  let rating = 5;
  const ratings = [];
  while (rating) {
    const count = await Review.countDocuments({
      placeId,
      rating,
    });
    ratings.push(count);
    rating--;
  }
  return ratings;
}
