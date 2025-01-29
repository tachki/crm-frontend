import { CarService } from '@/services/car.service'
import { useQuery } from "@tanstack/react-query";

export function useCar(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['car'],
    queryFn: () => CarService.createCar(id)
  })

	return { data, isLoading }
}