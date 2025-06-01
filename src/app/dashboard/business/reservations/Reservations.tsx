"use client"

import { useGetAllPendingReservationsByBusiness } from "@/services/reservation.service";
import ReservationCard from "./ReservationCard";
import { Reservation } from "@/types/reservation.type";

export default function Reservations() {
  const { data: reservations, isLoading, error } = useGetAllPendingReservationsByBusiness();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600 font-medium">Загрузка бронирований...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          <p className="font-medium">Ошибка загрузки бронирований</p>
          <p className="text-sm mt-2">Пожалуйста, попробуйте обновить страницу</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Входящие бронирования {reservations?.length ? `(${reservations.length})` : ""}
        </h2>
      </div>

      {reservations && reservations.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reservations.map((reservation: Reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-50 rounded-xl border border-gray-200">
          <div className="text-center">
            <p className="text-xl font-medium text-gray-900 mb-2">Нет бронирований</p>
            <p className="text-gray-500">На данный момент у вас нет входящих бронирований</p>
          </div>
        </div>
      )}
    </div>
  );
}
