import { useMutation, useQuery } from "@tanstack/react-query";
import { Reservation, ReservationsResponseDto } from "@/types/reservation.type";
import { axiosWithAuth } from "@/api/interceptors";

export const useGetReservationsByCar = (carId: string) => {
    return useQuery({
      queryKey: ["reservations", carId],
      queryFn: async () => {
        const response = await axiosWithAuth.get<ReservationsResponseDto>(
          `/v1/cars/${carId}/reservations`
        );
        return response.data;
      },
    });
  };

  export const useUpdateReservationStatus = () => {
    return useMutation({
      mutationFn: async ({ reservationId, status }: { reservationId: string; status: string }) => {
        const response = await axiosWithAuth.put(`/v1/cars/reservations/${reservationId}`, {
          status,
        });
        return response.data;
      },
    });
  };

  export const useReserveCar = () => {
    return useMutation({
      mutationFn: async ({ carId, startDate, endDate }: { carId: string; startDate: string; endDate: string }) => {
        const response = await axiosWithAuth.post(`/v1/cars/${carId}/reserve`, {
          start_date: startDate,
          end_date: endDate,
        });
        return response.data;
      },
    });
  };

  
  export const useGetAcceptedReservationsByCarId = (carId: string) => {
    return useQuery<Reservation[]>({
      queryKey: ["acceptedReservations", carId],
      queryFn: async () => {
        const response = await axiosWithAuth.get(`/v1/cars/${carId}/accepted`);
        return response.data;
      },
    });
  };
  
  export const useGetPendingReservationsByCarId = (carId: string) => {
    return useQuery({
      queryKey: ["pendingReservations", carId],
      queryFn: async () => {
        const response = await axiosWithAuth.get(`/v1/cars/${carId}/pending`);
        return response.data;
      },
    });
  };
  
  export const useLockCar = () => {
    return useMutation({
      mutationFn: async ({ carId, startDate, endDate }: { carId: string; startDate: string; endDate: string }) => {
        const response = await axiosWithAuth.post(`/v1/cars/${carId}/lock`, {
          start_date: startDate,
          end_date: endDate,
        });
        return response.data;
      },
    });
  };
  