import { CarService } from "@/services/car.service";
import { useQuery } from "@tanstack/react-query";

interface CarsParams {
    class?: string;
    brand?: string;
    start_date?: string;
    end_date?: string;
    sort?: "prc.d" | "prc.a";
    limit?: number;
    offset?: number;
  }
  

export const useFilteredCars = (filters: CarsParams) => {
    return useQuery({
      queryKey: ["cars", filters],
      queryFn: () => CarService.getCarsWithFilters(filters),
      staleTime: 5 * 60 * 1000, 
    });
  };