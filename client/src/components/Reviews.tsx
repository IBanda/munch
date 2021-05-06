import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { formatDistanceToNow } from 'date-fns';
import ReviewEditor from './ReviewEditor';
import { Rating } from '@progress/kendo-react-inputs';
import { ListView } from '@progress/kendo-react-listview';

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
    reviews: [
      {
        id: string;
        review: string;
        user: {
          id: string;
          name: string;
        };
        rating: number;
        created_on: string;
      }
    ];
    hasMore: boolean;
  };
}

function RenderItem(props: any) {
  const item = props.dataItem;
  return (
    <div key={item.id} className="mb-4 py-2">
      <div className="d-flex flex-column">
        <div className="d-flex mb-2">
          <div
            style={{ width: 30, height: 30 }}
            className="rounded-circle bg-primary text-white text-uppercase d-flex align-items-center justify-content-center"
          >
            {item.user.name[0]}
          </div>
          <div className="d-flex flex-column ml-1">
            <span className="m__details-reviews-name">
              <strong>{item.user.name}</strong>
            </span>
            <div className="d-flex align-items-center">
              <Rating
                className="m__rating"
                value={item.rating}
                id={`rating-${item.user.name}`}
                readonly
              />
              <span className="m__details-reviews-created">
                <strong>
                  {formatDistanceToNow(+item.created_on, {
                    addSuffix: true,
                  })}
                </strong>
              </span>
            </div>
          </div>
        </div>
        <div className="m__details-reviews-text">
          <Review review={item.review} />
        </div>
      </div>
    </div>
  );
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
  const [offset, setOffset] = useState(6);

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

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  const {
    reviews: { reviews, hasMore },
  }: Data = data;
  const scrollHandler = (event: any) => {
    const e = event.nativeEvent;
    if (
      e.target.scrollTop + e.target.clientHeight + 10 > e.target.scrollHeight &&
      hasMore
    ) {
      fetchMore({
        variables: {
          offset,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            reviews: {
              __typename: 'ReviewsResult',
              reviews: [
                ...(prev as any).reviews.reviews,
                ...(fetchMoreResult as any).reviews.reviews,
              ],
              hasMore: (fetchMoreResult as any).reviews.hasMore,
            },
          };
        },
      });
      setOffset((p) => p + 6);
    }
  };

  return (
    <div className="m__details-reviews">
      <h2 className="font-weight-bold my-4 m__details-reviews-title">
        Customer Reviews
      </h2>
      <div className="m__listview-reviews" onScroll={scrollHandler}>
        <ListView item={RenderItem} data={reviews} className="rounded" />
      </div>
      <div className="mt-4">
        <ReviewEditor placeId={placeId} />
      </div>
    </div>
  );
}

interface ReviewProp {
  review: string;
}
function Review({ review }: ReviewProp) {
  const [clip, setClip] = useState(true);
  const { length } = review;
  const isLongerthan = length - 15 > 250;
  return (
    <>
      <p>{clip ? review.trim().slice(0, 250) : review}</p>

      {isLongerthan ? (
        clip ? (
          <button
            onClick={() => setClip(false)}
            className="text-primary m__details-reviews-morebtn"
          >
            <small>Show more</small>
          </button>
        ) : null
      ) : null}
    </>
  );
}
