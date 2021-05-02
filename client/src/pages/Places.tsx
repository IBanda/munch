import { useEffect } from 'react';
import Layout from 'components/Layout';
import useGeo from 'lib/useGeo';
import { useLazyQuery, gql } from '@apollo/client';
import PlaceListView from 'components/ListView';

const GET_RESTAURANTS = gql`
  query GetRestaurants($coordinates: RestaurantInput) {
    restaurants(coordinates: $coordinates) {
      name
      place_id
      opening_hours {
        open_now
      }
      photos {
        photo_reference
      }
      vicinity
      types
    }
  }
`;
export default function Places() {
  const coords = useGeo();
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
        <div className="col-lg-6">
          <PlaceListView data={data} />
        </div>
        <div className="col-lg-6"></div>
      </div>
    </Layout>
  );
}
