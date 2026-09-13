'use client';
import { useQuery } from '@tanstack/react-query';
import { getCars } from '@/lib/api/cars';
import CarCard from '../CarCard/CarCard';

export default function Catalog() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  });
  if (isPending) return <p>Loading, please wait...</p>;

  if (isError) return <p>Something went wrong.</p>;

  if (data.cars.length === 0)
    return <p>No cars available at the moment. Please try again later.</p>;
  return (
    <ul>
      {data.cars.map((car) => (
        <li key={car.id}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
}
