import { useEffect, useState } from 'react';
import { ListView, ListViewEvent } from '@progress/kendo-react-listview';
import 'simplebar/dist/simplebar.min.css';
import { Review } from 'lib/interface';
import isScrollatBottom from 'utils/isScrollatBottom';
import AppLoader from './AppLoader';
import { useQuery, gql } from '@apollo/client';
import ReviewCard from './ReviewCard';

const GET_REVIEWS = gql`
  query GetReviews($placeId: ID!, $offset: Int = 0) {
    reviews(placeId: $placeId, limit: 6, offset: $offset) {
      reviews {
        id
        placeId
        review
        user {
          id
          name
          profilePic
        }
        rating
        created_on
        images
      }
      hasMore
    }
  }
`;

const GET_REVIEW = gql`
  subscription GetReview($placeId: ID!) {
    review: getReview(placeId: $placeId) {
      id
      placeId
      review
      user {
        id
        name
        profilePic
      }
      rating
      created_on
      images
    }
  }
`;

const DELETE_REVIEW_SUB = gql`
  subscription DeleteReviewSub($placeId: ID!) {
    deleteReview(placeId: $placeId) {
      placeId
      id
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

export default function ReviewList({ placeId }: Props) {
  const [offset, setOffset] = useState(6);
  const { data, loading, error, fetchMore, subscribeToMore, networkStatus } =
    useQuery(GET_REVIEWS, {
      variables: {
        placeId,
      },
      notifyOnNetworkStatusChange: true,
    });

  const {
    reviews: { reviews = [], hasMore },
  }: Data = data ?? { reviews: {} };

  useEffect(() => {
    subscribeToMore({
      document: GET_REVIEW,
      variables: { placeId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          reviews: {
            reviews: [subscriptionData.data.review],
          },
        };
      },
    });
  }, [placeId, subscribeToMore]);

  useEffect(() => {
    subscribeToMore({
      document: DELETE_REVIEW_SUB,
      variables: { placeId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const item = prev.reviews.reviews.find(
          (review: any) => review.id === subscriptionData.data.deleteReview.id
        );
        const deleted = { ...item };
        deleted.created_on = 'DELETED';
        return {
          reviews: {
            hasMore: prev.reviews.hasMore,
            reviews: [deleted],
          },
        };
      },
    });
  }, [placeId, subscribeToMore]);

  const scrollHandler = (event: ListViewEvent) => {
    if (isScrollatBottom(event.nativeEvent) && hasMore) {
      fetchMore({
        variables: {
          offset,
        },
      });
      setOffset((p) => p + 6);
    }
  };
  if (error) return null;

  return (
    <div className="shadow p-2">
      <ListView
        onScroll={scrollHandler}
        item={ReviewCard}
        data={reviews}
        className="rounded m__listview-reviews"
      />
      {loading && networkStatus === 3 && (
        <AppLoader wrapperClassName="py-2" type="pulsing" />
      )}
    </div>
  );
}
