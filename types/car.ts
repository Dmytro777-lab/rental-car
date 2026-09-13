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
  fuelConsumption: string;
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
