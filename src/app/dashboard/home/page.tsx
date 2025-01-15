<<<<<<< HEAD:src/app/home/page.tsx
import { Car } from "@/types/car.type";
import React from "react";
import CarCard from "./card/card";


const sampleCar: Car = {
  id: "1",
  brand: "Alfa Romeo",
  model: "Giulia",
  class: "Эконом",
  transmission: "Автомат",
  description: "Пример автомобиля",
  year: "2014",
  pricePerDay: 77,
  businessId: "8682 AX-3",
  previewImage: "https://via.placeholder.com/300x200",
  status: "Бронь",
  createdAt: new Date(),
  updatedAt: new Date(),
  images: undefined,
  totalMileage: 206345,
  averageMileage: 345,
  averageConsumption: 20,
  totalExpenses: 456,
  rating: "3,4/5",
  downtimeCoefficient: 0.43,
};

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Автомобили</h1>
      <CarCard car={sampleCar} />
    </div>
=======
'use client'

export default function Home() {
  return (
    <>
      Home
    </>
>>>>>>> 159910da18bdc811271c77ac0330f9fc75d76903:src/app/dashboard/home/page.tsx
  );
}
