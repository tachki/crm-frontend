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
    <div className="shadow-md rounded-2xl p-4 bg-white h-[420px] flex flex-col relative">
      <div className="absolute top-4 right-4 z-10">
        <button
          className="text-black font-medium py-1 rounded inline-flex items-center bg-white border-none outline-none focus:outline-none"
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

      <div>
        <h2 className="text-lg font-semibold leading-snug line-clamp-2">
          {car.brand} {car.model} ({car.year})
        </h2>
        <div className="flex items-center text-gray-400 text-sm mt-1 space-x-4 font-light">
          <div className="flex items-center">
            {car.class}
          </div>
          <div className="flex items-center">
            {car.transmission}
          </div>
        </div>
      </div>

      <div className="flex-grow mt-3 overflow-hidden">
        <img
          src={car.previewImage}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
        <div>
          <span className="text-gray-500">Пробег: </span>
          <span className="font-medium">{car.totalMileage} км</span>
        </div>
        <div>
          <span className="text-gray-500">Расход: </span>
          <span className="font-medium">{car.averageConsumption} л</span>
        </div>
        <div>
          <span className="text-gray-500">Рейтинг: </span>
          <span className="font-medium">{car.rating}</span>
        </div>
        <div>
          <span className="text-gray-500">Цена: </span>
          <span className="font-medium">{car.pricePerDay} BYN</span>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2 mt-4">
        <Link href={`${DASHBOARD_PAGES.BUSINESS_CARS}/${car.id}`} className="flex-1">
          <button className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg">
            Подробнее
          </button>
        </Link>
        <button
          ref={calendarButtonRef}
          onClick={toggleCalendarVisibility}
          className="flex-1 bg-green-500 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2"
        >
          <Image
            src={calendarIcon.src}
            alt="Календарь"
            className="w-4 h-4"
            width={16}
            height={16}
          />
          Календарь
        </button>
        <button
          className="flex-1 bg-red-500 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          onClick={openDeleteModal}
        >
          <Image
            src={deleteIcon.src}
            alt="Удалить"
            className="w-4 h-4"
            width={16}
            height={16}
          />
          Удалить
        </button>
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
