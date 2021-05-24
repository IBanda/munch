import { useEffect, useState } from 'react';
import { ListView, ListViewEvent } from '@progress/kendo-react-listview';
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
  const {
    data,
    loading,
    error,
    fetchMore,
    networkStatus,
    startPolling,
    stopPolling,
  } = useQuery(GET_REVIEWS, {
    variables: {
      placeId,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    startPolling(50000);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  const {
    reviews: { reviews = [], hasMore },
  }: Data = data ?? { reviews: {} };

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
    <div className="shadow ">
      <ListView
        onScroll={scrollHandler}
        item={ReviewCard}
        data={reviews}
        className="rounded m__listview-reviews my-2"
      />
      {loading && networkStatus === 3 && (
        <AppLoader wrapperClassName="py-2" type="pulsing" />
      )}
    </div>
  );
}
