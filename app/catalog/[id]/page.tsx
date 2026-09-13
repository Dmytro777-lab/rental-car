import CarDetails from '@/components/CarDetails/CarDetails';

const CarDetailsPage = async ({ params }: PageProps<'/catalog/[id]'>) => {
  const { id } = await params;
  return (
    <main>
      <h1>Car details</h1>
      <CarDetails id={id} />
    </main>
  );
};

export default CarDetailsPage;
