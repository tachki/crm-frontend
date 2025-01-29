'use client'
import { useParams } from 'next/navigation'
import { useCar } from '../hooks/useCar'
import { Button } from '@/components/buttons/Button'
import Link from 'next/link'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import Calendar from '@/components/calendar/Calendar'
import Slider from '@/components/slider/Slider'
import { ICar } from '@/types/car.type'


export default function Car() {
  const { id } = useParams()
  const carId = Array.isArray(id) ? id.join('') : id || ''

  const deleteCar = () => {
    console.log("Удаление машинки")
  }

  const imagesArr = ["/car_image.jpg", "/logo.svg", "/car_image.jpg", "/car_image.jpg", "/car_image.jpg", "/car_image.jpg"]

  const { data, isLoading } = useCar(carId)
  const car: ICar = {
    brand: "Toyota",
    business_id: "1",
    class: "SUV",
    created_at: "2023-01-01T12:00:00Z",
    description: "Надежный и экономичный внедорожник с просторным салоном.",
    id: "123",
    model: "RAV4",
    price_per_day: 50,
    transmission: "automatic",
    updated_at: "2023-01-15T12:00:00Z",
    year: "2022"
  }
  console.log("car data: ", data)

  return (
    <div>
      <h1 className="font-bold text-5xl text-center">
        {car?.brand}
      </h1>

      <div className='flex text-2xl justify-center mt-6'>
        <h4>{car?.model}</h4>
        <div className='px-3 font-light'> | </div>
        <h4>{car?.class}</h4>
        <div className='px-3 font-light'> | </div>
        <h4>{car?.transmission}</h4>
      </div>

      <div className='flex mt-16 mb-12 gap-24'>
        <div className='flex-1'>
          <Slider images={imagesArr} />
        </div>
        <div className='flex-1'>
          <Calendar />
        </div>
      </div>

      <h6 className='text-xl font-medium mb-3'>Описание</h6>
      <p className='font-normal text-lg leading-5'>{car?.description}</p>

      <div className='mt-12 flex justify-between'>
        <Link href={DASHBOARD_PAGES.BUSINESS_CARS}>
          <Button
            children={'Назад'}
            className={'px-28 bg-transparent hover:bg-primary hover:text-white'}
          />
        </Link>

        <Link href='/update'>
          <Button
            children={'Изменить'}
            className={'bg-orangeEdit border-none'}
            icon={'/edit-icon.svg'}
          />
        </Link>

        <Button
          children={'Удалить'}
          className={'bg-errorRed border-none text-white'}
          icon={'/delete-icon.svg'}
          onClick={deleteCar}
        />
      </div>
    </div>
  )
}