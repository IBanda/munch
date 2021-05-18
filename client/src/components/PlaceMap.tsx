import GoogleMapReact from 'google-map-react';
import { Loader } from '@progress/kendo-react-indicators';
import useGeo from 'lib/useGeo';
import { Place } from 'lib/interface';
import PlaceMarker from './PlaceMarker';

interface Props {
  data: Place[];
}

export default function PlaceMap({ data }: Props) {
  const center = useGeo();
  return center.lat || center.lng ? (
    <div className="h-100 w-100">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: String(process.env.REACT_APP_GOOGLE_MAP_API_KEY),
        }}
        options={{
          fullscreenControl: false,
        }}
        zoom={14}
        // center={{ lat: Number(center.lat), lng: Number(center.lng) }}
        center={{ lat: 40.73061, lng: -73.935242 }}
        // center={{ lat: 51.509865, lng: -0.118092 }}
      >
        {data.map((place) => (
          <PlaceMarker
            key={place?.place_id}
            id={place?.place_id}
            name={place?.name}
            lat={place?.geometry?.location.lat}
            lng={place?.geometry?.location.lng}
            open={place?.opening_hours?.open_now}
          />
        ))}
      </GoogleMapReact>
    </div>
  ) : (
    <div className="h-100 w-100 d-flex align-items-center justify-content-center">
      <Loader themeColor="primary" type="converging-spinner" />
    </div>
  );
}
