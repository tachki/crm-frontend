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
        await axiosWithAuth.post(`/v1/cars/${carId}/reserve`, {
          start_date: startDate,
          end_date: endDate,
        });
      },
    });
  };

  
  export const useGetAcceptedReservationsByCarId = (carId: string) => {
    return useQuery<Reservation[]>({
      queryKey: ["acceptedReservations", carId],
      queryFn: async () => {
        const response = await axiosWithAuth.get(`/v1/cars/${carId}/reservations/accepted`);
        return response.data.reservations;
      },
    });
  };

  export const useGetReservationsByUserId = (params: {id: string}) => {
    return useQuery<Reservation[]>({
      queryKey: ["acceptedReservations", params],
      queryFn: async () => {
        const response = await axiosWithAuth.get(`/v1/users/reservations`, {params});
        return response.data.reservations;
      },
    });
  };
  
  export const useGetPendingReservationsByCarId = (carId: string) => {
    return useQuery({
      queryKey: ["pendingReservations", carId],
      queryFn: async () => {
        const response = await axiosWithAuth.get(`/v1/cars/${carId}/reservations/pending`);
        return response.data.reservations;
      },
    });
  };

  export const useGetAllPendingReservationsByBusiness = () => {
      return useQuery({
          queryKey: ["getAllPendingReservationsByBusiness"],
          queryFn: async () => {
              const response = await axiosWithAuth.get<ReservationsResponseDto>(
                `/v1/businesses/reservations`
              ); 
              return response.data.reservations
          }
      });
  }
