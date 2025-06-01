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

  const handleRemoveMark = () => {
    setSelectedDates([]); 
  };
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
    <div className="max-w-screen-xl mx-auto px-4  text-gray-900">
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 mb-10">
        <div className="p-5 bg-white rounded-xl shadow-md">
          <h1 className="text-3xl sm:text-3xl font-bold mb-2">
            {car?.brand} {car?.model}
          </h1>
          <div className="text-gray-600 text-base mb-4">
            <span className="capitalize">{car?.transmission}</span> · {car?.class}
          </div>
        
         <Slider images={car?.images || []} />


          <div className="border border-gray-200 rounded-lg mb-8 mt-6">
            <h2 className="text-lg font-semibold mb-3 text-xl">Характеристики</h2>
            <dl className="space-y-1.5">
              {[
                { label: "Общий пробег", value: `${car?.totalMileage} км` },
                { label: "Пробег на 1 аренду", value: `${car?.averageMileage} км` },
                { label: "Рейтинг", value: car?.rating ?? "N/A" },
                { label: "Расход топлива", value: `${car?.averageConsumption} л/100км` },
                { label: "Коэффициент простоев", value: car?.downtimeCoefficient },
                { label: "Цена в сутки", value: `${car?.pricePerDay} BYN` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center text-base">
                  <dt className="text-gray-500 font-medium ">{label}</dt>
                  <div className="flex-grow border-b border-dotted border-gray-300 mx-1.5 h-[1px]" />
                  <dd className="font-medium text-gray-900 whitespace-nowrap">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
  
          <section className="max-w-2xl">
            <h2 className="text-2xl font-semibold mb-3">Описание</h2>
            <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
              {car?.description || "Описание отсутствует."}
            </p>
          </section>
        </div>
  
        <div className="flex flex-col w-full gap-4">
        <aside className="bg-white border border-gray-200 rounded-xl shadow-md p-4 self-start font-medium w-full">
          <ClientCalendar
            carId={id}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            onClearDates={handleRemoveMark}
          />

          <div className="flex gap-3 mt-3">
            <button
              onClick={handleRemoveMark}
              className="flex-1 border border-gray-400 text-gray-700 py-2 rounded-md hover:bg-gray-100"
            >
              Отменить
            </button>
            <button
              onClick={handleRent}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Арендовать
            </button>
          </div>
        </aside>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 w-full cursor-default">
          <div className="text-xs text-gray-500 font-medium mb-1">Цена за сутки</div>
          <div className="text-2xl font-semibold text-gray-900">
            {car?.pricePerDay} BYN
          </div>
        </div>

      </div>
      </section>
    </div>
  );
  
  
}
