import { axiosWithAuth } from "@/api/interceptors";
import { ReservationsResponseDto } from "@/types/reservation.type";


export const ReservationService = {

    async getReservationsByCar(carId: string) {
        try {
          const response = await axiosWithAuth.get<ReservationsResponseDto>(
            `/v1/cars/${carId}/reservations`
          );
    
          if (response.status === 200 && response.data.reservations) {
            return response.data;
          } else {
            throw new Error('Не удалось получить список резерваций');
          }
        } catch (error) {
          console.error('Ошибка при получении резерваций:', error);
          throw error;
        }
      },

      async updateReservationStatus(reservationId: string, status: string) {
        try {
          const response = await axiosWithAuth.put(
            `/v1/cars/reservations/${reservationId}`,
            { status }
          );
    
          if (response.status === 200) {
            console.log('Статус бронирования обновлен');
            return response.data;
          } else {
            throw new Error('Не удалось обновить статус бронирования');
          }
        } catch (error) {
          console.error('Ошибка при обновлении статуса бронирования:', error);
          throw error;
        }
      },

      async reserveCar(carId: string, startDate: string, endDate: string) {
        try {
          const response = await axiosWithAuth.post(
            `/v1/cars/${carId}/reserve`,
            {
              start_date: startDate,
              end_date: endDate,
            }
          );
    
          if (response.status === 200) {
            console.log('Машина успешно зарезервирована');
            return response.data;
          } else {
            throw new Error('Не удалось забронировать машину');
          }
        } catch (error) {
          console.error('Ошибка при бронировании машины:', error);
          throw error;
        }
      },
}