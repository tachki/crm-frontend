import { axiosWithAuth } from '@/api/interceptors'
import { IBusinessesResponse } from '@/types/business.type'

export const BusinessService = {
	async getBusinesses() {
		const response = await axiosWithAuth.get<IBusinessesResponse>(
			`/v1/businesses/`, {})
		return response.data.businesses ?? []
	},
}
