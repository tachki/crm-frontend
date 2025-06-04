import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApplicationService } from '@/services/application.service'

export const useApproveBusiness = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => ApplicationService.approveBusiness(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['applications'] })
		},
	})
}
