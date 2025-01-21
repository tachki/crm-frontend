import { carService } from '@/services/car.service'
import { ICar } from '@/types/car.type'
import { useQuery } from "@tanstack/react-query";

export function useCar(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['car'],
    queryFn: () => carService.getCar(id)
  })

	return { data, isLoading }
}