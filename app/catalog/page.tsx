import type { Metadata } from 'next';
import Catalog from '@/components/Catalog/Catalog';

export const metadata: Metadata = {
  title: 'Car catalog | Rental Car',
  description:
    'Find your rental car. Filter by brand, hourly price and mileage, and explore available vehicles.',
};

export default function CatalogPage() {
  return (
    <main id="main-content" className="container">
      <h1 className="sr-only">Car catalog</h1>
      <Catalog />
    </main>
  );
}
