'use client'
import { useParams } from 'next/navigation'
import { useCar } from '../hooks/useCar'
import { Button } from '@/components/buttons/Button'
import Link from 'next/link'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import Calendar from '@/components/calendar/Calendar'


export default function Car() {
  const { id } = useParams()
  const carId = Array.isArray(id) ? id.join('') : id || ''

  const { data, isLoading } = useCar(carId)

  return (
    <div>
      <h1 className="font-bold text-5xl text-center">
        {data?.data.brand}
      </h1>

      <div className='flex text-2xl justify-center mt-6'>
        <h4>{data?.data.model}</h4>
        <div className='px-3 font-light'> | </div>
        <h4>{data?.data.class}</h4>
        <div className='px-3 font-light'> | </div>
        <h4>{data?.data.transmission}</h4>
      </div>

      <div className='flex mt-16 mb-12 gap-24'>
        <div className='flex-1'>
          {/* Галерея */}
        </div>
        <div className='flex-1'>
          
        </div>
      </div>

      <h6 className='text-xl font-medium mb-3'>Описание</h6>
      <p className='font-normal text-lg leading-5'>{data?.data.description}</p>

      <div className='mt-12 flex justify-between'>
      <Link href={DASHBOARD_PAGES.BUSINESS_CARS}>
        <Button
          children={'Назад'}
          className={'px-28 bg-transparent hover:bg-primary hover:text-white'}
        />
        </Link>
        <Link href={`${DASHBOARD_PAGES.CAR_DETAILS.replace('[id]', carId)}/update`}>
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
        />
      </div>
    </div>
  )
}