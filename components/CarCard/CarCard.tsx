import Image from 'next/image';
import Link from 'next/link';
import type { Car } from '@/types/car';

type CarCardProps = {
  car: Car;
};

export default function CarCard({ car }: CarCardProps) {
  return (
    <article>
      <Image src={car.img} alt={car.description} width={244} height={268} />
      <h2>
        {car.brand} {car.model}, {car.year}
      </h2>
      <p>${car.rentalPrice}</p>
      <p>
        {car.location.city}, {car.location.country}
      </p>
      <p>{car.rentalCompany}</p>
      <p>
        {car.type}, {car.mileage} km
      </p>
      <Link href={`/catalog/${car.id}`}>Read more</Link>
    </article>
  );
}
