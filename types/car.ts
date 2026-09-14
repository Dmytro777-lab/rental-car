export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  img: string;
  rentalPrice: string;
  mileage: number;
  type: string;
  description: string;
  fuelConsumption: number;
  stockNumber: number;
  engine: string;
  features: string[];
  rentalCompany: string;
  location: { country: string; city: string; address: string };
  rentalConditions: string[];
};

export type CarsResponse = {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
};
export type CarFiltersResponse = {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
};

export type CarsFilters = {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
};
export type BookingRequest = { name: string; email: string; comment: string };
export type BookingResponse = { message: string };
