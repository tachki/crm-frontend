"use client"

import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import emptyParkImage from '@/images/main_page_park/empty_park.png'
import plusIcon from '@/images/main_page_park/plus.png'
import { mapCarDtoToCar } from "@/types/car.type"
import Link from 'next/link'
import { TailSpin } from 'react-loader-spinner'
import CarCard from './CarCard'
import { useCars } from "./hooks/useCars"
import { useAppSelector } from '@/hooks/redux'


export default function Home() {
  const { user } = useAppSelector((state) => state.user)

  let businessId: string = 'default-business-id'
  if (user && user.business_id !== undefined) {
    businessId = user.business_id
  }

  const { cars, isLoading, error, totalCars } = useCars(businessId)

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
          <img
            src={emptyParkImage.src}
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
          <CarCard key={car.id} car={mapCarDtoToCar(car)} />
        ))}
      </div>

      <Link href={DASHBOARD_PAGES.CREATE}>
        <div
          className="fixed bottom-10 right-10 bg-yellow-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
        >
          <img
            src={plusIcon.src}
            alt="Plus Icon"
            width={18}
            height={18}
          />
        </div>
      </Link>
    </div>
  )
}
