"use client"

import { IFilters, mapCarDtoToCar } from "@/types/car.type"
import { decodeTokens } from "@/services/auth-token.service"
import emptyParkImage from '@/images/main_page_park/empty_park.png'
import plusIcon from '@/images/main_page_park/plus.png'
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import CarCard from './CarCard'
import Link from 'next/link'
import { useState } from "react"
import { useFilteredCarsByBusiness } from "@/app/client/feed/hooks/useGetCar"
import CarsFilters from '@/components/filters/CarsFilters'
import Image from 'next/image'

export default function CarsFeed() {
	const userStorage = decodeTokens()
	let businessId: string = 'default-business-id'
	if (userStorage && userStorage.business_id !== undefined) {
		businessId = userStorage.business_id
	}

	const [filters, setFilters] = useState<IFilters>({})
	const { data: cars = [], isLoading, error } = useFilteredCarsByBusiness(filters, businessId)

	if (error) {
		return (
			<div className="flex justify-center items-center h-full">
				<p className="text-red-500 text-lg font-medium">Ошибка загрузки данных</p>
			</div>
		)
	}

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
						<>
							{cars.length === 0 ? (
								<div className="flex flex-col items-center justify-center text-center">
									<Image
										src={emptyParkImage.src}
										alt="Нет автомобилей"
										width={550}
										height={350}
										className="mb-4"
									/>
									<p className="text-lg font-medium text-black">
										Добавьте автомобили для их отображения на странице
									</p>
								</div>
							) : (
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
									{cars.map((car) => (
										<CarCard key={car.id} car={mapCarDtoToCar(car)} />
									))}
								</div>
							)}
						</>
					)}
				</div>
			</div>

			<Link href={DASHBOARD_PAGES.CREATE}>
				<div className="fixed bottom-10 right-10 bg-yellow-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
					<Image
						src={plusIcon.src}
						alt="Добавить автомобиль"
						width={18}
						height={18}
					/>
				</div>
			</Link>
		</div>
	)
}
