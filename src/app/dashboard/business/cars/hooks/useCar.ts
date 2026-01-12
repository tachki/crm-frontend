import { CarService } from '@/services/car.service'
import { useQuery } from "@tanstack/react-query";

export function useCar(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['car'],
    queryFn: async () => await CarService.getCar(id)
  })

	return { data, isLoading }
}

