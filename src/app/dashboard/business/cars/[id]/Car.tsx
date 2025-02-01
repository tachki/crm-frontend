'use client'
import { useParams } from 'next/navigation'
import { useCar } from '../hooks/useCar'
import { Button } from '@/components/buttons/Button'
import Link from 'next/link'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import Calendar from '@/components/calendar/Calendar'
import Slider from '@/components/slider/Slider'
import { CarDto, CarStatus, mapCarDtoToCar, statusStyles } from '@/types/car.type'
import type { Car } from '@/types/car.type'
import { CarService } from '@/services/car.service'


export default function Car() {
  const { id } = useParams()
  const carId = Array.isArray(id) ? id.join('') : id || ''

  const deleteCar = () => {
    CarService.deleteCar(carId)
  }

  const imagesArr = ["/car_image.jpg", "/logo.svg", "/car_image.jpg", "/car_image.jpg", "/car_image.jpg", "/car_image.jpg"]

  const { data, isLoading } = useCar(carId)
  const carDto: CarDto = {
    brand: "Toyota",
    business_id: "123456",
    class: "SUV",
    created_at: new Date().toISOString(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    id: "abc123",
    images: ["/car_image.jpg", "/logo.svg", "/car_image.jpg", "/car_image.jpg", "/car_image.jpg", "/car_image.jpg"],
    model: "RAV4",
    preview_image: "https://example.com/preview.jpg",
    price_per_day: 50,
    status: "Арендовано",
    transmission: "automatic",
    updated_at: new Date().toISOString(),
    year: "2022",
  }

  const car: Car = mapCarDtoToCar(carDto)

  const colorClass = statusStyles[car.status as CarStatus] || "bg-gray-300"

  return (
    <div>
      <h1 className="font-bold text-5xl text-center 2sm-max:text-4xl">
        {car?.brand}
      </h1>

      <div className='flex text-2xl justify-center mt-6 2sm-max:text-base'>
        <h4>{car?.model}</h4>
        <div className='px-3 font-light'> | </div>
        <h4>{car?.class}</h4>
        <div className='px-3 font-light'> | </div>
        <h4 className='capitalize'>{car?.transmission}</h4>
      </div>

      <div className='mt-16 flex justify-between text-3xl lg-max:text-2xl font-semibold md-max:flex-col md-max:items-center gap-2 2sm-max:gap-1 2sm-max:mt-8'>
        <div className='flex items-center gap-2 2sm-max:text-base'>
          <div className={`w-4 h-4 rounded-full ${colorClass} 2sm-max:w-3 2sm-max:h-3`}></div>
          <span>{car.status}</span>
        </div>
        <span className='2sm-max:text-base'>Затраты: {car.totalExpenses}</span>

        {/* TO DO достать ответственное лицо  */}
        <span className='2sm-max:text-base'>Иванов А.А. (+ 375 33 333-33-33)</span>
      </div>

      <div className='flex flex-wrap mt-12 mb-12 gap-24 lg-max:flex-col 2sm-max:mt-4 2sm-max:gap-12'>
        <div className='flex-1'>
          <Slider images={car.images || []} />
        </div>
        <div className='flex-1'>
          <Calendar carId={carId} />
        </div>
      </div>

      <div className='font-medium text-2xl lg-max:text-lg text-gray-500 flex flex-wrap gap-y-6 justify-center items-center 2sm-max:flex-col 2sm-max:gap-y-2'>
        <div className='w-full 2sm:w-1/3 text-center'>
          Общий пробег: <span className="text-black">{car.totalMileage}км</span>
        </div>
        <div className='w-full 2sm:w-1/3 text-center'>
          Пробег на 1 аренду: <span className="text-black">{car.averageMileage}км</span>
        </div>
        <div className='w-full 2sm:w-1/3 text-center'>
          Рейтинг: <span className="text-black">{car.rating}</span>
        </div>
        <div className='w-full 2sm:w-1/3 text-center'>
          Средний расход топлива: <span className="text-black">{car.averageConsumption}л</span>
        </div>
        <div className='w-full 2sm:w-1/3 text-center'>
          Цена в сутки: <span className="text-black">{car.pricePerDay}BYN</span>
        </div>
        <div className='w-full 2sm:w-1/3 text-center'>
          Коэфф. простоев: <span className="text-black">{car.downtimeCoefficient}</span>
        </div>
      </div>


      <h6 className='text-xl font-medium mb-3 mt-12'>Описание</h6>
      <p className='font-normal text-lg leading-5 2sm-max:text-base 2sm-max:leading-4'>{car?.description}</p>

      <div className='mt-12 flex justify-between lg-max:flex-col lg-max:items-center lg-max:w-full gap-2'>
        <Link href={DASHBOARD_PAGES.BUSINESS_CARS} className='lg-max:w-full'>
          <Button
            children={'Назад'}
            className={'px-28 bg-transparent hover:bg-primary hover:text-white w-full'}
          />
        </Link>
        <Link href={`${DASHBOARD_PAGES.CAR_DETAILS.replace('[id]', carId)}/update`}>
          <Button
            children={'Изменить'}
            className={'bg-orangeEdit border-none w-full'}
            icon={'/edit-icon.svg'}
          />
        </Link>
        <Button
          children={'Удалить'}
          className={'bg-errorRed border-none text-white lg-max:w-full'}
          icon={'/delete-icon.svg'}
          onClick={deleteCar}
        />
      </div>
    </div>
  )
}
