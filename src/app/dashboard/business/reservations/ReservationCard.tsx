"use client";

import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { useUpdateReservationStatus } from "@/services/reservation.service";
import Link from "next/link";

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
    <div className="bg-white shadow-md rounded-xl p-4 mt-2 border border-gray-200">
    <h3 className="text-2xl font-bold text-black">{reservation.login}</h3>
    <Link
      href={`${DASHBOARD_PAGES.CAR_DETAILS.replace('[id]', reservation.car_id)}`}
      className="text-blue-600 text-xl font-bold flex items-center gap-2 mt-4 hover:underline hover:text-blue-700 transition"
    >
      {reservation.brand} {reservation.model}
      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
      </svg>
    </Link>
    <div className="flex justify-between gap-30 items-center mt-2">
      <p className="text-gray-500 text-lg font-medium">{reservation.start_date} - {reservation.end_date}</p>
      <span className="text-2xl font-bold text-black ml-4">{reservation.price}BYN</span>
    </div>

    <div className="mt-3 grid grid-cols-2 gap-2">
      <button
        className="w-full bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition"
        onClick={handleApprove}
      >
        Принять
      </button>
      <button
        className="w-full bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition"
        onClick={handleDecline}
      >
        Отклонить
      </button>
    </div>
  </div>
  );
}


