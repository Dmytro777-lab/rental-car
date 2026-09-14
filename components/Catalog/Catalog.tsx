'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCars } from '@/lib/api/cars';
import type { CarsFilters } from '@/types/car';
import CarCard from '../CarCard/CarCard';
import CarFilters from '../CarFilters/CarFilters';
import css from './Catalog.module.css';

export default function Catalog() {
  const [filters, setFilters] = useState<CarsFilters>({});
  const [searchNumber, setSearchNumber] = useState(0);

  const {
    data,
    isPending,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['cars', filters, searchNumber],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getCars(pageParam, filters),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  function applyFilters(newFilters: CarsFilters) {
    setFilters(newFilters);

    setSearchNumber((number) => number + 1);
  }

  const cars = data ? data.pages.flatMap((page) => page.cars) : [];

  return (
    <div className={css.catalog}>
      <CarFilters onApply={applyFilters} onReset={() => applyFilters({})} busy={isFetching} />

      {isPending && <p role="status">Loading, please wait...</p>}

      {isError && (
        <p className={css.error} role="alert">
          Could not load cars. Please try again.
          <button type="button" onClick={() => refetch()} disabled={isFetching}>
            Try again
          </button>
        </p>
      )}

      {data && cars.length === 0 && (
        <div className={css.empty}>
          <h2>No cars found</h2>
          <p>Change your search or use Clear filters above.</p>
        </div>
      )}

      <ul className={css.grid}>
        {cars.map((car) => (
          <li key={car.id}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button
          className={`button button-outline ${css.loadMore}`}
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetching}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  );
}
