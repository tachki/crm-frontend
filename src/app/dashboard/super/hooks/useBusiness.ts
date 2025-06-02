import { BusinessService } from '@/services/business.service'
import { useQuery } from "@tanstack/react-query";

export const useBusiness = () => {
  return useQuery({
    queryKey: ['business'],
    queryFn: () => BusinessService.getBusiness(),
    staleTime: 5 * 60 * 1000
  })
}