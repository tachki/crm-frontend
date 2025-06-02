import { axiosWithAuth } from '@/api/interceptors'
import { IBusinessResponse } from '@/types/business.type'

export const BusinessService = {
	async getBusiness() {
		const response = await axiosWithAuth.get<IBusinessResponse>(
			`/v1/businesses/`, {})
		return response.data.businesses
	}
}
