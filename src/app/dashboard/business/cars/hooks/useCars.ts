import { useState, useEffect } from 'react';
import { CarDto } from '@/types/car.type'
import { CarService } from '@/services/car.service';

export const useCars = (businessId: string) => {
  const [cars, setCars] = useState<CarDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCars, setTotalCars] = useState(0);

  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const carsResponse = await CarService.getCarsByBusiness(businessId);
        setCars(carsResponse);
        setTotalCars(carsResponse.length);
      } catch (err: unknown) {
        setError(`Произошла ошибка при загрузке автомобилей: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [businessId]); 

  return { cars, isLoading, error, totalCars };
};
