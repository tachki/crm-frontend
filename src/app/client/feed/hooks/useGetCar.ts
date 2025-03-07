import { CarService } from "@/services/car.service"
import { useQuery } from "@tanstack/react-query"

interface CarsParams {
  class?: string
  brand?: string
  start_date?: string
  end_date?: string
  sort?: "prc.d" | "prc.a"
  limit?: number
  offset?: number
  transmission?: string
  price_from?: string
  price_to?: string
}

export const useFilteredCars = (filters: CarsParams) => {
  return useQuery({
    queryKey: ["cars", filters],
    queryFn: () => CarService.getCarsWithFilters(filters),
    staleTime: 5 * 60 * 1000,
  })
}

export const useFilteredCarsByBusiness = (filters: CarsParams, id: string) => {
  return useQuery({
    queryKey: ["business cars", filters],
    queryFn: () => CarService.getBusinessCarsWithFilters(filters, id),
    staleTime: 5 * 60 * 1000,
  })
}

export const useCar = (carId: string) => {
  return useQuery({
    queryKey: ["car", carId],
    queryFn: () => CarService.getCar(carId),
    staleTime: 5 * 60 * 1000,
  })
}
