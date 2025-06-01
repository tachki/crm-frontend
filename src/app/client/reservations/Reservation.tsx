"use client";

import React, { useEffect, useState } from 'react';
import { useGetReservationsByUserId } from "@/services/reservation.service";
import { CarService } from "@/services/car.service";
import Image from 'next/image';
import { STATIC_URL } from '@/config/pages-url.config';

interface Car {
    brand: string;
    class: string;
    preview_image?: string;
    model: string;
}

const statusColors = {
    "ожидает": { bg: "bg-yellow-50", text: "text-yellow-800" },
    "подтверждено": { bg: "bg-green-50", text: "text-green-700" },
    "отказано": { bg: "bg-red-50", text: "text-red-700" }
};

export default function Reservation() {
    const { data: reservations, isLoading, error } = useGetReservationsByUserId();
    const [cars, setCars] = useState<Record<string, Car>>({});
    const [isLoadingCars, setIsLoadingCars] = useState(false);

    useEffect(() => {
        if (reservations) {
            const fetchCars = async () => {
                setIsLoadingCars(true);
                try {
                    const carData: Record<string, Car> = {};
                    for (const reservation of reservations) {
                        if (!cars[reservation.car_id]) {
                            const carResponse = await CarService.getCar(reservation.car_id);
                            carData[reservation.car_id] = carResponse;
                        }
                    }
                    setCars(prevCars => ({ ...prevCars, ...carData }));
                } catch (error) {
                    console.error('Error fetching cars:', error);
                } finally {
                    setIsLoadingCars(false);
                }
            };
            fetchCars();
        }
    }, [reservations]);

    if (isLoading || isLoadingCars) {
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

    if (!reservations || reservations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-50 rounded-xl border border-gray-200">
                <div className="text-center">
                    <p className="text-xl font-medium text-gray-900 mb-2">Нет бронирований</p>
                    <p className="text-gray-500">У вас пока нет активных бронирований</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                {reservations.map(reservation => {
                    const car = cars[reservation.car_id];
                    if (!car) return null;

                    const statusStyle = statusColors[reservation.status as keyof typeof statusColors] || 
                        { bg: "bg-gray-50", text: "text-gray-700" };

                    return (
                        <div 
                            key={reservation.id} 
                            className="bg-white rounded-xl border border-gray-100 overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-2xl font-semibold text-gray-900">
                                            {car.brand} {car.model}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                                            {reservation.status}
                                        </span>
                                    </div>
                                    <span className="text-2xl font-semibold text-gray-900">{reservation.price} BYN</span>
                                </div>

                                <p className="text-gray-500 text-lg">{car.class}</p>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-500">Начало аренды</p>
                                        <p className="text-xl font-medium text-gray-900 mt-1">{reservation.start_date}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Конец аренды</p>
                                        <p className="text-xl font-medium text-gray-900 mt-1">{reservation.end_date}</p>
                                    </div>
                                </div>

                                {car.preview_image && (
                                    <div className="mt-6 relative h-[200px] rounded-xl overflow-hidden">
                                        <Image
                                            src={STATIC_URL + car.preview_image}
                                            alt={`${car.brand} ${car.model}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
