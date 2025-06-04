import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApplicationService } from "@/services/application.service"

export const useDeclineBusiness = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => ApplicationService.declineBusiness(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['applications'] })
		},
	})
}
