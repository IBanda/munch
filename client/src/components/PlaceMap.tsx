import GoogleMapReact from 'google-map-react';
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
        zoom={10}
        center={{ lat: Number(center.lat), lng: Number(center.lng) }}
      >
        {data.map((place) => (
          <PlaceMarker
            key={place?.place_id}
            placeId={place?.place_id}
            name={place?.name}
            lat={place?.geometry?.location.lat}
            lng={place?.geometry?.location.lng}
            open={place?.opening_hours?.open_now}
          />
        ))}
      </GoogleMapReact>
    </div>
  ) : (
    <h1>loading</h1>
  );
}
