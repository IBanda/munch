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
  ratings: number[];
}

export interface Review {
  id: string;
  review: string;
  user: {
    id: string;
    name: string;
  };
  rating: number;
  created_on: string;
}
