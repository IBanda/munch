import { useEffect, useState } from 'react';

interface CoordState {
  lat: number;
  lng: number;
}
function getCoords() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
export default function useGeo() {
  const [coords, setCoords] = useState<CoordState>({ lat: 0, lng: 0 });
  useEffect(() => {
    getCoords()
      .then((position) => {
        setCoords({
          lat: (position as GeolocationPosition).coords.latitude,
          lng: (position as GeolocationPosition).coords.longitude,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return coords;
}
