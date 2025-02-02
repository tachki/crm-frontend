"use client";

import { useEffect, useState } from "react";
import { CarDto } from "@/types/car.type";
import Filters from "./filters";
import CarCard from "./CarPost";

const mockCars: CarDto[] = [
    {
      id: "1",
      brand: "Toyota",
      business_id: "business_1",
      class: "Sedan",
      created_at: "2020-01-01T00:00:00Z",
      description: "Комфортный седан для поездок по городу.",
      images: ["/images/toyota_camry.jpg"],
      model: "Camry",
      preview_image: "https://storage.yandexcloud.net/moskvichmag/uploads/2024/03/Xcite-X-Cross7.jpg",
      price_per_day: 100,
      status: "available",
      transmission: "Automatic",
      updated_at: "2020-01-01T00:00:00Z",
      year: "2020",
    },
    {
      id: "2",
      brand: "BMW",
      business_id: "business_2",
      class: "SUV",
      created_at: "2021-02-15T00:00:00Z",
      description: "Мощный кроссовер для любых условий.",
      images: ["/images/bmw_x5.jpg"],
      model: "X5",
      preview_image: "https://storage.yandexcloud.net/moskvichmag/uploads/2024/03/Xcite-X-Cross7.jpg",
      price_per_day: 150,
      status: "available",
      transmission: "Automatic",
      updated_at: "2021-02-15T00:00:00Z",
      year: "2021",
    },
    {
      id: "3",
      brand: "Tesla",
      business_id: "business_3",
      class: "Sedan",
      created_at: "2022-03-01T00:00:00Z",
      description: "Электрический седан с высокой производительностью.",
      images: ["/images/tesla_model3.jpg"],
      model: "Model 3",
      preview_image: "https://storage.yandexcloud.net/moskvichmag/uploads/2024/03/Xcite-X-Cross7.jpg",
      price_per_day: 200,
      status: "available",
      transmission: "Automatic",
      updated_at: "2022-03-01T00:00:00Z",
      year: "2022",
    },
    {
      id: "4",
      brand: "Ford",
      business_id: "business_4",
      class: "Coupe",
      created_at: "2019-06-10T00:00:00Z",
      description: "Смелый и стильный спортивный автомобиль.",
      images: ["/images/ford_mustang.jpg"],
      model: "Mustang",
      preview_image: "https://storage.yandexcloud.net/moskvichmag/uploads/2024/03/Xcite-X-Cross7.jpg",
      price_per_day: 120,
      status: "available",
      transmission: "Manual",
      updated_at: "2019-06-10T00:00:00Z",
      year: "2019",
    },
    {
        id: "4",
        brand: "Ford",
        business_id: "business_4",
        class: "Coupe",
        created_at: "2019-06-10T00:00:00Z",
        description: "Смелый и стильный спортивный автомобиль.",
        images: ["/images/ford_mustang.jpg"],
        model: "Mustang",
        preview_image: "https://storage.yandexcloud.net/moskvichmag/uploads/2024/03/Xcite-X-Cross7.jpg",
        price_per_day: 120,
        status: "available",
        transmission: "Manual",
        updated_at: "2019-06-10T00:00:00Z",
        year: "2019",
      },
      {
        id: "4",
        brand: "Ford",
        business_id: "business_4",
        class: "Coupe",
        created_at: "2019-06-10T00:00:00Z",
        description: "Смелый и стильный спортивный автомобиль.",
        images: ["/images/ford_mustang.jpg"],
        model: "Mustang",
        preview_image: "https://storage.yandexcloud.net/moskvichmag/uploads/2024/03/Xcite-X-Cross7.jpg",
        price_per_day: 120,
        status: "available",
        transmission: "Manual",
        updated_at: "2019-06-10T00:00:00Z",
        year: "2019",
      },
      {
        id: "4",
        brand: "Ford",
        business_id: "business_4",
        class: "Coupe",
        created_at: "2019-06-10T00:00:00Z",
        description: "Смелый и стильный спортивный автомобиль.",
        images: ["/images/ford_mustang.jpg"],
        model: "Mustang",
        preview_image: "https://storage.yandexcloud.net/moskvichmag/uploads/2024/03/Xcite-X-Cross7.jpg",
        price_per_day: 120,
        status: "available",
        transmission: "Manual",
        updated_at: "2019-06-10T00:00:00Z",
        year: "2019",
      },
      {
        id: "4",
        brand: "Ford",
        business_id: "business_4",
        class: "Coupe",
        created_at: "2019-06-10T00:00:00Z",
        description: "Смелый и стильный спортивный автомобиль.",
        images: ["/images/ford_mustang.jpg"],
        model: "Mustang",
        preview_image: "https://storage.yandexcloud.net/moskvichmag/uploads/2024/03/Xcite-X-Cross7.jpg",
        price_per_day: 120,
        status: "available",
        transmission: "Manual",
        updated_at: "2019-06-10T00:00:00Z",
        year: "2019",
      },
      {
        id: "4",
        brand: "Ford",
        business_id: "business_4",
        class: "Coupe",
        created_at: "2019-06-10T00:00:00Z",
        description: "Смелый и стильный спортивный автомобиль.",
        images: ["/images/ford_mustang.jpg"],
        model: "Mustang",
        preview_image: "https://storage.yandexcloud.net/moskvichmag/uploads/2024/03/Xcite-X-Cross7.jpg",
        price_per_day: 120,
        status: "available",
        transmission: "Manual",
        updated_at: "2019-06-10T00:00:00Z",
        year: "2019",
      },
      {
        id: "4",
        brand: "Ford",
        business_id: "business_4",
        class: "Coupe",
        created_at: "2019-06-10T00:00:00Z",
        description: "Смелый и стильный спортивный автомобиль.",
        images: ["/images/ford_mustang.jpg"],
        model: "Mustang",
        preview_image: "https://storage.yandexcloud.net/moskvichmag/uploads/2024/03/Xcite-X-Cross7.jpg",
        price_per_day: 120,
        status: "available",
        transmission: "Manual",
        updated_at: "2019-06-10T00:00:00Z",
        year: "2019",
      },
  ];



export default function Feed() {
    const [cars, setCars] = useState<CarDto[]>(mockCars);
    const [sortCriteria, setSortCriteria] = useState<"prc.d" | "prc.a" | undefined>();
  
    useEffect(() => {
      const fetchCars = async () => {
        try {
          setCars(mockCars); // Здесь можно добавить логику для запроса данных
        } catch (e) {
          console.error("Ошибка при загрузке автомобилей:", e);
        }
      };
  
      fetchCars();
    }, [sortCriteria]);
  
    return (
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start mb-6">
          <div className="w-full md:w-1/4 bg-white p-4 shadow-md rounded-lg h-auto ">
            <Filters />
          </div>
  
          
          <div className="flex-1 flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {cars.length === 0 ? (
                <h1 className="text-center text-lg font-medium col-span-full">
                  Кажется, здесь пока что пусто...
                </h1>
              ) : (
                cars.map((car) => <CarCard key={car.id} car={car} />)
                
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  