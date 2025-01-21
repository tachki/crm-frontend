'use client'

import { useParams } from 'next/navigation'
import { useCar } from '../hooks/useCar'
import { Loader } from 'lucide-react'
import { ICar } from '@/types/car.type'
import { Button } from '@/components/buttons/Button'
import Link from 'next/link'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'

export const CarItem: ICar = {
  brand: "Toyota",
  business_id: "123e4567-e89b-12d3-a456-426614174000",
  class: "SUV",
  created_at: "2023-01-01T00:00:00.000Z",
  description: "Toyota RAV4 — это современный кроссовер, сочетающий стильный дизайн, высокую производительность и надежность. Оснащён вместительным салоном, подходящим как для городских поездок, так и для дальних путешествий. Система полного привода обеспечивает уверенность на дорогах в любых погодных условиях. Автомобиль выделяется низким расходом топлива и передовыми технологиями, такими как мультимедийная система с сенсорным экраном, адаптивный круиз-контроль и функции помощи водителю. RAV4 2020 года идеально подходит для семей и активного образа жизни.",
  id: "abc123-def456-ghi789",
  model: "RAV4",
  price_per_day: 100,
  transmission: "Automatic",
  updated_at: "2024-01-15T00:00:00.000Z",
  year: "2020",
}


export default function Car() {
  const { id } = useParams()
  const carId = Array.isArray(id) ? id.join('') : id || ''

  const { data, isLoading } = useCar(carId)

  return (
    <div>
      {/* {isLoading ?
        <Loader /> : (
          <h1 className="font-bold text-5xl">
            {data?.data.brand}
          </h1>
        )} */}

      <h1 className="font-bold text-5xl text-center">
        {CarItem.brand}
      </h1>

      <div className='flex text-2xl justify-center mt-6'>
        <h4 className=''>{CarItem.model}</h4>
        <div className='px-3 font-light'> | </div>
        <h4 className=''>{CarItem.class}</h4>
        <div className='px-3 font-light'> | </div>
        <h4 className=''>{CarItem.transmission}</h4>
      </div>

      <div className='flex mt-16 mb-12'>
        {/* ГАЛЕРЕЯ */}
        {/* КАЛЕНДАРЬ */}
      </div>

      <h6 className='text-xl font-medium mb-3'>Описание</h6>
      <p className='font-normal text-lg leading-5'>{CarItem.description}</p>

      <div className='mt-12 flex justify-between'>
        <Button
          children={'Назад'}
          className={'px-28 bg-transparent hover:bg-primary hover:text-white'} />
        <Link href={DASHBOARD_PAGES.BUSINESS_CARS}>
          <Button
            children={'Изменить'}
            className={'bg-orangeEdit border-none'}
            icon={'/edit-icon.svg'} />
        </Link>
        <Button
          children={'Удалить'}
          className={'bg-errorRed border-none text-white'}
          icon={'/delete-icon.svg'} />
      </div>
    </div>
  )
}