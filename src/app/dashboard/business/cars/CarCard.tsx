"use client"

import Calendar from "@/components/calendar/Calendar"
import { CarCardProps, CarStatus, statusStyles } from "@/types/car.type"
import React, { useState, useRef, useEffect } from "react"
import calendarIcon from '@/images/car_card/buttons/calendar_logo.png'
import deleteIcon from '@/images/car_card/buttons/bucket_logo.png'
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import Link from 'next/link'
import { CarService } from "@/services/car.service"
import ConfirmationModal from "@/components/modal/modal"
import './CarCard.css'
import { carStatusData } from '@/utils/constants'
import Image from 'next/image'

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const [calendarPosition, setCalendarPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const calendarButtonRef = useRef<HTMLButtonElement | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDropdownMenuVisible, setIsDropdownMenuVisible] = useState(false)
  const [carStatus, setCarStatus] = useState<CarStatus>(car.status as CarStatus)

  const toggleCalendarVisibility = () => {
    setIsCalendarVisible(!isCalendarVisible)
  }

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  useEffect(() => {
    if (isCalendarVisible && calendarButtonRef.current) {
      const buttonRect = calendarButtonRef.current.getBoundingClientRect()
      setCalendarPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX,
      })
    }
  }, [isCalendarVisible])


  const handleDeleteCar = async () => {
    try {
      await CarService.deleteCar(car.id)
      window.location.reload()
    } catch (error) {
      console.log(error)
    } finally {
      closeDeleteModal()
    }
  }

  const updateCarStatus = (carId: string, status: CarStatus) => {
    try {
      CarService.updateCar(carId, status)
      setCarStatus(status)
      setIsDropdownMenuVisible(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" bg-white car-card flex gap-4 shadow-xl rounded-lg overflow-hidden border border-gray-200 h-[420px] pr-5">
      <div className="flex justify-center items-center mt-5 mb-5 ml-5">
        <img
          src={car.previewImage}
          alt={`${car.brand} ${car.model}`}
          className="object-cover rounded-2xl h-full"

        />
      </div>
      <div className="w-1/2 p-2 flex mt-4 flex-col justify-between h-full relative">
      <div className="absolute top-[5px] right-[5px] z-10">
      <button
      className="text-black font-medium  py-1 rounded inline-flex items-center bg-white  border-none outline-none focus:outline-none"
      onClick={() => setIsDropdownMenuVisible(!isDropdownMenuVisible)}
    >
      {carStatus}
      <span className={`ml-2 w-3 h-3 rounded-full ${statusStyles[carStatus]}`}></span>
    </button>


      {isDropdownMenuVisible && (
        <div className="absolute w-60 right-0 mt-1 shadow-xl rounded-lg bg-white z-20">
          {carStatusData.map((status) => (
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

        <h2 className="text-xl font-extrabold text-black mb-2">
        {car.brand} {car.model} ({car.year})
      </h2>

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

        <div className="buttons flex gap-2 justify-between pt-2 mb-7">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 font-medium text-sm w-1/3"
          >
            <Link href={`${DASHBOARD_PAGES.BUSINESS_CARS}/${car.id}`}>
              Подробнее
            </Link>
          </button>
          <button
            ref={calendarButtonRef}
            onClick={toggleCalendarVisibility}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 font-medium text-sm w-1/3 flex items-center justify-center gap-2"
          >
            <Image
              src={calendarIcon.src}
              alt="Календарь"
              className="w-5 h-5"
              width={120}
              height={120}
            />
            Календарь
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 font-medium text-sm w-1/3 flex items-center justify-center gap-2"
            onClick={openDeleteModal}
          >
            <Image
              src={deleteIcon.src}
              alt="Удалить"
              className="w-5 h-5"
              width={120}
              height={120}
            />
            Удалить
          </button>
        </div>
      </div>

      {isCalendarVisible && (
        <div
          className="absolute z-50 bg-white shadow-lg p-2 rounded-lg"
          style={{
            top: `${calendarPosition.top - 450}px`,
            left: `${calendarPosition.left - 130}px`,
            width: "400px",
          }}
        >
          <Calendar carId={car.id} />
        </div>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteCar}
        title="Удаление автомобиля"
        message="Вы уверены, что хотите удалить этот автомобиль? Это действие нельзя отменить."
      />
    </div>
  )
}

export default CarCard
