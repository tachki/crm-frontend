import { useQuery } from '@tanstack/react-query'
import { CarService } from '@/services/car.service'
import { CarDto } from '@/types/car.type'

export function useFindCar(query: string) {
  const {
    data: cars,
    isLoading,
    isError,
    error
  } = useQuery<CarDto[], Error>({
    queryKey: ['findCars', query],
    queryFn: async () => await CarService.findCar(query),
    enabled: !!query
  })

  return { cars, isLoading, isError, error }
}