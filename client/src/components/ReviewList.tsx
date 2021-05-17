import { useEffect, useRef, useCallback, useState } from 'react';
import { ListView } from '@progress/kendo-react-listview';
import SimpleBar from 'simplebar-react';
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
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(6);
  const {
    data,
    loading,
    error,
    fetchMore,
    subscribeToMore,
    networkStatus,
  } = useQuery(GET_REVIEWS, {
    variables: {
      placeId,
    },
    notifyOnNetworkStatusChange: true,
  });

  const {
    reviews: { reviews = [], hasMore },
  }: Data = data ?? { reviews: {} };

  const scrollHandler = useCallback(
    async (event: any) => {
      if (isScrollatBottom(event) && hasMore) {
        fetchMore({
          variables: {
            offset,
          },
        });
        setOffset((p) => p + 6);
      }
    },
    [fetchMore, hasMore, offset]
  );

  useEffect(() => {
    if (scrollBarRef.current) {
      scrollBarRef.current.onscroll = scrollHandler;
    }
  }, [scrollHandler]);

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

  if (error) return <p>Error</p>;

  return (
    <SimpleBar
      scrollableNodeProps={{ ref: scrollBarRef }}
      className="m__listview-reviews shadow rounded "
    >
      <ListView item={ReviewCard} data={reviews} className="rounded" />
      {loading && networkStatus === 3 && (
        <AppLoader wrapperClassName="py-2" type="pulsing" />
      )}
    </SimpleBar>
  );
}
