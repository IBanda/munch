import { Window } from '@progress/kendo-react-dialogs';
import { useQuery, gql, ApolloError } from '@apollo/client';
import { Place } from 'lib/interface';
import ImageGrid from './ImageGrid';
import isToday from 'utils/isToday';
import Reviews from './Reviews';
import { globeLinkIcon, mapMarkerTargetIcon } from '@progress/kendo-svg-icons';
import AppLoader from './AppLoader';
import AppErrorBoundary from './AppErrorBoundary';
import { useErrorHandler } from 'react-error-boundary';
import { lazy, Suspense } from 'react';
import { SvgIcon } from '@progress/kendo-react-common';

const GoogleMapReact: any = lazy(() => import('google-map-react'));

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
  const { data, error, loading, refetch } = useQuery(GET_PLACE, {
    variables: {
      placeId: id,
    },
  });

  return (
    <Window
      draggable={false}
      initialLeft={0}
      initialTop={0}
      className="w-100 h-100 shadow-none m__window border-0"
      minimizeButton={() => null}
      maximizeButton={() => null}
      onClose={() => setWindow({ open: false, id: '' })}
    >
      <AppErrorBoundary onReset={refetch}>
        <Details data={data} error={error} loading={loading} />
      </AppErrorBoundary>
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
  useErrorHandler(error);
  if (loading) return <AppLoader />;

  const { place } = data;
  const isOpen = place?.opening_hours?.open_now === true;
  const hide = place?.opening_hours?.open_now == null;
  const latLng = {
    lat: place.geometry.location.lat,
    lng: place.geometry.location.lng,
  };
  return (
    <div className="container m__details p-0">
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
        <a
          href={place.website}
          className="btn btn-primary btn-sm mb-2"
          target="_blank"
          rel="noreferrer"
        >
          <SvgIcon icon={globeLinkIcon} />
          <small>Website</small>
        </a>
      ) : null}
      <div className="m__details-info rounded">
        <ul className="p-0 m-0 list-unstyled">
          <li className="mb-2">
            <strong>Phone: </strong>
            {place.formatted_phone_number}
          </li>
          <li className="mb-2">
            <strong>Address: </strong>
            {place.formatted_address}
          </li>
          {!hide && (
            <li className="bg-secondary p-2 mb-4 rounded">
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
      <div className="d-md-none" style={{ height: 150, width: '100%' }}>
        <Suspense fallback={() => <AppLoader />}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
            }}
            center={latLng}
            zoom={12}
          >
            <Marker lat={latLng.lat} lng={latLng.lng} />
          </GoogleMapReact>
        </Suspense>
      </div>
      <Reviews placeId={place.place_id} />
    </div>
  );
}

function Marker({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div>
      <SvgIcon
        themeColor={'tertiary'}
        className="m__marker"
        icon={mapMarkerTargetIcon}
      />
    </div>
  );
}
