export type HotelListType = {
  checkIn: {
    from: string;
    to: string;
  };
  checkOut: {
    from: string;
    to: string;
  };
  contact: {
    phoneNumber: string;
    email: string;
  };
  currency: string;
  gallery: string[];
  id: number;
  location: {
    address: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  name: string;
  price: number;
  stars: number;
  userRating: number;
};
