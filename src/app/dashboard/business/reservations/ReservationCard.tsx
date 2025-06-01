"use client";

import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { useUpdateReservationStatus } from "@/services/reservation.service";
import Link from "next/link";
import { useState } from "react";

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
  const [isUpdating, setIsUpdating] = useState(false);

  const handleApprove = async () => {
    try {
      setIsUpdating(true);
      await updateReservationStatus({ reservationId: reservation.id, status: "подтверждено" });
      window.location.reload();
    } catch (error) {
      console.error('Error updating reservation:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecline = async () => {
    try {
      setIsUpdating(true);
      await updateReservationStatus({ reservationId: reservation.id, status: "отказано" });
      window.location.reload();
    } catch (error) {
      console.error('Error updating reservation:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-medium text-gray-900">{reservation.login}</h3>
          <Link
            href={`${DASHBOARD_PAGES.CAR_DETAILS.replace('[id]', reservation.car_id)}`}
            className="text-blue-600 font-medium flex items-center gap-1 mt-2 hover:text-blue-700 transition-colors group"
          >
            {reservation.brand} {reservation.model}
            <svg 
              className="w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-gray-900">{reservation.price} BYN</span>
          <p className="text-sm text-gray-500 mt-1">за период аренды</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Период аренды</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {reservation.start_date} - {reservation.end_date}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            className={`
              flex items-center justify-center px-4 py-2.5 rounded-lg font-medium transition-all
              ${isUpdating 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-green-50 text-green-700 hover:bg-green-100'
              }
            `}
            onClick={handleApprove}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-700 border-t-transparent"></div>
                <span className="ml-2">Обработка...</span>
              </div>
            ) : (
              'Принять'
            )}
          </button>
          <button
            className={`
              flex items-center justify-center px-4 py-2.5 rounded-lg font-medium transition-all
              ${isUpdating 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-red-50 text-red-700 hover:bg-red-100'
              }
            `}
            onClick={handleDecline}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-700 border-t-transparent"></div>
                <span className="ml-2">Обработка...</span>
              </div>
            ) : (
              'Отклонить'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


