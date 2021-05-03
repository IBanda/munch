import { useEffect, useMemo, useState } from 'react';
import Layout from 'components/Layout';
import useGeo from 'lib/useGeo';
import { useLazyQuery, gql } from '@apollo/client';
import PlaceListView from 'components/ListView';
import PlaceMap from 'components/PlaceMap';
import PlaceDetails from 'components/PlaceDetails';
import { AppDispatchProvider, AppStateProvider } from 'components/Context';

const GET_RESTAURANTS = gql`
  query GetRestaurants($coordinates: RestaurantInput) {
    places: restaurants(coordinates: $coordinates) {
      name
      place_id
      opening_hours {
        open_now
      }
      photos {
        photo_reference
      }
      geometry {
        location {
          lat
          lng
        }
      }
      vicinity
      types
    }
  }
`;

export default function Places() {
  const coords = useGeo();
  const [id, setId] = useState('');
  const [{ id: placeId, open }, setWindow] = useState({ open: false, id: '' });
  const [getPlaces, { data, error }] = useLazyQuery(GET_RESTAURANTS);

  const dispatchContext = useMemo(
    () => ({
      setId,
      setWindow,
    }),
    []
  );

  const appStateContext = useMemo(
    () => ({
      id,
      setWindow,
    }),
    [id]
  );
  useEffect(() => {
    if (coords.lat || coords.lng) {
      getPlaces({
        variables: {
          coordinates: { lat: coords.lat, lng: coords.lng },
        },
      });
    }
  }, [coords.lat, coords.lng, getPlaces]);
  if (!data && !error) return <p>Loading ...</p>;
  if (error) return <p>Error</p>;
  return (
    <Layout className="p-0" fluid>
      <div className="row no-gutters">
        <div
          className={`col-lg-4 vh-100 ${
            open ? 'overflow-hidden' : 'overflow-auto'
          }`}
        >
          <AppDispatchProvider context={dispatchContext}>
            <PlaceListView data={data} />
          </AppDispatchProvider>
          {open ? <PlaceDetails id={placeId} setWindow={setWindow} /> : null}
        </div>
        <div className="col-lg-8 vh-100">
          <AppStateProvider context={appStateContext}>
            <PlaceMap data={data} />
          </AppStateProvider>
        </div>
      </div>
    </Layout>
  );
}
