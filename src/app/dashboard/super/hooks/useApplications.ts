import { ApplicationService } from '@/services/application.service'
import { useQuery } from "@tanstack/react-query";


export const useAplications = () => {
  return useQuery({
    queryKey: ['applications'],
    queryFn: async () => ApplicationService.getApplications(),
    staleTime: 5 * 60 * 1000
  })
}
