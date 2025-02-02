import React from "react";

interface CarCardProps {
  car: {
    id: string;
    brand: string;
    model: string;
    year: string;
    class: string;
    transmission: string;
    preview_image: string;
    price_per_day: number;
  };
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div key={car.id} className="bg-white shadow-md rounded-2xl p-4">
      <h2 className="text-lg font-semibold">
        {car.brand} {car.model} ({car.year})
      </h2>
      <div className="flex items-center text-gray-400 text-sm mt-1 space-x-4 font-light">
        <span>🚗 {car.class}</span>
        <span>⚙️ {car.transmission}</span>
      </div>
      <img
        src={car.preview_image}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-48 object-cover rounded-lg mt-3"
      />
      <div className="flex justify-between items-center mt-4">
        <div className="text-xl font-medium">{car.price_per_day} BYN/сутки</div>
        <button className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg">
          Арендовать
        </button>
      </div>
    </div>
  );
};

export default CarCard;
