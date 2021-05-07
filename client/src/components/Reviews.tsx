import { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import ReviewEditor from './ReviewEditor';
import ReviewList from './ReviewList';
import { Review } from 'lib/interface';

const GET_REVIEWS = gql`
  query GetReviews($placeId: ID!, $offset: Int = 0) {
    reviews(placeId: $placeId, limit: 6, offset: $offset) {
      reviews {
        id
        review
        user {
          id
          name
        }
        rating
        created_on
      }
      hasMore
    }
  }
`;

const GET_REVIEW = gql`
  subscription GetReview($placeId: ID!) {
    review: getReview(placeId: $placeId) {
      id
      review
      user {
        id
        name
      }
      rating
      created_on
    }
  }
`;
interface Props {
  placeId: string;
}

interface Data {
  reviews: {
    reviews: Review[];
    hasMore: boolean;
  };
}

export default function Reviews({ placeId }: Props) {
  const { data, loading, error, subscribeToMore, fetchMore } = useQuery(
    GET_REVIEWS,
    {
      variables: {
        placeId,
      },
    }
  );

  useEffect(() => {
    subscribeToMore({
      document: GET_REVIEW,
      variables: { placeId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          reviews: {
            reviews: [subscriptionData.data.review, ...prev.reviews.reviews],
            hasMore: prev.reviews.hasMore,
          },
        };
      },
    });
  }, [placeId, subscribeToMore]);

  const {
    reviews: { reviews, hasMore },
  }: Data = data ?? { reviews: {} };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  console.log(data);
  console.log(hasMore);

  return (
    <div className="m__details-reviews">
      <h2 className="font-weight-bold my-4 m__details-reviews-title">
        Customer Reviews
      </h2>
      <ReviewList fetchMore={fetchMore} hasMore={hasMore} reviews={reviews} />
      <div className="mt-4">
        <ReviewEditor placeId={placeId} />
      </div>
    </div>
  );
}
