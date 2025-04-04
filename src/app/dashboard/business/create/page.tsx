import dynamic from 'next/dynamic';

const Cars = dynamic(() => import('./Cars'), {
  loading: () => <p>Загрузка...</p>,
});

export default function CarsPage() {
  return (
    <div className={`flex justify-between items-center m-6 mb-9`}>
      <Cars />
    </div>
  );
}
