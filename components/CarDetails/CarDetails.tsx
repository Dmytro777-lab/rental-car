'use client';
import BookingForm from '../BookingForm/BookingForm';
import { useQuery } from '@tanstack/react-query';
import { getCarById } from '@/lib/api/cars';
import Image from 'next/image';
type CarDetailsProps = {
  id: string;
};

export default function CarDetails({ id }: CarDetailsProps) {
  const {
    data: car,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['car', id],
    queryFn: () => getCarById(id),
  });
  if (isPending) return <p>Loading, please wait...</p>;

  if (isError) return <p>Something went wrong.</p>;

  return (
    <article>
      <div>
        <Image src={car.img} alt={`${car.brand} ${car.model}`} width={640} height={512} />
        <BookingForm carId={car.id} />
      </div>
      <div>
        <h2>
          {car.brand} {car.model}, {car.year}
        </h2>
        <p>
          {car.location.city}, {car.location.country}
        </p>
        <p>${car.rentalPrice}</p>

        <p>{car.description}</p>
        <h3>Rental conditions</h3>
        <ul>
          {car.rentalConditions.map((condition) => (
            <li key={condition}>{condition}</li>
          ))}
        </ul>
        <h3>Car specifications</h3>
        <ul>
          <li>Year: {car.year}</li>
          <li>Type: {car.type}</li>
          <li>Fuel consumption: {car.fuelConsumption}</li>
          <li>Engine: {car.engine}</li>
          <li>Mileage: {car.mileage} km</li>
        </ul>
        <h3>Features</h3>
        <ul>
          {car.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
