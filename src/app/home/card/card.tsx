"use client";
import Calendar from "@/components/calendar/Calendar";
import { CarCardProps, statusStyles } from "@/types/car.type";
import React, { useState } from "react";

const CarCard: React.FC<CarCardProps> = ({ car }) => {

    const [isCalendarVisible, setIsCalendarVisible] = useState(false); 

    const toggleCalendarVisibility = () => {
        setIsCalendarVisible(!isCalendarVisible); 
    };


    return (
        <div className="flex shadow-lg rounded-lg overflow-hidden border border-gray-200 mx-[120px] w-[calc(100%-240px)] h-[400px]"> 
          <div className="w-1/2 h-full p-4"> 
            <img
              src={car.previewImage}
              alt={`${car.brand} ${car.model}`}
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>
      
          <div className="w-1/2 p-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-extrabold text-black">
                {car.brand} {car.model} ({car.year})
              </h2>
              <p className="text-black font-medium px-2 py-1 rounded inline-flex items-center">
                {car.status}
                <span
                  className={`ml-2 w-3 h-3 rounded-full ${statusStyles[car.status]}`}
                ></span>
              </p>
            </div>
      
            <p className="text-black text-lg font-medium mb-2">
              {car.class} | {car.transmission} | {car.businessId}
            </p>
      
            <div className="text-sm grid grid-cols-1 gap-1/2">
              <p>
                <span className="font-light text-gray-800">Общий пробег: </span>
                <span className="text-black font-medium">{car.totalMileage} км</span>
              </p>
              <p>
                <span className="font-light text-gray-800">Средний пробег: </span>
                <span className="text-black font-medium">{car.averageMileage} км</span>
              </p>
              <p>
                <span className="font-light text-gray-800">Средний расход: </span>
                <span className="text-black font-medium">{car.averageConsumption} л</span>
              </p>
              <p>
                <span className="font-light text-gray-800">Сумма затрат: </span>
                <span className="text-black font-medium">{car.totalExpenses} BYN</span>
              </p>
              <p>
                <span className="font-light text-gray-800">Рейтинг: </span>
                <span className="text-black font-medium">{car.rating}</span>
              </p>
              <p>
                <span className="font-light text-gray-800">Коэфф. простоя: </span>
                <span className="text-black font-medium">{car.downtimeCoefficient}</span>
              </p>
              <p>
                <span className="font-light text-gray-800">Цена в сутки: </span>
                <span className="text-black font-medium">{car.pricePerDay} BYN</span>
              </p>
            </div>
      
            <div className="mt-14 flex gap-2 justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 font-medium text-sm w-1/3">
                Подробнее
                </button>
                <button
                onClick={toggleCalendarVisibility}
                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 font-medium text-sm w-1/3"
                >
                Календарь
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 font-medium text-sm w-1/3">
                Удалить
                </button>
            </div>
      
            {isCalendarVisible && (
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 z-50 bg-white shadow-lg p-4 rounded-lg"
                style={{ width: "590px" }}
              >
                <Calendar />
              </div>
            )}
          </div>
        </div>
      );
      
      
  };
  
  export default CarCard;
  

  