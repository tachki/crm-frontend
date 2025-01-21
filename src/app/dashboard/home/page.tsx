"use client"
import { CarService } from "@/services/car.service";
import { Car, mapCarDtoToCar } from "@/types/car.type";
import { useEffect, useState } from "react";
import CarCard from "@/app/dashboard/home/card/card"
import { getUserStorage } from "@/services/auth-token.service";
import { TailSpin } from 'react-loader-spinner';
import Image from 'next/image';
import emptyParkImage from '../../../images/main_page_park/empty_park.png';
import plusIcon from '../../../images/main_page_park/plus.png';



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
    <div className="">
      {!(cars?.length === 0) && <h1 className="text-2xl font-bold text-center">
        Автомобили ({totalCars}) 
      </h1>}
  
      {isLoading ? (
        <TailSpin
          height="80"
          width="80"
          color="#3B44FF" 
          ariaLabel="loading"
        />
      ) : (
        <p></p>
      )}
      
      {error && <p className="text-red-500">Ошибка: {error}</p>}
      
      {!isLoading && !error && cars?.length === 0 && (
      <div className="flex flex-col items-center justify-center">
        <Image 
        src={emptyParkImage}
        alt="Нет автомобилей"
        width={550} 
        height={350} 
        className="mb-4"
      />
      
        <p className="text-lg font-medium text-black">Добавьте автомобили для их отображения на странице</p>
      </div>
    )}

  
      <div className="grid grid-cols-1 gap-4">
      {cars.map((car) => ( 
          <CarCard key={car.id} car={car} />
          
       ))} 
      </div>

      <button 
        className="fixed bottom-10 right-10 bg-yellow-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
      >
        <Image 
          src={plusIcon} 
          alt="Plus Icon" 
          width={18} 
          height={18}
        />
      </button>
    </div>
  );
}