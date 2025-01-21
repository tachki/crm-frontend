import { axiosWithAuth } from '@/api/interceptors'
import { ICar } from '@/types/car.type'

export const carService = {
	async getCar(id: string) {
		const response = await axiosWithAuth.post<ICar>(`/v1/cars/${id}`, id)

		return response
	}
}