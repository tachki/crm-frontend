"use client";

import React, { useEffect, useState } from 'react';
import { useGetReservationsByUserId } from "@/services/reservation.service";
import { CarService } from "@/services/car.service";

interface Reservation {
    car_id: string; // или number, если car_id - число
    start_date: string;
    end_date: string;
    price: number;
    status: string;
    id: string;
    user_id: string;
}

interface Car {
    brand: string;
    class: string;
    preview_image: string;
}

export default function Reservation() {
    const { data: reservations } = useGetReservationsByUserId({ id: "d0d47ef7-58b7-47f4-9975-e94e338110c4" });
    const [cars, setCars] = useState<Record<string, Car>>({});

    useEffect(() => {
        if (reservations) {
            const fetchCars = async () => {
                const carData: Record<string, Car> = {};
                for (const reservation of reservations) {
                    if (!cars[reservation.car_id]) {
                        const carResponse = await CarService.getCar(reservation.car_id);
                        carData[reservation.car_id] = carResponse.car;
                    }
                }
                setCars(prevCars => ({ ...prevCars, ...carData }));
            };
            fetchCars();
        }
    }, [reservations]);

    if (!reservations) return <p>Загрузка бронирований...</p>;

    return (
        <div>
            <h2 className="text-3xl text-center mb-8">Мои бронирования</h2>
            <div className="flex flex-wrap flex-row gap-10 items-center justify-center">
                {reservations.map(reservation => {
                    const car = cars[reservation.car_id];
                    return (
                        car && (
                            <div key={reservation.id} className="p-4 rounded" style={{border: "1px solid #3b44ff"}}>
                                <p className="font-medium">{car.brand}, {car.class}</p>
                                <p className="font-medium">Срок: {reservation.start_date} - {reservation.end_date}</p>
                                <p className="font-medium">Цена: ${reservation.price}</p>
                                <p className="font-medium">Статус: {reservation.status}</p>
                            </div>
                        )
                    );
                })}
            </div>
        </div>
    );
}
