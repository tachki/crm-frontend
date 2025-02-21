"use client";

import React, { useEffect, useState } from 'react';
import { useGetReservationsByUserId } from "@/services/reservation.service";
import { CarService } from "@/services/car.service";
import { GetCarDto } from "@/types/car.type";

interface Car {
    brand: string;
    class: string;
    preview_image?: string;
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
                        const carResponse = (await CarService.getCar(reservation.car_id)) as GetCarDto;
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
                            <div key={reservation.id} className="gap-14 items-center justify-center flex flex-row p-4 rounded flex-wrap"
                                 style={{border: "1px solid #3b44ff"}}>
                                <div className="flex flex-col">
                                    <p className="font-medium">{car.brand}</p>
                                    <p className="font-medium">{car.class}</p>
                                </div>
                                <div className="flex justify-end gap-5">
                                    <div className="flex flex-col">
                                        <p className="font-bold text-right">От</p>
                                        <p className="font-medium">{reservation.start_date}</p>
                                    </div>
                                    <div className="font-bold">
                                        —
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold">До</p>
                                        <p className="font-medium">{reservation.end_date}</p>
                                    </div>
                                </div>
                                <p className="font-medium">Статус: {reservation.status}</p>
                                <p className="font-bold">Цена: {reservation.price} BYN</p>
                            </div>
                        )
                    );
                })}
            </div>
        </div>
    );
}
