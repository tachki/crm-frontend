import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";



const PriceRange = () => {
  const [minValue, setMinValue] = useState(20);
  const [maxValue, setMaxValue] = useState(80);

  const handleChange = (values: [number, number]) => {
    setMinValue(values[0]);
    setMaxValue(values[1]);
  };

  return (
    <div className="w-full mt-6">
      <label className="block text-xl font-medium text-gray-400 mt-6">
        Выберите диапазон цены
      </label>
      <RangeSlider
        min={0}
        max={100}
        step={1}
        value={[minValue, maxValue]}
        onInput={handleChange}
        className="w-full"
      />
      <div className="flex justify-between w-full mt-2">
        <span className="text-sm text-gray-700">{minValue} BYN</span>
        <span className="text-sm text-gray-700">{maxValue} BYN</span>
      </div>
    </div>
  );
};

export default PriceRange;
