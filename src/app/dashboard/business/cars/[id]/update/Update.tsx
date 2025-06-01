"use client";

import { useEffect, useState } from "react"
import { CarService } from "@/services/car.service"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useParams } from "next/navigation"
import { useCar } from "../../hooks/useCar"

export default function Update() {
  const router = useRouter()
  const { id } = useParams()
  const carId = Array.isArray(id) ? id.join('') : id || ''
  const { data, isLoading } = useCar(carId)
  
  const [carPrice, setCarPrice] = useState<number>(0)
  const [carDescription, setCarDescription] = useState("")
  const [carYear, setCarYear] = useState<number>(2010)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (!isLoading && data) {
      setCarPrice(data.price_per_day || 0)
      setCarYear(Number(data.year) || 2010)
      setCarDescription(data.description || '')
    }
  }, [isLoading, data])

  const validateForm = () => {
    const newErrors: { [key: string]: boolean } = {}
    if (carPrice < 1) newErrors.price = true
    if (carYear < 1900 || carYear > 2025) newErrors.year = true
    if (!carDescription) newErrors.description = true
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleUpdateCar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm() || isSubmitting) return

    setIsSubmitting(true)
    const carData = {
      description: carDescription,
      price_per_day: carPrice,
      year: carYear.toString()
    }

    try {
      await CarService.updateCar(carId, carData)
      router.replace(`${DASHBOARD_PAGES.BUSINESS_CARS}/${carId}`)
    } catch (error) {
      console.error("Ошибка при обновлении машины:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium">Загрузка...</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Редактирование автомобиля
        </h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {data.brand} {data.model}
          </h2>
          <div className="text-gray-600 text-sm mt-1">
            {data.class} · {data.transmission}
          </div>
        </div>

        <form onSubmit={handleUpdateCar} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Цена в сутки (BYN)
              </label>
              <input
                type="number"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
                  errors.price
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                value={carPrice}
                min="1"
                onChange={(e) => {
                  setCarPrice(Number(e.target.value))
                  setErrors({ ...errors, price: false })
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Год выпуска
              </label>
              <input
                type="number"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
                  errors.year
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                value={carYear}
                min="1900"
                max="2025"
                onChange={(e) => {
                  setCarYear(Number(e.target.value))
                  setErrors({ ...errors, year: false })
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание
            </label>
            <textarea
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
                errors.description
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              rows={4}
              placeholder="Введите описание автомобиля"
              value={carDescription}
              onChange={(e) => {
                setCarDescription(e.target.value)
                setErrors({ ...errors, description: false })
              }}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Link href={`${DASHBOARD_PAGES.BUSINESS_CARS}/${carId}`} className="flex-1">
              <button
                type="button"
                className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Отмена
              </button>
            </Link>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Обновление..." : "Обновить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
