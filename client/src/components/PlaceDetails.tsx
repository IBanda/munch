import { Window } from '@progress/kendo-react-dialogs';
import { useQuery, gql, ApolloError } from '@apollo/client';
import { Place } from 'lib/interface';
import ImageGrid from './ImageGrid';
import isToday from 'utils/isToday';
import Reviews from './Reviews';
import { SvgIcon } from '@progress/kendo-react-common';
import { globeLinkIcon } from '@progress/kendo-svg-icons';
import AppLoader from './AppLoader';

const GET_PLACE = gql`
  query GetPlace($placeId: ID!) {
    place(placeId: $placeId) {
      name
      place_id
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
    }
  }
`;

interface Props {
  id: string;
  setWindow: any;
}

export default function PlaceDetails({ id, setWindow }: Props) {
  const { data, error, loading } = useQuery(GET_PLACE, {
    variables: {
      placeId: id,
    },
  });

  return (
    <Window
      draggable={false}
      initialLeft={0}
      initialTop={0}
      className="w-100 vh-100 shadow-lg m__window"
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
}

interface DetailsProps {
  error: ApolloError | undefined;
  loading: boolean;
  data: { place: PlaceDetail };
}

function Details({ error, loading, data }: DetailsProps) {
  if (loading) return <AppLoader />;
  if (error) return <p>Error</p>;

  const { place } = data;
  const isOpen = place?.opening_hours?.open_now === true;
  const hide = place?.opening_hours?.open_now == null;

  return (
    <div className="container m__details">
      <ImageGrid images={place?.photos} name={place?.name} />
      <div className="mt-2 d-flex align-items-center">
        <h2 className="font-weight-bold mt-2 m__details-name">{place.name}</h2>
        {!hide && (
          <span
            className={`${
              isOpen ? 'bg-success' : 'bg-error'
            } ml-2  text-white text-uppercase m__details-status`}
          >
            {isOpen ? 'Open' : 'Closed'}
          </span>
        )}
      </div>
      {place.website ? (
        <a href={place.website} target="_blank" rel="noreferrer">
          <SvgIcon icon={globeLinkIcon} />
          <small>Website</small>
        </a>
      ) : null}
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
          {!hide && (
            <li className="bg-secondary p-2 mt-2 rounded">
              <strong>Hours: </strong>
              <ul>
                {place.opening_hours.weekday_text.map((txt) => (
                  <li key={txt}>{isToday(txt)}</li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </div>
      <Reviews placeId={place.place_id} />
    </div>
  );
}
