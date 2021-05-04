import { Window } from '@progress/kendo-react-dialogs';
import { useQuery, gql, ApolloError } from '@apollo/client';
import { Place } from 'lib/interface';
import ImageGrid from './ImageGrid';
import { formatDistanceToNow } from 'date-fns';
import ReviewEditor from './ReviewEditor';
import isToday from 'utils/isToday';
import { useState } from 'react';

interface Props {
  id: string;
  setWindow: any;
}

const GET_PLACE = gql`
  query GetPlace($id: ID!) {
    place: restaurant(id: $id) {
      name
      photos {
        photo_reference
      }
      formatted_address
      formatted_phone_number
      geometry {
        location {
          lat
          lng
        }
      }
      website
      opening_hours {
        open_now
        weekday_text
      }
      reviews {
        id
        review
        user {
          id
          name
        }
        created_on
      }
    }
  }
`;
export default function PlaceDetails({ id, setWindow }: Props) {
  const { data, error, loading } = useQuery(GET_PLACE, {
    variables: {
      id,
    },
  });

  return (
    <Window
      draggable={false}
      initialLeft={0}
      initialTop={0}
      className="w-100 h-100 shadow-lg m__window"
      minimizeButton={() => null}
      maximizeButton={() => null}
      onClose={() => setWindow({ open: false, id: '' })}
    >
      <Details data={data} error={error} loading={loading} />
    </Window>
  );
}

interface PlaceDetail extends Place {
  formatted_address: string;
  formatted_phone_number: string;
  website: string;
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

interface DetailsProps {
  error: ApolloError | undefined;
  loading: boolean;
  data: { place: PlaceDetail };
}

function Details({ error, loading, data }: DetailsProps) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const { place } = data;

  const isOpen = place.opening_hours.open_now === true;
  const hide = place.opening_hours.open_now == null;
  return (
    <div className="container m__details">
      <ImageGrid images={[]} name={place?.name} />
      <div className="mt-2 d-flex align-items-center">
        <h2 className="font-weight-bold mt-2 m__details-name">{place.name}</h2>
        {!hide ? (
          <span
            className={`${
              isOpen ? 'bg-success' : 'bg-danger'
            } ml-2  text-white text-uppercase m__details-status`}
          >
            {isOpen ? 'Open' : 'Closed'}
          </span>
        ) : null}
      </div>
      <a href={place.website} target="_blank" rel="noreferrer">
        <small>Website</small>
      </a>
      <div className="m__details-info rounded">
        <ul className="p-0 m-0 list-unstyled">
          <li>
            <strong>Phone: </strong>
            {place.formatted_phone_number}
          </li>
          <li>
            <strong>Address: </strong>
            {place.formatted_address}
          </li>
          {!hide ? (
            <li className="bg-light p-2 mt-2 rounded">
              <strong>Hours: </strong>
              <ul>
                {place.opening_hours.weekday_text.map((txt) => (
                  <li key={txt}>{isToday(txt)}</li>
                ))}
              </ul>
            </li>
          ) : null}
        </ul>
      </div>
      <div className="m__details-reviews">
        <h2 className="font-weight-bold my-4 m__details-reviews-title">
          Customer Reviews
        </h2>
        {place.reviews.map((item) => (
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
        <ReviewEditor />
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
  const isLongerthan = length > 250;
  return (
    <>
      <span>{clip ? review.slice(0, 250) : review}</span>
      {isLongerthan ? (
        clip ? (
          <button
            onClick={() => setClip(false)}
            className="text-primary m__details-reviews-morebtn"
          >
            <small>...More</small>
          </button>
        ) : (
          <button
            onClick={() => setClip(true)}
            className="  text-primary  m__details-reviews-lessbtn"
          >
            <small> ...less</small>
          </button>
        )
      ) : null}
    </>
  );
}
