import { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import useGeo from 'lib/useGeo';
import { useLazyQuery, gql } from '@apollo/client';
import PlaceListView from 'components/ListView';
import PlaceMap from 'components/PlaceMap';
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
  const [getPlaces, { data, error }] = useLazyQuery(GET_RESTAURANTS);
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
        <div className="col-lg-5 vh-100 overflow-auto">
          <AppDispatchProvider setId={setId}>
            <PlaceListView data={data} />
          </AppDispatchProvider>
        </div>
        <div className="col-lg-7 vh-100">
          <AppStateProvider id={id}>
            <PlaceMap data={data} />
          </AppStateProvider>
        </div>
      </div>
    </Layout>
  );
}
