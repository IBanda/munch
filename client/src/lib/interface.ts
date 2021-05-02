export interface Photo {
  photo_reference: string;
}

export interface Place {
  place_id: string;
  name: string;
  photos: Photo[];
  vicinity: string;
  opening_hours: {
    open_now: boolean;
  };
  types: string[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}
