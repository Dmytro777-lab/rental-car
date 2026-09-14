import axios from 'axios';
import type {
  Car,
  CarFiltersResponse,
  CarsResponse,
  CarsFilters,
  BookingRequest,
  BookingResponse,
} from '@/types/car';

export const PER_PAGE = 12;

const api = axios.create({
  baseURL: 'https://car-rental-api.goit.study',
  timeout: 20000,
});

export const getCars = async (page = 1, filters: CarsFilters = {}): Promise<CarsResponse> => {
  const response = await api.get<CarsResponse>('/cars', {
    params: { page, perPage: PER_PAGE, ...filters },
  });
  return response.data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const response = await api.get<Car>(`/cars/${encodeURIComponent(id)}`);
  return response.data;
};

export const createBookingRequest = async (
  carId: string,
  values: BookingRequest,
): Promise<BookingResponse> => {
  const response = await api.post<BookingResponse>(
    `/cars/${encodeURIComponent(carId)}/booking-requests`,
    values,
  );
  return response.data;
};

export const getCarFilters = async (): Promise<CarFiltersResponse> => {
  const response = await api.get<CarFiltersResponse>('/cars/filters');
  return response.data;
};
