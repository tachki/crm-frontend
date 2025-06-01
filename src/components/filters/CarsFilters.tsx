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
			<label className="block text-xl font-semibold text-gray-700 mb-2">Сортировка</label>
			<select
				className="w-full border border-gray-300 rounded-md px-3 py-2 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
				value={sortCriteria || ""}
				onChange={handleSortChange}
			>
				<option value="">Без сортировки</option>
				<option value="prc.d">По убыванию цены</option>
				<option value="prc.a">По возрастанию цены</option>
			</select>
			</div>


			<div>
				<label className="block text-xl font-semibold text-gray-700 mt-4">Выберите бренд</label>
				<div className="mt-1 space-y-2">
				{(showAllBrands ? carBrandData : carBrandData.slice(0, 4)).map((brand) => (
				<label key={brand} className="flex items-center space-x-2 cursor-pointer hover:text-blue-500">
					<input
					type="checkbox"
					className="accent-blue-500"
					checked={(filters.brand || "").split(",").includes(brand)}
					onChange={() => handleBrandChange(brand)}
					/>
					<span className="text-sm font-medium text-gray-800">{brand}</span>
				</label>
				))}
				<button
				onClick={toggleShowAllBrands}
				className="text-sm font-medium text-blue-600 hover:underline mt-1"
				>
				{showAllBrands ? "Скрыть" : "Показать все"}
				</button>

				</div>
			</div>

			<div>
				<label className="block text-xl font-semibold text-gray-700 mt-6">Выберите класс</label>
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
						className="text-sm font-medium text-blue-600 hover:underline mt-1"
					>
						{showAllClasses ? "Скрыть" : "Показать все"}
					</button>
				</div>
			</div>


			<div>
			<label className="block text-lg font-semibold text-gray-700 mb-2 mt-4">Тип КПП</label>
			<select
				className="w-full border border-gray-300 rounded-md px-3 py-2 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
				value={filters.transmission || ""}
				onChange={(e) => handleTransmission(e.target.value)}
			>
				<option value="">Не важно</option>
				{carTransmissionsData.map((transmission) => (
				<option key={transmission} value={transmission}>
					{transmission}
				</option>
				))}
			</select>
			</div>

			<div>
			<label className="block text-lg font-semibold text-gray-700 mb-2 mt-4">Диапазон цен</label>
			<div className="flex space-x-2">
				<input
				type="text"
				placeholder="От"
				className="w-1/2 border border-gray-300 rounded-md px-3 py-2 font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				onBlur={(e) => handlePriceFrom(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
				/>
				<input
				type="text"
				placeholder="До"
				className="w-1/2 border border-gray-300 rounded-md px-3 py-2 font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				onBlur={(e) => handlePriceTo(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
				/>
			</div>
			</div>

		</div>
	)
}

export default CarsFilters
