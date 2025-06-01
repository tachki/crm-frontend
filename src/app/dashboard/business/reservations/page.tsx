import dynamic from 'next/dynamic';

const Reservations = dynamic(() => import('./Reservations'), {
  loading: () => (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg font-medium">Загрузка...</p>
    </div>
  ),
});

export default function ReservationsPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <Reservations />
    </div>
  );
}
