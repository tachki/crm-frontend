"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Car, mapCarDtoToCar } from "@/types/car.type";
import { CarService } from "@/services/car.service";
import ClientCalendar from '@/components/calendar/ClientCalendar'
import Slider from '@/components/slider/Slider'

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCar() {
      try {
        const resp = await CarService.getCar(id)
        setCar(mapCarDtoToCar(resp.car));
      } catch (error) {
        console.error("Error fetching car details:", error);
        setError("Failed to load car details. Please try again later.");
      }
    }
    fetchCar();
  }, [id]);

  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!car) return <div className="text-center p-10">Loading...</div>;

  return (
    <div>
      <h1 className="font-bold text-5xl text-center 2sm-max:text-4xl">{car?.brand}</h1>
      <div className='flex text-2xl justify-center mt-6 2sm-max:text-base'>
        <h4>{car?.model}</h4>
        <div className='px-3 font-light'> | </div>
        <h4>{car?.class}</h4>
        <div className='px-3 font-light'> | </div>
        <h4 className='capitalize'>{car?.transmission}</h4>
      </div>

      <div className='flex flex-wrap mt-12 mb-12 gap-24 lg-max:flex-col 2sm-max:mt-4 2sm-max:gap-12'>
        <div className='flex-1'>
          <Slider images={car?.images || []} />
        </div>
        <div className='flex-1'>
          <ClientCalendar carId={id} />
        </div>
      </div>

      <div className='font-medium text-2xl lg-max:text-lg text-gray-500 flex flex-wrap gap-y-6 justify-center items-center 2sm-max:flex-col 2sm-max:gap-y-2'>
        <div className='w-full 2sm:w-1/3 text-center'>
          Общий пробег: <span className="text-black">{car?.totalMileage}км</span>
        </div>
        <div className='w-full 2sm:w-1/3 text-center'>
          Пробег на 1 аренду: <span className="text-black">{car?.averageMileage}км</span>
        </div>
        <div className='w-full 2sm:w-1/3 text-center'>
          Рейтинг: <span className="text-black">{car?.rating}</span>
        </div>
        <div className='w-full 2sm:w-1/3 text-center'>
          Средний расход топлива: <span className="text-black">{car?.averageConsumption}л</span>
        </div>
        <div className='w-full 2sm:w-1/3 text-center'>
          Цена в сутки: <span className="text-black">{car?.pricePerDay}BYN</span>
        </div>
        <div className='w-full 2sm:w-1/3 text-center'>
          Коэфф. простоев: <span className="text-black">{car?.downtimeCoefficient}</span>
        </div>
      </div>


      <h6 className='text-xl font-medium mb-3 mt-12'>Описание</h6>
      <p className='font-normal text-lg leading-5 2sm-max:text-base 2sm-max:leading-4'>{car?.description}</p>

    </div>
  );
}
