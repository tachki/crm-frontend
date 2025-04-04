import { STATIC_URL } from "@/config/pages-url.config"

export interface Car {
  id: string
  brand: string
  model: string
  class: string
  transmission: string
  description: string
  year: string
  pricePerDay: number
  businessId: string
  previewImage: string
  status: CarStatus
  createdAt: Date
  updatedAt: Date
  images?: string[]
  totalMileage: number
  averageMileage: number
  averageConsumption: number
  totalExpenses: number
  rating: string
  downtimeCoefficient: number
}

export type CarStatus =
  | "Бронь"
  | "Арендовано"
  | "Свободно"
  | "Временно недоступно"
  | "Недоступно"

export interface CarCardProps {
  car: Car
}

export const statusStyles: Record<CarStatus, string> = {
  "Бронь": "bg-orange-500",
  "Арендовано": "bg-red-500",
  "Свободно": "bg-green-500",
  "Временно недоступно": "bg-yellow-500",
  "Недоступно": "bg-gray-500",
}

export interface GetCarDto {
  car: CarDto
}

export interface GetCarsDto {
  cars: CarDto[]
}


export interface CarDto {
  brand: string
  business_id: string
  class: string
  created_at: string
  description: string
  id: string
  images: string[]
  model: string
  preview_image: string
  price_per_day: number
  status: CarStatus
  transmission: string
  updated_at: string
  year: string
}

//TODO временный маппер пока на бекенде нет полной модельки со средними значениями
export function mapCarDtoToCar(dto: CarDto): Car {
  return {
    id: dto.id,
    brand: dto.brand,
    model: dto.model,
    class: dto.class,
    transmission: dto.transmission,
    description: dto.description || 'Описание отсутствует',
    year: dto.year,
    pricePerDay: dto.price_per_day || 0,
    previewImage: STATIC_URL + dto.preview_image || '',
    status: dto.status as Car['status'],
    createdAt: new Date(dto.created_at || Date.now()),
    updatedAt: new Date(dto.updated_at || Date.now()),
    images: dto.images ? dto.images.map((img) => STATIC_URL + img) : [],
    totalMileage: 0,
    averageMileage: 0,
    averageConsumption: 0,
    totalExpenses: 0,
    rating: 'N/A',
    downtimeCoefficient: 0,
    businessId: dto.business_id,
  }
}

export interface IFilters {
  class?: string
  brand?: string
  start_date?: string
  end_date?: string
  sort?: 'prc.d' | 'prc.a'
  limit?: number
  offset?: number
  transmission?: string
  price_from?: string
  price_to?: string
}