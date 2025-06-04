import { axiosWithAuth } from '@/api/interceptors'
import { IBusinessResponse } from '@/types/business.type'

export const BusinessService = {
	async getBusiness() {
		const response = await axiosWithAuth.get<IBusinessResponse>(
			`/v1/applications/`, {})
		return response.data.applications ?? []
	},

	async approveBusiness(id: string) {
		const response = await axiosWithAuth.put(`/v1/applications/${id}/approve`)
		return response.data
	},

	async declineBusiness(id: string) {
		const response = await axiosWithAuth.put(`/v1/applications/${id}/decline`)
		return response.data
	},
}
