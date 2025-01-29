import { axiosWithAuth } from "@/api/interceptors";
import { CarDto, ICar } from "@/types/car.type";

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

    async getCar(id: string) {
      const response = await axiosWithAuth.get<ICar>(`/v1/cars/${id}`);

      return response;
    },

    async createCar(formData: FormData) {
      try {
        const response = await axiosWithAuth.post('/v1/cars/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        if (response.status === 201 && response.data) {
          console.log('Машина успешно создана:', response.data);
          return response.data;
        } else {
          throw new Error('Не удалось создать машину');
        }
      } catch (error) {
        console.error('Произошла ошибка при создании машины:', error);
        throw error;
      }
    }
};



