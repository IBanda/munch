import { useEffect } from 'react';
import { ProgressBar } from '@progress/kendo-react-progressbars';
import { useQuery, gql } from '@apollo/client';
import { Rating } from '@progress/kendo-react-inputs';
import ratingData from 'utils/ratingData';

const GET_RATINGS = gql`
  query GetRatings($placeId: ID!) {
    ratings(placeId: $placeId) {
      ratings
    }
  }
`;

const GET_RATING = gql`
  subscription GetRating($placeId: ID!) {
    rating: getRating(placeId: $placeId) {
      ratings
    }
  }
`;

interface Props {
  placeId: string;
}

export default function Ratings({ placeId }: Props) {
  const { loading, error, data, subscribeToMore } = useQuery(GET_RATINGS, {
    variables: {
      placeId,
    },
  });

  useEffect(() => {
    subscribeToMore({
      document: GET_RATING,
      variables: {
        placeId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        return {
          ratings: {
            ratings: subscriptionData.data.rating.ratings,
          },
        };
      },
    });
  }, [placeId, subscribeToMore]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const {
    ratings: { ratings },
  } = data;

  const { averageRating, totalNumofRatings, ratingValue } = ratingData(ratings);
  return (
    <div className=" mb-4 rounded">
      <div className="d-flex align-items-center">
        {averageRating ? <h1 className="mr-2">{averageRating}</h1> : null}
        <Rating value={averageRating} precision="half" readonly />
        <span>
          <small>{totalNumofRatings || 'No'} Review(s)</small>
        </span>
      </div>
      <div>
        {ratings.map((rating: number, index: number) => {
          const actualRating = ratingValue[index];
          return (
            <RatingsBar
              key={actualRating}
              rating={actualRating}
              total={rating}
              percent={findPercent(rating, totalNumofRatings)}
            />
          );
        })}
      </div>
    </div>
  );
}

interface RatingBarProps {
  rating: number;
  total: number;
  percent: number;
}

function RatingsBar({ rating, total, percent }: RatingBarProps) {
  return (
    <div className="d-flex align-items-center">
      <span className="mr-2">
        <small>{rating}</small>
      </span>
      <ProgressBar
        value={percent}
        label={(props) => <span>{props.value ? `${props.value}%` : ''}</span>}
      />
      <span className="ml-2">
        <small>{total || ''}</small>
      </span>
    </div>
  );
}

function findPercent(total: number, overallTotal: number) {
  return Math.round((total / overallTotal) * 100);
}
