import { axiosWithAuth } from '@/api/interceptors'
import { IApplicationsResponse } from '@/types/application.type'

export const ApplicationService = {
	async getApplications() {
		const response = await axiosWithAuth.get<IApplicationsResponse>(
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
