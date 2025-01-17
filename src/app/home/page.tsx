"use client"
import { CarService } from "@/services/car.service";
import { Car, mapCarDtoToCar } from "@/types/car.type";
import { useEffect, useState } from "react";
import CarCard from "@/app/home/card/card"
import { getUserStorage } from "@/services/auth-token.service";
import { TailSpin } from 'react-loader-spinner';

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCars, setTotalCars] = useState(0);

  // TODO если кто то знает более элегантный способ обработки нуллабельности - ю аре велком
  let businessId: string = 'default-business-id'; 

  const userStorage = getUserStorage();
  
  if (userStorage && userStorage.business_id !== undefined) {
    businessId = userStorage.business_id;
  }

  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await CarService.getCarsByBusiness(businessId);
        const mappedCars = response.map(mapCarDtoToCar);
        setCars(mappedCars);
        setTotalCars(response.length);
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка при загрузке данных');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [businessId]);

  return (
    <div className="p-6 mb">
       <h1 className="text-2xl font-bold mb-6 text-center">
        Автомобили ({totalCars}) 
      </h1>

      {/* TODO должны быть заглушки */}
      {isLoading ? (
        <TailSpin
          height="80"
          width="80"
          color="#3B44FF" // Устанавливаем цвет
          ariaLabel="loading"
        />
      ) : (
        <p>Загрузка завершена!</p>
      )}
      {error && <p className="text-red-500">Ошибка: {error}</p>}
      
      {!isLoading && !error && cars?.length === 0 && <p>Нет доступных автомобилей</p>}
  
      <div className="grid grid-cols-1 gap-6 p-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
