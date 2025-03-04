"use client"

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CarService } from "@/services/car.service";
import ClientCalendar from '@/components/calendar/ClientCalendar'
import Slider from '@/components/slider/Slider'
import { useCar } from "../hooks/useGetCar";
import { CarDto, mapCarDtoToCar } from "@/types/car.type";
import { CLIENT_PAGES, DASHBOARD_PAGES } from '@/config/pages-url.config'
import { decodeTokens } from '@/services/auth-token.service'

const formatDate = (date: Date | null) => {
  return date ? date.toLocaleDateString("ru-RU") : "";
};


export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const { data: carDto, isLoading, error } = useCar(id);

  const router = useRouter();
  
  const user = decodeTokens();

  const handleRent = async () => {
    if (!user) {
      router.push(DASHBOARD_PAGES.AUTH)
      return
    }

    if (!user.is_verified) {
      router.push(CLIENT_PAGES.VERIFICATION)
      return
    }

    if (selectedDates.length !== 2) {
      alert("Выберите даты для аренды")
      return
    }

    try {
      await CarService.createReservation(id, formatDate(selectedDates[0]), formatDate(selectedDates[1]));
      alert("Аренда успешно забронирована!");
      window.location.reload();
    } catch (error) {
      console.error("Ошибка бронирования:", error);
      alert("Не удалось забронировать аренду. Попробуйте позже.: ");
    }
  };

  if (error) return <div className="text-center p-10 text-red-500">{error.message}</div>;
  if (isLoading) return <div className="text-center p-10">Loading...</div>;

  const car = mapCarDtoToCar(carDto as CarDto);

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
        <div>
          <div className='flex-1 flex flex-col items-center justify-between h-full'>
            <ClientCalendar carId={id} selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition"
                onClick={handleRent}
                >
                Арендовать
              </button>
            </div>
          </div>
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
