import Image from 'next/image';
import Link from 'next/link';
import type { Car } from '@/types/car';
import css from './CarCard.module.css';

export default function CarCard({ car }: { car: Car }) {
  return (
    <article className={css.card}>
      <Image
        className={css.image}
        src={car.img}
        alt={`${car.brand} ${car.model}, ${car.year}`}
        width={244}
        height={268}
        sizes="(max-width: 540px) 90vw, (max-width: 800px) 45vw, (max-width: 1100px) 30vw, 244px"
      />
      <div className={css.heading}>
        <h2>
          {car.brand} <span>{car.model}</span>, {car.year}
        </h2>
        <p>${car.rentalPrice}</p>
      </div>
      <div className={css.meta}>
        <div>
          <span>{car.location.city}</span>
          <span>{car.location.country}</span>
          <span>{car.rentalCompany}</span>
        </div>
        <div>
          <span>{car.type}</span>
          <span>{car.mileage.toLocaleString('en-US')} km</span>
        </div>
      </div>
      <Link
        className="button"
        href={`/catalog/${car.id}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read more about ${car.brand} ${car.model} (opens in a new tab)`}
      >
        Read more
      </Link>
    </article>
  );
}
