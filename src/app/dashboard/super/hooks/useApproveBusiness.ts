import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BusinessService } from '@/services/business.service'

export const useApproveBusiness = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => BusinessService.approveBusiness(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['business'] })
		},
	})
}