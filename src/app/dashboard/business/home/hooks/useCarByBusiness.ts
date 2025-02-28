import { CarService } from "@/services/car.service";
import { mapCarDtoToCar } from "@/types/car.type";
import { useQuery } from "@tanstack/react-query";

export const useCarsByBusiness = (businessId: string) => {
    return useQuery({
      queryKey: ['cars', businessId],
      queryFn: async () => {
        const cars = await CarService.getCarsByBusiness(businessId);
        return cars.map(mapCarDtoToCar);
      },
    });
  };
