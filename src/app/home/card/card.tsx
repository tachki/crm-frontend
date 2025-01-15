import { CarCardProps, statusStyles } from "@/types/car.type";
import React from "react";

const CarCard: React.FC<CarCardProps> = ({ car }) => {
    return (
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {/* Левая часть - картинка */}
        <div className="w-1/3">
          <img
            src={car.previewImage}
            alt={`${car.brand} ${car.model}`}
            className="object-cover w-full h-full"
          />
        </div>
  
        {/* Правая часть - данные */}
        <div className="w-2/3 p-4 flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-2">
              {car.brand} {car.model} ({car.year})
            </h2>
            <p
              className={`text-sm px-2 py-1 rounded ${
                car.status === "Свободно"
                  ? "bg-green-100 text-green-700"
                  : car.status === "Бронь"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {car.status}
            </p>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            {car.class} | {car.transmission} | {car.businessId}
          </p>
  
          <div className="text-sm text-gray-500 grid grid-cols-2 gap-2">
            <p>
              <span className="font-semibold text-gray-400">Общий пробег: </span>
              <span className="text-black">{car.totalMileage} км</span>
            </p>
            <p>
              <span className="font-semibold text-gray-400">Средний пробег: </span>
              <span className="text-black">{car.averageMileage} км</span>
            </p>
            <p>
              <span className="font-semibold text-gray-400">Средний расход: </span>
              <span className="text-black">{car.averageConsumption} л</span>
            </p>
            <p>
              <span className="font-semibold text-gray-400">Сумма затрат: </span>
              <span className="text-black">{car.totalExpenses} BYN</span>
            </p>
            <p>
              <span className="font-semibold text-gray-400">Рейтинг: </span>
              <span className="text-black">{car.rating}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-400">Коэфф. простоя: </span>
              <span className="text-black">{car.downtimeCoefficient}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-400">Цена в сутки: </span>
              <span className="text-black">{car.pricePerDay} BYN</span>
            </p>
          </div>
  
          {/* Кнопки */}
          <div className="mt-4 flex gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
              Подробнее
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">
              Календарь
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600">
              Удалить
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default CarCard;