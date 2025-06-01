'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import Calendar from '@/components/calendar/Calendar'
import Slider from '@/components/slider/Slider'
import { CarDto, CarStatus, mapCarDtoToCar, statusStyles } from '@/types/car.type'
import type { Car } from '@/types/car.type'
import { CarService } from '@/services/car.service'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ConfirmationModal from '@/components/modal/modal'

export default function Car() {
  const { id } = useParams()
  const carId = Array.isArray(id) ? id.join('') : id || ''
  const [carDto, setCarDto] = useState<CarDto | null>(null)
  const router = useRouter()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const openDeleteModal = () => setIsDeleteModalOpen(true)
  const closeDeleteModal = () => setIsDeleteModalOpen(false)

  const handleDeleteCar = async () => {
    try {
      await CarService.deleteCar(carId)
      router.replace(DASHBOARD_PAGES.BUSINESS_CARS)
    } catch (error) {
      console.log(error)
    } finally {
      closeDeleteModal()
    }
  }

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const car = await CarService.getCar(carId)
        setCarDto(car as CarDto)
      } catch (error) {
        console.error("Ошибка при получении авто:", error)
      }
    }
    if (carId) fetchCar()
  }, [carId])

  const car: Car | null = carDto ? mapCarDtoToCar(carDto) : null

  if (!car) {
    return <div className="text-center p-10">Loading...</div>
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 text-gray-900">
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 mb-10">
        <div className="p-5 bg-white rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">
              {car.brand} {car.model}
            </h1>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${statusStyles[car.status as CarStatus]} mr-2`}></div>
              <span className="text-gray-600">{car.status}</span>
            </div>
          </div>
          
          <div className="text-gray-600 text-base mb-4">
            <span className="capitalize">{car.transmission}</span> · {car.class}
          </div>

          <Slider images={car.images || []} />

          <div className="border border-gray-200 rounded-lg mb-8 mt-6">
            <h2 className="text-lg font-semibold mb-3 text-xl">Характеристики</h2>
            <dl className="space-y-1.5">
              {[
                { label: "Общий пробег", value: `${car.totalMileage} км` },
                { label: "Пробег на 1 аренду", value: `${car.averageMileage} км` },
                { label: "Рейтинг", value: car.rating ?? "N/A" },
                { label: "Расход топлива", value: `${car.averageConsumption} л/100км` },
                { label: "Коэффициент простоев", value: car.downtimeCoefficient },
                { label: "Цена в сутки", value: `${car.pricePerDay} BYN` },
                { label: "Сумма затрат", value: `${car.totalExpenses} BYN` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center text-base">
                  <dt className="text-gray-500 font-medium">{label}</dt>
                  <div className="flex-grow border-b border-dotted border-gray-300 mx-1.5 h-[1px]" />
                  <dd className="font-medium text-gray-900 whitespace-nowrap">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <section className="max-w-2xl">
            <h2 className="text-2xl font-semibold mb-3">Описание</h2>
            <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
              {car.description || "Описание отсутствует."}
            </p>
          </section>
        </div>

        <div className="flex flex-col w-full gap-4">
          <aside className="bg-white border border-gray-200 rounded-xl shadow-md p-4 self-start w-full">
            <Calendar carId={carId} />
            
            <div className="flex gap-3 mt-4">
              <Link href={DASHBOARD_PAGES.BUSINESS_CARS} className="flex-1">
                <button className="w-full border border-gray-400 text-gray-700 py-2 rounded-md">
                  Назад
                </button>
              </Link>
              <Link href={`${DASHBOARD_PAGES.CAR_DETAILS.replace('[id]', carId)}/update`} className="flex-1">
                <button className="w-full bg-yellow-500 text-white py-2 rounded-md">
                  Изменить
                </button>
              </Link>
            </div>
            <button
              onClick={openDeleteModal}
              className="w-full bg-red-500 text-white py-2 rounded-md mt-2"
            >
              Удалить
            </button>
          </aside>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 w-full">
            <div className="text-xs text-gray-500 font-medium mb-1">Цена за сутки</div>
            <div className="text-2xl font-semibold text-gray-900">
              {car.pricePerDay} BYN
            </div>
          </div>
        </div>
      </section>

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
