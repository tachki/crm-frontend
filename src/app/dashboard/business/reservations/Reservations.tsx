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
      <h2 className="text-xl font-bold">Входящие</h2>
      {reservations && reservations.length > 0 ? (
          reservations.map((reservation: Reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))
      ) : (
        <p>Нет принятых бронирований</p>
      )}
    </div>
  );
}
