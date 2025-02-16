import { carBrandData, carClassData, carTransmissionsData } from '@/utils/constants';
import React, { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import "react-range-slider-input/dist/style.css";


interface FiltersProps {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      class?: string;
      brand?: string;
      start_date?: string;
      end_date?: string;
      sort?: "prc.d" | "prc.a";
    }>
  >;
}

const Filters: React.FC<FiltersProps> = ({ setFilters }) => {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllClasses, setShowAllClasses] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<"prc.d" | "prc.a" | undefined>();
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedClass, setSelectedClass] = useState<string | undefined>();

  const toggleShowAllBrands = () => setShowAllBrands(!showAllBrands);
  const toggleShowAllClasses = () => setShowAllClasses(!showAllClasses);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "prc.d" | "prc.a";
    setSortCriteria(value);
    setFilters((prev) => ({ ...prev, sort: value }));
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand); 
    setFilters((prev) => ({
      ...prev,
      brand, 
    }));
  };
  
  const handleClassChange = (carClass: string) => {
    setSelectedClass(carClass); 
    setFilters((prev) => ({
      ...prev,
      class: carClass, 
    }));
  };
  

  return (
    <div>
      <div>
        <label className="block text-xl font-medium text-gray-400 mb-2">Сортировать</label>
        <select className="border rounded-lg p-2" value={sortCriteria || ""} onChange={handleSortChange}>
          <option value="">Без сортировки</option>
          <option value="prc.d">По убыванию цены</option>
          <option value="prc.a">По возрастанию цены</option>
        </select>
      </div>

      <div>
        <label className="block text-xl font-medium text-gray-400 mt-4">Выберите бренд</label>
        <div className="mt-1 space-y-2">
          {(showAllBrands ? carBrandData : carBrandData.slice(0, 4)).map((brand, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={selectedBrand === brand}
                onChange={() => handleBrandChange(brand)}
              />
              <span className="ml-2 font-medium">{brand}</span>
            </label>
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
            <label key={index} className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={selectedClass === carClass}
                onChange={() => handleClassChange(carClass)} 
              />
              <span className="ml-2 font-medium">{carClass}</span>
            </label>
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
        <select className="border rounded-lg p-2">
          <option className="font-normal">Не важно</option>
          {carTransmissionsData.map((transmission, index) => (
            <option key={index} className="font-normal">
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
        <RangeSlider />
      </div>
    </div>
  );
};

export default Filters;
