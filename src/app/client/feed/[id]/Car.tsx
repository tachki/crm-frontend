"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Car, mapCarDtoToCar } from "@/types/car.type";
import { CarService } from "@/services/car.service";
export default function CarDetails() {

  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCar() {
      try {
        const resp = await CarService.getCar(id)
        setCar(mapCarDtoToCar(resp.car));
      } catch (error) {
        console.error("Error fetching car details:", error);
        setError("Failed to load car details. Please try again later.");
      }
    }
    fetchCar();
  }, [id]);

  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!car) return <div className="text-center p-10">Loading...</div>;

  return (
      <h1>страницо авто</h1>
  );
}
