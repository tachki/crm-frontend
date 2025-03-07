import { CarService } from "@/services/car.service"
import { IFilters } from '@/types/car.type'
import { useQuery } from "@tanstack/react-query"

export const useFilteredCars = (filters: IFilters) => {
  return useQuery({
    queryKey: ["cars", filters],
    queryFn: () => CarService.getCarsWithFilters(filters),
    staleTime: 5 * 60 * 1000,
  })
}

export const useFilteredCarsByBusiness = (filters: IFilters, id: string) => {
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
