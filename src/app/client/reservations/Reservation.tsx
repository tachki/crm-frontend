"use client";

import React from 'react';
import styles from "./Reservation.module.css";
import {useGetReservationsByUserId} from "@/services/reservation.service";
import {CarService} from "@/services/car.service";

export default function Reservation () {
    const {data: reservations} = useGetReservationsByUserId("d0d47ef7-58b7-47f4-9975-e94e338110c4");
    console.log("reservations", reservations);
    const getCar = async () => {
        const car = await CarService.getCar("438be708-27e8-4f00-bb00-4cd50699e1d3")
        console.log("car", car.car);
    }
    getCar()
    return (
        <div>HI</div>
    )
}
