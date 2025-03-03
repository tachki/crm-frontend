"use client"

import { useGetAllPendingReservationsByBusiness } from "@/services/reservation.service";
import ReservationCard from "./ReservationCard";
import { Reservation } from "@/types/reservation.type";

export default function Reservations() {
  const { data: reservations, isLoading, error   } = useGetAllPendingReservationsByBusiness();

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки бронирований</p>;  

  return (
    <div className="flex flex-col items-center justify-center w-full">
    <h2 className="text-2xl font-bold mb-4">
    Входящие {reservations?.length ? `(${reservations.length})` : ""}
  </h2>
    {reservations && reservations.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
        {reservations.map((reservation: Reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </div>
    ) : (
      <p>Нет принятых бронирований</p>
    )}
  </div>
  
  );
}
