"use client"

import { useRef, useState } from "react"
import { CarService } from "@/services/car.service"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import Link from "next/link"
import { carBrandData, carClassData, carTransmissionsData } from "@/utils/constants"
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Cars() {
  const router = useRouter()
  const [carBrand, setCarBrand] = useState("")
  const [carModel, setCarModel] = useState("")
  const [carNumber, setCarNumber] = useState("")
  const [carTransmission, setCarTransmission] = useState("")
  const [carClass, setCarClass] = useState("")
  const [carMileage, setCarMileage] = useState(0)
  const [carPrice, setCarPrice] = useState(1)
  const [carYear, setCarYear] = useState(2010)
  const [carDescription, setCarDescription] = useState("")
  const [photos, setPhotos] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: boolean } = {}
    if (!carBrand) newErrors.brand = true
    if (!carModel) newErrors.model = true
    if (!carNumber) newErrors.number = true
    if (!carTransmission) newErrors.transmission = true
    if (!carClass) newErrors.class = true
    if (carPrice < 1) newErrors.price = true
    if (carYear < 1900 || carYear > 2025) newErrors.year = true
    if (!carDescription) newErrors.description = true
    if (photos.length === 0) newErrors.photos = true
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const createCar = async () => {
    if (!validateForm() || isSubmitting) return

    setIsSubmitting(true)
    const formData = new FormData()

    formData.append("brand", carBrand)
    formData.append("class", carClass)
    formData.append("description", carDescription)
    formData.append("model", carModel)
    formData.append("price_per_day", carPrice.toString())
    formData.append("transmission", carTransmission)
    formData.append("year", carYear.toString())
    formData.append("mileage", carMileage.toString())
    photos.forEach((photo) => {
      formData.append(`image`, photo)
    })

    try {
      await CarService.createCar(formData)
      router.replace(DASHBOARD_PAGES.BUSINESS_CARS)
    } catch (error) {
      console.error("Ошибка при создании машины:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newPhotos = [...photos, ...Array.from(event.target.files)]
      if (newPhotos.length > 8) {
        newPhotos.length = 8
      }
      setPhotos(newPhotos)
      setErrors({ ...errors, photos: false })
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files) {
      const newPhotos = [...photos, ...Array.from(event.dataTransfer.files)]
      if (newPhotos.length > 8) {
        newPhotos.length = 8
      }
      setPhotos(newPhotos)
      setErrors({ ...errors, photos: false })
    }
  }

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Добавление нового автомобиля
        </h1>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Basic Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Марка
              </label>
              <select
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
                  errors.brand
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                value={carBrand}
                onChange={(e) => {
                  setCarBrand(e.target.value)
                  setErrors({ ...errors, brand: false })
                }}
              >
                <option value="">Выберите марку</option>
                {carBrandData.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Модель
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
                  errors.model
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Введите модель"
                value={carModel}
                onChange={(e) => {
                  setCarModel(e.target.value)
                  setErrors({ ...errors, model: false })
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Номерной знак
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
                  errors.number
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Введите номер"
                value={carNumber}
                onChange={(e) => {
                  setCarNumber(e.target.value)
                  setErrors({ ...errors, number: false })
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Класс
              </label>
              <select
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
                  errors.class
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                value={carClass}
                onChange={(e) => {
                  setCarClass(e.target.value)
                  setErrors({ ...errors, class: false })
                }}
              >
                <option value="">Выберите класс</option>
                {carClassData.map((carClass) => (
                  <option key={carClass} value={carClass}>
                    {carClass}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Трансмиссия
              </label>
              <select
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
                  errors.transmission
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                value={carTransmission}
                onChange={(e) => {
                  setCarTransmission(e.target.value)
                  setErrors({ ...errors, transmission: false })
                }}
              >
                <option value="">Выберите трансмиссию</option>
                {carTransmissionsData.map((transmission) => (
                  <option key={transmission} value={transmission}>
                    {transmission}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Пробег (км)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={carMileage}
                min="0"
                onChange={(e) => setCarMileage(Number(e.target.value))}
              />
            </div>

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
          </div>

          {/* Description Section */}
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

          {/* Photos Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Фотографии
              <span className="text-sm text-gray-500 ml-2">
                (максимум 8 фото)
              </span>
            </label>
            
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleAddPhoto}
            />

            {photos.length === 0 ? (
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                  errors.photos
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={openFilePicker}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <div className="text-gray-500">
                  Перетащите фото сюда или нажмите для выбора
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {photos.length < 8 && (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-32 cursor-pointer hover:border-gray-400"
                    onClick={openFilePicker}
                  >
                    <span className="text-gray-500">+</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Link href={DASHBOARD_PAGES.BUSINESS_CARS} className="flex-1">
              <button
                type="button"
                className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Отмена
              </button>
            </Link>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md disabled:opacity-50"
              onClick={createCar}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Создание..." : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
