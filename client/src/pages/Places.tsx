import { useEffect, useMemo, useRef, useState } from 'react';
import Layout from 'components/Layout';
import useGeo from 'lib/useGeo';
import { useLazyQuery, gql } from '@apollo/client';
import PlaceListView from 'components/PlaceListView';
import PlaceMap from 'components/PlaceMap';
import PlaceDetails from 'components/PlaceDetails';
import { AppDispatchProvider, AppStateProvider } from 'components/Context';
import isScrollatBottom from 'utils/isScrollatBottom';
import useBodyOverflow from 'lib/useBodyOverflow';
import { Loader } from '@progress/kendo-react-indicators';

const GET_PLACES = gql`
  query GetPlaces($coordinates: PlaceInput, $pagetoken: String = "") {
    places(coordinates: $coordinates, pagetoken: $pagetoken) {
      places {
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
        ratings
      }
      next_page_token
    }
  }
`;

export default function Places() {
  const coords = useGeo();
  const [id, setId] = useState('');
  const [{ id: placeId, open }, setWindow] = useState({ open: false, id: '' });
  const [
    getPlaces,
    { data, error, loading, fetchMore, networkStatus },
  ] = useLazyQuery(GET_PLACES, {
    notifyOnNetworkStatusChange: true,
  });
  const el = useRef<HTMLDivElement>(null);
  useBodyOverflow(open);

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
          // coordinates: { lat: 40.73061, lng: -73.935242 },
        },
      });
    }
  }, [coords.lat, coords.lng, getPlaces]);
  // if () return <p>Loading ...</p>;
  if (error) return <p>Error</p>;

  const {
    places: { places, next_page_token },
  } = data || { places: {} };
  const scrollHandler = (event: any) => {
    if (isScrollatBottom(event.nativeEvent) && next_page_token) {
      fetchMore?.({
        variables: {
          pagetoken: next_page_token,
        },
      });
    }
  };
  const placeholder = Array(6).fill(1);
  return (
    <Layout className="p-0 h-100" fluid>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          top: 80,
          width: '100%',
        }}
        className="row no-gutters"
      >
        <div
          className={`col-lg-4  position-relative h-100  ${
            open ? '' : 'overflow-auto '
          }`}
          onScroll={scrollHandler}
          ref={el}
        >
          <AppDispatchProvider context={dispatchContext}>
            <PlaceListView
              data={places || placeholder}
              loading={!data && !error}
            />
            {loading && networkStatus === 3 ? (
              <div className="m__loader-overlay">
                <Loader type="converging-spinner" themeColor="light" />
              </div>
            ) : null}
          </AppDispatchProvider>
          {open ? <PlaceDetails id={placeId} setWindow={setWindow} /> : null}
        </div>
        <div className="col-lg-8 h-100">
          <AppStateProvider context={appStateContext}>
            <PlaceMap data={places || []} />
          </AppStateProvider>
        </div>
      </div>
    </Layout>
  );
}
