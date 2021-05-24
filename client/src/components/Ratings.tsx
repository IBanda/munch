import { useEffect } from 'react';
import { ProgressBar } from '@progress/kendo-react-progressbars';
import { Rating } from '@progress/kendo-react-inputs';
import ratingData, { formatRating } from 'utils/ratingData';
import { gql, useQuery } from '@apollo/client';
import { useErrorHandler } from 'react-error-boundary';

const GET_RATINGS = gql`
  query GetRatings($placeId: ID!) {
    ratings(placeId: $placeId) {
      placeId
      ratings
    }
  }
`;

interface Props {
  placeId: string;
}

export default function Ratings({ placeId }: Props) {
  const { data, error, loading, startPolling, stopPolling } = useQuery(
    GET_RATINGS,
    {
      variables: {
        placeId,
      },
    }
  );

  useEffect(() => {
    startPolling(5000);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  useErrorHandler(error);
  if (loading) return <p>Loading</p>;

  const {
    ratings: { ratings },
  } = data;

  const { averageRating, totalNumofRatings, ratingValue } = ratingData(ratings);

  return totalNumofRatings ? (
    <div className=" mb-4 rounded">
      <div className="d-flex align-items-center flex-wrap mb-2">
        {averageRating ? (
          <h3 className="mr-2 text-muted mb-0">
            {averageRating.toPrecision(2)}
          </h3>
        ) : null}
        <Rating value={formatRating(averageRating)} precision="half" readonly />
        <span>
          <small data-testid="num-of-ratings">({totalNumofRatings})</small>
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
  ) : null;
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
        <small>{total}</small>
      </span>
    </div>
  );
}

function findPercent(total: number, overallTotal: number) {
  return Math.round((total / overallTotal) * 100);
}
