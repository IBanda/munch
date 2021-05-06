import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { formatDistanceToNow } from 'date-fns';
import ReviewEditor from './ReviewEditor';

const GET_REVIEWS = gql`
  query GetReviews($placeId: ID!) {
    reviews(placeId: $placeId, limit: 3) {
      id
      review
      user {
        id
        name
      }
      created_on
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
      created_on
    }
  }
`;
interface Props {
  placeId: string;
}

interface Data {
  reviews: [
    {
      id: string;
      review: string;
      user: {
        id: string;
        name: string;
      };
      created_on: string;
    }
  ];
}

export default function Reviews({ placeId }: Props) {
  const { data, loading, error, subscribeToMore } = useQuery(GET_REVIEWS, {
    variables: {
      placeId,
    },
  });
  console.log(placeId);
  useEffect(() => {
    subscribeToMore({
      document: GET_REVIEW,
      variables: { placeId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          reviews: [subscriptionData.data.review, ...prev.reviews.slice(0, 2)],
        };
      },
    });
  }, [placeId, subscribeToMore]);

  console.log(data);
  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;
  const { reviews }: Data = data;

  return (
    <div className="m__details-reviews">
      <h2 className="font-weight-bold my-4 m__details-reviews-title">
        Customer Reviews
      </h2>
      {reviews.map((item) => (
        <div key={item.id} className="mb-4">
          <div className="d-flex flex-column">
            <div className="d-flex mb-2">
              <div
                style={{ width: 30, height: 30 }}
                className="rounded-circle bg-secondary text-uppercase d-flex align-items-center justify-content-center"
              >
                {item.user.name[0]}
              </div>
              <div className="d-flex flex-column ml-1">
                <span className="m__details-reviews-name">
                  <strong>{item.user.name}</strong>
                </span>
                <span className="m__details-reviews-created">
                  {formatDistanceToNow(+item.created_on, { addSuffix: true })}
                </span>
              </div>
            </div>
            <div className="m__details-reviews-text">
              <Review review={item.review} />
            </div>
          </div>
        </div>
      ))}
      <ReviewEditor placeId={placeId} />
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
