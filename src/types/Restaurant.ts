export type Restaurant = {
  location: any;
  name: string;
  address: string;
  visits?: number;
  specialties?: string[];
  placeId?: string; // place id from google
};
