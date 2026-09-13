import axios from 'axios';
import { Car } from '@/types/car';
import type { CarsResponse } from '@/types/car';

const api = axios.create({
  baseURL: 'https://car-rental-api.goit.study',
});

export const getCars = async (): Promise<CarsResponse> => {
  const response = await api.get<CarsResponse>(`/cars`);

  return response.data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const response = await api.get<Car>(`/cars/${id}`);
  return response.data;
};
