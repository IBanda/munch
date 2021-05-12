import { useEffect, useRef, useCallback, useState } from 'react';
import { ListView } from '@progress/kendo-react-listview';
import SimpleBar from 'simplebar-react';
import { formatDistanceToNow } from 'date-fns';
import { Rating } from '@progress/kendo-react-inputs';
import ReviewText from './ReviewText';
import 'simplebar/dist/simplebar.min.css';
import { Review } from 'lib/interface';
import isScrollatBottom from 'utils/isScrollatBottom';
import AppLoader from './AppLoader';
import { useQuery, gql } from '@apollo/client';

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
      review
      user {
        id
        name
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
            hasMore: prev.reviews.hasMore,
          },
        };
      },
    });
  }, [placeId, subscribeToMore]);

  console.log(reviews);
  if (error) return <p>Error</p>;

  return (
    <SimpleBar
      scrollableNodeProps={{ ref: scrollBarRef }}
      className="m__listview-reviews shadow rounded mb-4"
    >
      <ListView item={RenderItem} data={reviews} className="rounded" />
      {loading && networkStatus === 3 && (
        <AppLoader wrapperClassName="py-2" type="pulsing" />
      )}
    </SimpleBar>
  );
}

function RenderItem(props: any) {
  const item = props.dataItem;
  return (
    <div
      key={item.id}
      style={{ backgroundColor: '#f3f6f8' }}
      className=" p-2  my-2"
    >
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center">
          <div
            style={{ width: 30, height: 30 }}
            className="mr-2 rounded-circle bg-primary text-white text-uppercase d-flex align-items-center justify-content-center"
          >
            {item?.user?.name[0]}
          </div>
          <span className="m__details-reviews-name">
            <strong>{item?.user?.name}</strong>
          </span>
        </div>

        <div className="d-flex flex-column ">
          <div>
            <div className="d-flex align-items-center m__meta">
              <Rating
                className="m__rating"
                value={item?.rating}
                id={`rating-${item?.user?.name}`}
                readonly
              />
              <span className="m__details-reviews-created">
                {formatDistanceToNow(+item?.created_on, {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
          <div className="m__details-reviews-text">
            <ReviewText review={item?.review} />
          </div>
          <ul className="list-unstyled mt-2 d-flex mb-0">
            {item?.images.map((image: string) => (
              <li key={image} className="mr-1">
                <img className="m__review-img" src={image} alt="review" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
