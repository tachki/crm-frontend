import dynamic from 'next/dynamic';

const Reservations = dynamic(() => import('./Reservations'), {
  loading: () => <p>Загрузка...</p>,
});

export default function ReservationsPage() {
  return (
    <div className={`flex justify-between items-center m-6 mb-9`}>
      <Reservations />
    </div>
  );
}
