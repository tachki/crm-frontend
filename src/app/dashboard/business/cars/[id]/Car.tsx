'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/buttons/Button'
import Link from 'next/link'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import Calendar from '@/components/calendar/Calendar'
import Slider from '@/components/slider/Slider'
import { CarDto, CarStatus, mapCarDtoToCar, statusStyles } from '@/types/car.type'
import type { Car } from '@/types/car.type'
import { CarService } from '@/services/car.service'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import ConfirmationModal from '@/components/modal/modal'

export default function Car() {
  const { id } = useParams()
  const carId = Array.isArray(id) ? id.join('') : id || ''
  const [carDto, setCarDto] = useState<CarDto | null>(null)
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDeleteCar = async () => {
    try {
      await CarService.deleteCar(carId);
      router.replace(DASHBOARD_PAGES.BUSINESS_CARS);
    } catch (error) {
      console.log(error);
    } finally {
      closeDeleteModal();
    }
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const resp = await CarService.getCar(carId);
        setCarDto(resp.car as CarDto);
      } catch (error) {
        console.error("Ошибка при получении авто:", error);
      }
    };
    if (carId) fetchCar();
  }, [carId]);

  const car: Car | null = carDto ? mapCarDtoToCar(carDto) : null;
  const colorClass = car ? statusStyles[car.status as CarStatus] : "bg-gray-300";

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

      <div className='mt-16 flex justify-between text-3xl lg-max:text-2xl font-semibold md-max:flex-col md-max:items-center gap-2 2sm-max:gap-1 2sm-max:mt-8'>
        <div className='flex items-center gap-2 2sm-max:text-base'>
          <div className={`w-4 h-4 rounded-full ${colorClass} 2sm-max:w-3 2sm-max:h-3`}></div>
          <span>{car?.status}</span>
        </div>
        <span className='2sm-max:text-base'>Затраты: {car?.totalExpenses}</span>
      </div>

      <div className='flex flex-wrap mt-12 mb-12 gap-24 lg-max:flex-col 2sm-max:mt-4 2sm-max:gap-12'>
        <div className='flex-1'>
          <Slider images={car?.images || []} />
        </div>
        <div className='flex-1'>
          <Calendar carId={carId} />
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

      <div className='mt-12 flex justify-between lg-max:flex-col lg-max:items-center lg-max:w-full gap-2'>
        <Link href={DASHBOARD_PAGES.BUSINESS_CARS} className='lg-max:w-full'>
          <Button className={'px-28 bg-transparent hover:bg-primary hover:text-white w-full'}>Назад</Button>
        </Link>
        <Link href={`${DASHBOARD_PAGES.CAR_DETAILS.replace('[id]', carId)}/update`}>
          <Button className={'bg-orangeEdit border-none w-full'} icon={'/edit-icon.svg'}>Изменить</Button>
        </Link>
        <Button className={'bg-errorRed border-none text-white lg-max:w-full'} icon={'/delete-icon.svg'} onClick={openDeleteModal}>
          Удалить
        </Button>
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteCar}
          title="Удаление автомобиля"
          message="Вы уверены, что хотите удалить этот автомобиль? Это действие нельзя отменить."
        />
      </div>
    </div>
  );
}
