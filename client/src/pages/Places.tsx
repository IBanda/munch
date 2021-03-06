import { useCallback, useEffect, useMemo, useState } from 'react';
import useGeo from 'lib/useGeo';
import { useLazyQuery, gql } from '@apollo/client';
import PlaceListView from 'components/PlaceListView';
import PlaceMap from 'components/PlaceMap';
import PlaceDetails from 'components/PlaceDetails';
import { AppDispatchProvider, AppStateProvider } from 'components/Context';
import isScrollatBottom from 'utils/isScrollatBottom';
import useBodyOverflow from 'lib/useBodyOverflow';
import { Loader } from '@progress/kendo-react-indicators';
import PlacesContainer from 'components/PlacesContainer';
import useQueryParams from 'lib/useQueryParams';
import extractVariables from 'utils/extractVariables';
import { useErrorHandler } from 'react-error-boundary';

const GET_PLACES = gql`
  query GetPlaces(
    $coordinates: PlaceInput
    $pagetoken: String = ""
    $keyword: String
  ) {
    places(
      coordinates: $coordinates
      keyword: $keyword
      pagetoken: $pagetoken
    ) {
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
const style = { zIndex: 10005 };
export default function Places() {
  const coords = useGeo();
  const [id, setId] = useState('');
  const [{ id: placeId, open }, setWindow] = useState({ open: false, id: '' });
  const [getPlaces, { data, error, loading, fetchMore, networkStatus }] =
    useLazyQuery(GET_PLACES, {
      notifyOnNetworkStatusChange: true,
    });

  useErrorHandler(error);
  const params = useQueryParams();
  useBodyOverflow(loading);
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
      const variables = extractVariables(params);
      getPlaces({
        variables: {
          coordinates: { lat: coords.lat, lng: coords.lng },
          // coordinates: { lat: 40.73061, lng: -73.935242 },
          ...variables,
        },
      });
    }
  }, [coords.lat, coords.lng, getPlaces, params]);
  const {
    places: { places, next_page_token },
  } = data || { places: {} };
  const scrollHandler = useCallback(
    (event: any) => {
      console.log('scroll');
      if (isScrollatBottom(event.nativeEvent) && next_page_token && !loading) {
        fetchMore?.({
          variables: {
            pagetoken: next_page_token,
          },
        });
      }
    },
    [fetchMore, loading, next_page_token]
  );
  const placeholder = Array(6).fill(1);
  return (
    <PlacesContainer>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          top: 0,
          width: '100%',
        }}
        className="row no-gutters"
      >
        <div
          className="col-xl-4 col-md-6  position-relative h-100 border-right"
          style={style}
        >
          <AppDispatchProvider context={dispatchContext}>
            <PlaceListView
              loadMore={scrollHandler}
              data={places || placeholder}
              loading={!data && !error}
            />
            {loading && networkStatus === 3 ? (
              <div className="m__loader-overlay">
                <Loader type="converging-spinner" themeColor="light" />
              </div>
            ) : null}
            {open ? <PlaceDetails id={placeId} setWindow={setWindow} /> : null}
          </AppDispatchProvider>
        </div>
        <div className="col-xl-8 col-md-6 d-none d-md-block h-100">
          <AppStateProvider context={appStateContext}>
            <PlaceMap data={places || []} />
          </AppStateProvider>
        </div>
      </div>
    </PlacesContainer>
  );
}
