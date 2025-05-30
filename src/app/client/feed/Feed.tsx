"use client"

import { useState } from "react"
import CarCard from "./CarPost"
import { useFilteredCars } from "./hooks/useGetCar"
import CarsFilters from '@/components/filters/CarsFilters'
import { IFilters } from '@/types/car.type'

export default function Feed() {
  const [filters, setFilters] = useState<IFilters>({})

  const { data: cars = [], isLoading, error } = useFilteredCars(filters)

  if (error) return <p>Ошибка загрузки </p>

  return (
    <div className="mx-auto">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start mb-6">
        <div className="w-full md:w-1/4 bg-white p-4 shadow-md rounded-lg h-auto">
          <CarsFilters filters={filters} setFilters={setFilters} />
        </div>

        <div className="flex-1 flex flex-col">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-lg font-medium">Загрузка...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {cars.length === 0 ? (
                <h1 className="text-center text-lg font-medium col-span-full">
                  Кажется, здесь пока что пусто...
                </h1>
              ) : (
                cars.map((car) => <CarCard key={car.id} car={car} />)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

