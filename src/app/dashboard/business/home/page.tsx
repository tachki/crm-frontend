"use client"

import { getUserStorage } from "@/services/auth-token.service";
import { TailSpin } from 'react-loader-spinner';
import Image from 'next/image';
import emptyParkImage from '@/images/main_page_park/empty_park.png';
import plusIcon from '@/images/main_page_park/plus.png';
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import CarCard from "../cars/CarCard";
import { useCarsByBusiness } from "./hooks/useCarByBusiness";


export default function Home() {
  const businessId = getUserStorage()?.business_id ?? 'default-business-id';

  const { data: cars = [], isLoading, error } = useCarsByBusiness(businessId);

  return (
    <div className="p-4">
      {cars.length > 0 && (
        <h1 className="text-2xl font-bold text-center mb-4">
          Автомобили ({cars.length})
        </h1>
      )}

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <TailSpin height="80" width="80" color="#3B44FF" ariaLabel="loading" />
        </div>
      )}

      {error && <p className="text-red-500 text-center">Ошибка: {error.message}</p>}

      {!isLoading && !error && cars.length === 0 && (
        <div className="flex flex-col items-center justify-center h-96">
          <Image src={emptyParkImage} alt="Нет автомобилей" width={550} height={350} className="mb-4" />
          <p className="text-lg font-medium text-black text-center">
            Добавьте автомобили для их отображения на странице
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      <button
        className="fixed bottom-10 right-10 bg-yellow-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-yellow-600 transition-colors"
        onClick={() => {
          window.location.href = DASHBOARD_PAGES.CREATE;
        }}
      >
        <Image src={plusIcon} alt="Plus Icon" width={18} height={18} />
      </button>
    </div>
  );
}
