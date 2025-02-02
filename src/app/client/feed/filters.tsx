import PriceRange from '@/components/priceRange/price_range';
import { carBrandData, carClassData, carTransmissionsData } from '@/utils/constants';
import React, { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import "react-range-slider-input/dist/style.css";
const sortOptions = [
  { id: "new", label: "Сначала новые" },
  { id: "prc.a", label: "Сначала дешевле" },
  { id: "prc.d", label: "Сначала дороже" },
  { id: "y.a", label: "Сначала старые" },
  { id: "y.d", label: "Сначала новые" },
];


const Filters = () => {

    const [showAllBrands, setShowAllBrands] = useState(false);
    const [showAllClasses, setShowAllClasses] = useState(false);
    const [sortCriteria, setSortCriteria] = useState<"prc.d" | "prc.a" | undefined>();
    const toggleShowAllBrands = () => setShowAllBrands(!showAllBrands);
    const toggleShowAllClasses = () => setShowAllClasses(!showAllClasses);
  
    return (
      <div>
    
        <div>
          <label className="block text-xl font-medium text-gray-400 mb-2">Сортировать</label>
          <select
                className="border rounded-lg p-2"
                value={sortCriteria || ""}
                onChange={(e) => setSortCriteria(e.target.value as "prc.d" | "prc.a")}
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
        </div>
  
      
        <div>
          <label className="block text-xl font-medium text-gray-400 mt-4">Выберите бренд</label>
          <div className="mt-1 space-y-2">
            {(showAllBrands ? carBrandData : carBrandData.slice(0, 4)).map((brand, index) => (
              <label key={index} className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
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
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 font-medium">{carClass}</span>
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
          <label className="block text-xl font-medium text-gray-400 mt-6">Тип КПП</label>
          <select className="border rounded-lg p-2">
            <option className='font-normal'>Не важно</option>
            {carTransmissionsData.map((transmission, index) => (
              <option key={index} className="font-normal">{transmission}</option>
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
                className=" font-medium w-full pr-10 py-2 text-base border pl-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                placeholder="Не важно"
            />
            </div>
            <div className="w-1/2">
           
            <span className="text-sm font-medium">До</span>
            <input
                type="text"
                className=" font-medium w-full  pr-10 py-2 text-base border pl-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                placeholder="Не важно"
            />
            </div>
        </div>
        </div>


        <div className='mb-10 mt-6'>
        <label className="block text-xl font-medium text-gray-400 mb-4">Выберите диапазон цен</label>
            <RangeSlider />
        </div>
        
       </div>
    );
  };
  
  export default Filters;