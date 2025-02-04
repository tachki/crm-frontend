"use client"

import Calendar from "@/components/calendar/Calendar"
import { CarCardProps, CarStatus, statusStyles } from "@/types/car.type"
import React, { useState } from "react"
import calendarIcon from '@/images/car_card/buttons/calendar_logo.png'
import deleteIcon from '@/images/car_card/buttons/bucket_logo.png'
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import Link from 'next/link'
import { CarService } from "@/services/car.service"

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const [isDropdownMenuVisible, setIsDropdownMenuVisible] = useState(false)
  const [carStatus, setCarStatus] = useState<CarStatus>(car.status as CarStatus)

  const toggleCalendarVisibility = () => {
    setIsCalendarVisible(!isCalendarVisible)
  }

  const deleteCar = (carId: string) => {
    try {
      CarService.deleteCar(carId)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const updateCarStatus = (carId: string, carData: CarStatus) => {
    try {
      CarService.updateCar(carId, { carData })
      setCarStatus(carData)
      setIsDropdownMenuVisible(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex gap-4 shadow-xl rounded-lg overflow-hidden border border-gray-200 h-[420px] mt-5">
      <div className="w-1/2 pt-5 pb-5 ml-5 flex justify-center items-center">
        <img
          src={car.previewImage}
          alt={`${car.brand} ${car.model}`}
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>

      <div className="w-1/2 p-2 flex mt-4 flex-col justify-between h-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-extrabold text-black">
            {car.brand} {car.model} ({car.year})
          </h2>
          <div
            className='relative'
          >
            <button
              className='text-black font-medium px-2 py-1 rounded inline-flex items-center'
              onClick={() => setIsDropdownMenuVisible(!isDropdownMenuVisible)}
            >
              {carStatus}
              <span className={`ml-2 w-3 h-3 rounded-full ${statusStyles[carStatus]}`}></span>
            </button>
            {isDropdownMenuVisible && (
              <div className='absolute w-60 right-0 shadow-xl rounded-lg'>
                {["Бронь", "Арендовано", "Свободно", "Временно недоступно", "Недоступно"].map((status) => (
                  <button
                    key={status}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-black font-medium"
                    onClick={() => updateCarStatus(car.id, status as CarStatus)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-black text-lg font-medium mb-2">
          {car.class} | {car.transmission}
        </p>

        <div className="text-base grid grid-cols-1 mb-4">
          <p>
            <span className="font-light text-gray-800">Общий пробег: </span>
            <span className="text-black font-medium">{car.totalMileage} км</span>
          </p>
          <p>
            <span className="font-light text-gray-800">Средний пробег: </span>
            <span className="text-black font-medium">{car.averageMileage} км</span>
          </p>
          <p> <span className="font-light text-gray-800">Средний расход: </span>
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


        <div className="flex gap-2 justify-between pt-2 mb-7">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 font-medium text-sm w-1/3"
          >
            <Link href={`${DASHBOARD_PAGES.BUSINESS_CARS}/${car.id}`}>
              Подробнее
            </Link>
          </button>
          <button
            onClick={toggleCalendarVisibility}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 font-medium text-sm w-1/3 flex items-center justify-center gap-2"
          >
            <img src={calendarIcon.src} alt="Календарь" className="w-5 h-5" />
            Календарь
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 font-medium text-sm w-1/3 flex items-center justify-center gap-2"
            onClick={() => deleteCar(car.id)}
          >
            <img src={deleteIcon.src} alt="Удалить" className="w-5 h-5" />
            Удалить
          </button>
        </div>
      </div>

      {isCalendarVisible && (
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 z-50 bg-white shadow-lg p-4 rounded-lg"
          style={{ width: "590px" }}
        >
          <Calendar carId={car.id} />
        </div>
      )}
    </div>
  )
}

export default CarCard
