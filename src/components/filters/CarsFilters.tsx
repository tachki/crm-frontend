import { IFilters } from '@/types/car.type'
import { carBrandData, carClassData, carTransmissionsData } from '@/utils/constants'
import React, { useState } from 'react'
import "react-range-slider-input/dist/style.css"

interface FiltersProps {
	filters: IFilters
	setFilters: React.Dispatch<React.SetStateAction<IFilters>>
}

const CarsFilters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
	const [showAllBrands, setShowAllBrands] = useState(false)
	const [showAllClasses, setShowAllClasses] = useState(false)
	const [sortCriteria, setSortCriteria] = useState<"prc.d" | "prc.a" | undefined>()

	const toggleShowAllBrands = () => setShowAllBrands(!showAllBrands)
	const toggleShowAllClasses = () => setShowAllClasses(!showAllClasses)

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value as "prc.d" | "prc.a"
		setSortCriteria(value)
		setFilters((prev) => ({ ...prev, sort: value }))
	}

	const handleBrandChange = (brand: string) => {
		setFilters((prev) => {
			const updatedBrands = prev.brand?.split(",") || []
			if (updatedBrands.includes(brand)) {
				updatedBrands.splice(updatedBrands.indexOf(brand), 1)
			} else {
				updatedBrands.push(brand)
			}

			return {
				...prev,
				brand: updatedBrands.length > 0 ? updatedBrands.join(",") : "",
			}
		})
	}

	const handleClassChange = (carClass: string) => {
		setFilters((prev) => {
			const updatedClasses = prev.class?.split(",") || []
			if (updatedClasses.includes(carClass)) {
				updatedClasses.splice(updatedClasses.indexOf(carClass), 1)
			} else {
				updatedClasses.push(carClass)
			}

			return {
				...prev,
				class: updatedClasses.length > 0 ? updatedClasses.join(",") : "",
			}
		})
	}

	const handleTransmission = (transmission: string) => {
		setFilters((prev) => ({
			...prev,
			transmission,
		}))
	}

	const handlePriceFrom = (priceFrom: string) => {
		setFilters((prev) => ({
			...prev,
			price_from: priceFrom,
		}))
	}

	const handlePriceTo = (priceTo: string) => {
		setFilters((prev) => ({
			...prev,
			price_to: priceTo,
		}))
	}

	return (
		<div>
			<div>
				<label className="block text-xl font-medium text-gray-400 mb-2">Сортировать</label>
				<select className="border rounded-lg p-2 font-medium" value={sortCriteria || ""} onChange={handleSortChange}>
					<option value="">Без сортировки</option>
					<option value="prc.d">По убыванию цены</option>
					<option value="prc.a">По возрастанию цены</option>
				</select>
			</div>

			<div>
				<label className="block text-xl font-medium text-gray-400 mt-4">Выберите бренд</label>
				<div className="mt-1 space-y-2">
					{(showAllBrands ? carBrandData : carBrandData.slice(0, 4)).map((brand, index) => (
						<div key={brand} className='flex font-medium'>
							<input
								type="checkbox"
								className="form-checkbox mr-2"
								checked={(filters.brand || "").split(',').includes(brand)}
								onChange={() => handleBrandChange(brand)}
								id={brand}
							/>
							<label htmlFor={brand} key={index}>{brand}</label>
						</div>
					))}
					<button
						onClick={toggleShowAllBrands}
						className="text-xs font-medium text-blue-500 hover:text-blue-700 underline"
					>
						{showAllBrands ? "Скрыть" : "Показать все"}
					</button>
				</div>
			</div>

			<div>
				<label className="block text-xl font-medium text-gray-400 mt-6">Выберите класс</label>
				<div className="mt-1 space-y-2">
					{(showAllClasses ? carClassData : carClassData.slice(0, 4)).map((carClass, index) => (
						<div key={carClass} className='flex font-medium'>
							<input
								type="checkbox"
								className="form-checkbox mr-2"
								checked={(filters.class || "").split(",").includes(carClass)}
								onChange={() => handleClassChange(carClass)}
								id={carClass}
							/>
							<label key={index} htmlFor={carClass}>{carClass}</label>
						</div>
					))}
					<button
						onClick={toggleShowAllClasses}
						className="text-xs font-medium text-blue-500 hover:text-blue-700 underline"
					>
						{showAllClasses ? "Скрыть" : "Показать все"}
					</button>
				</div>
			</div>


			<div>
				<label className="block text-xl font-medium text-gray-400 mt-6">Тип КПП</label>
				<select
					className="border rounded-lg p-2 font-medium"
					value={filters.transmission || ""}
					onChange={(e) => handleTransmission(e.target.value)}
				>
					<option value="" className="font-normal">Не важно</option>
					{carTransmissionsData.map((transmission, index) => (
						<option key={index} value={transmission} className="font-normal">
							{transmission}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className="block text-xl font-medium text-gray-400 mt-6">Год выпуска</label>
				<div className="mt-1 flex space-x-2">
					<div className="w-1/2">
						<span className="text-sm font-medium">От</span>
						<input
							type="text"
							className="font-medium w-full border pl-2 py-2 rounded-md"
							placeholder="Не важно"
						/>
					</div>
					<div className="w-1/2">
						<span className="text-sm font-medium">До</span>
						<input
							type="text"
							className="font-medium w-full border pl-2 py-2 rounded-md"
							placeholder="Не важно"
						/>
					</div>
				</div>
			</div>

			<div className="mb-10 mt-6">
				<label className="block text-xl font-medium text-gray-400 mb-4">Выберите диапазон цен</label>
				<div className="mt-1 flex space-x-2">
					<div className="w-1/2">
						<span className="text-sm font-medium">От</span>
						<input
							type="text"
							className="font-medium w-full border pl-2 py-2 rounded-md"
							placeholder="Не важно"
							onBlur={(e) => handlePriceFrom(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.currentTarget.blur()
								}
							}}
						/>
					</div>
					<div className="w-1/2">
						<span className="text-sm font-medium">До</span>
						<input
							type="text"
							className="font-medium w-full border pl-2 py-2 rounded-md"
							placeholder="Не важно"
							onBlur={(e) => handlePriceTo(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.currentTarget.blur()
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CarsFilters
