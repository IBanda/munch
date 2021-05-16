import ReviewEditor from './ReviewEditor';
import ReviewList from './ReviewList';
import Ratings from './Ratings';

interface Props {
  placeId: string;
}

export default function Reviews({ placeId }: Props) {
  return (
    <div className="m__details-reviews">
      <h2 className="font-weight-bold my-2 m__details-reviews-title">
        Customer Reviews
      </h2>
      <Ratings placeId={placeId} />
      <ReviewList placeId={placeId} />
      <ReviewEditor placeId={placeId} />
    </div>
  );
}
