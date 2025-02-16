"use client";

import { useUpdateReservationStatus } from "@/services/reservation.service";

interface ReservationProps {
  reservation: {
    id: string;
    user_id: string;
    car_id: string;
    start_date: string;
    end_date: string;
    price: number;
    status: string;
    login: string;
    brand: string;
    model: string;
  };
}

export default function ReservationCard({ reservation }: ReservationProps) {
  const { mutate: updateReservationStatus } = useUpdateReservationStatus();

  const handleApprove = () => {
    updateReservationStatus({ reservationId: reservation.id, status: "подтверждено" });
    window.location.reload();
  };

  const handleDecline = () => {
    updateReservationStatus({ reservationId: reservation.id, status: "отказано" });
    window.location.reload();
  };     

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white">
      <h2>{reservation.login}</h2>
      <h2>{reservation.brand} {reservation.model}</h2>
      <h3 className="font-bold">{reservation.start_date} - {reservation.end_date}</h3>
      <p className="text-gray-600">Цена: <strong>{reservation.price} BYN</strong></p>

      <div className="mt-2 flex gap-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleApprove}
        >
           Принять
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleDecline}
        >
          Отклонить
        </button>  
      </div>
    </div>
  );
}
