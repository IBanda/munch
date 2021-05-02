import { useEffect, useState } from 'react';

interface CoordState {
  lat: number;
  lng: number;
}
export default function useGeo() {
  const [coords, setCoords] = useState<CoordState>({ lat: 0, lng: 0 });
  useEffect(() => {
    function onSuccess(position: GeolocationPosition) {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess);
    }
  }, []);
  return coords;
}
