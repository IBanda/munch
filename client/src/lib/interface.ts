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
    weekday_text: string[];
  };
  types: string[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}
