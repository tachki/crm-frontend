import { axiosWithAuth } from "@/api/interceptors";
import { CarDto } from "@/types/car.type";

export const CarService = {

    async getCarsByBusiness(businessId: string) {
      try {
        const response = await axiosWithAuth.get<{ cars: CarDto[] }>(
          `/v1/cars/business/${businessId}`
        );
  
        if (response.status === 200 && response.data.cars) {
          return response.data.cars; 
        } else {
          throw new Error('Не удалось получить список автомобилей');
        }
      } catch (error) {
        console.error('Ошибка при получении автомобилей:', error);
        throw error;
      }
    },

    async getCarById(carId: string) {
        try {
        const response = await axiosWithAuth.get<CarDto>(`/v1/cars/${carId}`);

        if (response.status === 200 && response.data) {
            return response.data; 
        } else {
            throw new Error('Не удалось получить данные машины');
        }
        } catch (error) {
        console.error('Ошибка при получении машины:', error);
        throw error;
        }
    },

    

  };
import { axiosWithAuth } from '@/api/interceptors'
import { ICar } from '@/types/car.type'

export const carService = {
	async getCar(id: string) {
		const response = await axiosWithAuth.post<ICar>(`/v1/cars/${id}`, id)

		return response
	}
}