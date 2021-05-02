export interface Photo {
  photo_reference: string;
}

export interface OpenHours {
  open_now: Boolean;
}

export interface Place {
  name: string;
  photos: Photo[];
  vicinity: string;
  opening_hours: OpenHours;
  types: string[];
}
