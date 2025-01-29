import { CarService } from '@/services/car.service'
import { ICar } from '@/types/car.type'
import { useQuery } from "@tanstack/react-query";

export function useCar(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['car'],
    queryFn: () => CarService.getCar(id)
  })

	return { data, isLoading }
}