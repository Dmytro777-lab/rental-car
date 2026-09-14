'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { FiCalendar, FiCheckCircle, FiMapPin, FiSettings } from 'react-icons/fi';
import { PiCarProfile, PiGasPump, PiRoadHorizon } from 'react-icons/pi';
import { getCarById } from '@/lib/api/cars';
import BookingForm from '../BookingForm/BookingForm';
import css from './CarDetails.module.css';

export default function CarDetails({ id }: { id: string }) {
  const {
    data: car,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['car', id],
    queryFn: () => getCarById(id),
  });
  if (isPending) return <p className={css.loading}>Loading, please wait...</p>;
  if (isError) {
    return (
      <div className="status-panel" role="alert">
        <h1>Could not load this car</h1>
        <p>Please try again or choose another car.</p>
        <button
          className="button button-outline"
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          Try again
        </button>
        <Link className={css.back} href="/catalog">
          Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <article className={css.details}>
      <div className={css.left}>
        <Image
          className={css.photo}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={512}
          sizes="(max-width: 900px) 90vw, 640px"
          preload
        />
        <BookingForm key={car.id} carId={car.id} />
      </div>
      <div className={css.info}>
        <div className={css.titleRow}>
          <h1>
            {car.brand} {car.model}, {car.year}
          </h1>
          <span>Article: {car.stockNumber}</span>
        </div>
        <p className={css.location}>
          <FiMapPin aria-hidden="true" />
          {car.location.city}, {car.location.country}
        </p>
        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.description}>{car.description}</p>
        <section className={css.section}>
          <h2>Rental Conditions:</h2>
          <ul>
            {car.rentalConditions.map((condition) => (
              <li key={condition}>
                <FiCheckCircle aria-hidden="true" />
                <span>{condition}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className={css.section}>
          <h2>Car Specifications:</h2>
          <ul>
            <li>
              <FiCalendar aria-hidden="true" />
              <span>Year: {car.year}</span>
            </li>
            <li>
              <PiCarProfile aria-hidden="true" />
              <span>Type: {car.type}</span>
            </li>
            <li>
              <PiGasPump aria-hidden="true" />
              <span>Fuel Consumption: {car.fuelConsumption}</span>
            </li>
            <li>
              <FiSettings aria-hidden="true" />
              <span>Engine: {car.engine}</span>
            </li>
            <li>
              <PiRoadHorizon aria-hidden="true" />
              <span>Mileage: {car.mileage.toLocaleString('en-US')} km</span>
            </li>
          </ul>
        </section>
        <section className={css.section}>
          <h2>Features</h2>
          <ul>
            {car.features.map((feature) => (
              <li key={feature}>
                <FiCheckCircle aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
