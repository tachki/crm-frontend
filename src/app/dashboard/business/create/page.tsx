import dynamic from 'next/dynamic';

const Cars = dynamic(() => import('./Cars'), {
  loading: () => (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg font-medium">Загрузка...</p>
    </div>
  ),
});

export default function CarsPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <Cars />
    </div>
  );
}
