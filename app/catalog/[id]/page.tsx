import type { Metadata } from 'next';
import CarDetails from '@/components/CarDetails/CarDetails';

export const metadata: Metadata = {
  title: 'Car details & booking | Rental Car',
  description:
    'Explore car specifications, rental conditions and features. Send your booking request online.',
};

export default async function CarDetailsPage({ params }: PageProps<'/catalog/[id]'>) {
  const { id } = await params;
  return (
    <main id="main-content" className="container">
      <CarDetails id={id} />
    </main>
  );
}
