'use client';

import { useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCarFilters } from '@/lib/api/cars';
import type { CarsFilters } from '@/types/car';
import css from './CarFilters.module.css';

type CarFiltersProps = {
  onApply: (filters: CarsFilters) => void;
  onReset: () => void;
  busy: boolean;
};

export default function CarFilters({ onApply, onReset, busy }: CarFiltersProps) {
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');
  const [error, setError] = useState('');

  const { data, isPending, isError, isFetching, refetch } = useQuery({
    queryKey: ['carFilters'],
    queryFn: () => getCarFilters(),
  });

  const prices: number[] = [];
  if (data) {
    for (let price = data.price.min; price <= data.price.max; price += 10) {
      prices.push(price);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (minMileage !== '' && maxMileage !== '' && Number(minMileage) > Number(maxMileage)) {
      setError('To must be greater than or equal to From.');
      return;
    }

    setError('');
    const filters: CarsFilters = {};

    if (brand !== '') filters.brand = brand;
    if (price !== '') filters.price = Number(price);
    if (minMileage !== '') filters.minMileage = Number(minMileage);
    if (maxMileage !== '') filters.maxMileage = Number(maxMileage);

    onApply(filters);
  }

  function handleReset() {
    setBrand('');
    setPrice('');
    setMinMileage('');
    setMaxMileage('');
    setError('');
    onReset();
  }

  return (
    <div className={css.wrapper}>
      <form className={css.form} onSubmit={handleSubmit} aria-label="Car filters">
        <div className={css.field}>
          <label htmlFor="brand">Car brand</label>
          <select
            id="brand"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            disabled={!data}
          >
            <option value="">Choose a brand</option>
            {data?.brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className={css.field}>
          <label htmlFor="price">Price/1 hour</label>
          <select
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            disabled={!data}
          >
            <option value="">Choose a price</option>
            {prices.map((price) => (
              <option key={price} value={price}>
                To ${price}
              </option>
            ))}
          </select>
        </div>

        <fieldset className={css.mileage}>
          <legend>Car mileage / km</legend>
          <div className={css.range}>
            <div>
              <label className="sr-only" htmlFor="minMileage">
                Mileage from
              </label>
              <input
                id="minMileage"
                type="number"
                min="0"
                max={Number.MAX_SAFE_INTEGER}
                step="1"
                placeholder="From"
                value={minMileage}
                onChange={(event) => setMinMileage(event.target.value)}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="maxMileage">
                Mileage to
              </label>
              <input
                id="maxMileage"
                type="number"
                min="0"
                max={Number.MAX_SAFE_INTEGER}
                step="1"
                placeholder="To"
                value={maxMileage}
                onChange={(event) => setMaxMileage(event.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'mileage-error' : undefined}
              />
            </div>
          </div>
          {error && (
            <p id="mileage-error" className={css.error} role="alert">
              {error}
            </p>
          )}
        </fieldset>

        <div className={css.actions}>
          <button className="button" type="submit" disabled={busy}>
            Search
          </button>
          <button className={css.clear} type="button" onClick={handleReset}>
            Clear filters
          </button>
        </div>
      </form>

      {isPending && (
        <p className={css.notice} role="status">
          Loading available filters...
        </p>
      )}
      {isError && (
        <p className={css.notice} role="alert">
          Could not load brands and prices.
          <button
            type="button"
            className={css.retry}
            disabled={isFetching}
            onClick={() => refetch()}
          >
            Try again
          </button>
        </p>
      )}
    </div>
  );
}
