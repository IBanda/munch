import { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import ReviewEditor from './ReviewEditor';
import ReviewList from './ReviewList';
import { Review } from 'lib/interface';
import Ratings from './Ratings';

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
  return (
    <div className="m__details-reviews">
      {reviews.length ? (
        <>
          <h2 className="font-weight-bold my-4 m__details-reviews-title">
            Customer Reviews
          </h2>
          <Ratings placeId={placeId} />
          <ReviewList
            fetchMore={fetchMore}
            hasMore={hasMore}
            reviews={reviews}
          />
        </>
      ) : (
        <h2 className="font-weight-bold my-4 m__details-reviews-title">
          No Reviews
        </h2>
      )}
      <div>
        <ReviewEditor placeId={placeId} />
      </div>
    </div>
  );
}
