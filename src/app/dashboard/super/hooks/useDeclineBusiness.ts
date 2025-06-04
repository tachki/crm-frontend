import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BusinessService } from '@/services/business.service'

export const useDeclineBusiness = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => BusinessService.declineBusiness(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['business'] })
		},
	})
}