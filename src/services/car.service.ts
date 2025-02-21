import { axiosWithAuth } from "@/api/interceptors";
import { CarDto, GetCarDto, GetCarsDto } from "@/types/car.type";


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

    async getCar(id: string):Promise<GetCarDto> {
      const response = await axiosWithAuth.get<GetCarDto>(`/v1/cars/${id}`);
      return response.data;
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
    },

    async deleteCar(carId: string) {
      try {
        const response = await axiosWithAuth.delete(
          `/v1/cars/${carId}`
        );

        if (response.status === 204) {
          console.log('Машина удалена');
          return response.data;
        } else {
          throw new Error('Не удалось удалить машину');
        }
      } catch (error) {
        console.error('Ошибка при удалении машины:', error);
        throw error;
      }
    },

    async updateCar(carId: string, status: string) {
      try {
        const data = JSON.stringify({
            status: status
        })

        const response = await axiosWithAuth.patch(
          `/v1/cars/${carId}`,
          data,
        );

        if (response.status === 204) {
          console.log('Машина обновлена');
          return 
        } else {
          throw new Error('Не удалось обновить информацию о машине');
        }
      } catch (error) {
        console.error('Ошибка при обновлении информации о машине:', error);
        throw error;
      }
    },
    
    async getCars(params: {
      class?: string;
      brand?: string;
      start_date?: string;
      end_date?: string;
      sort?: 'prc.d' | 'prc.a';
      limit?: number;
      offset?: number;
    }) {
      const response = await axiosWithAuth.get<GetCarsDto>('/v1/cars/', { params });
      return response.data.cars;
    }

 }
