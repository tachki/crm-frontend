import React from "react";
import { CLIENT_PAGES, STATIC_URL } from "@/config/pages-url.config"
import classIcon from '../../../images/client/car_post_icons/class_icon.png';
import typeIcon from '../../../images/client/car_post_icons/type_icon.png';
import Link from "next/link";

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
     
        <div className="flex items-center">
          <img
            src={classIcon.src} 
            alt="Car Class"
            className="w-3 h-3 mr-2"
          />
          {car.class}
        </div>


        <div className="flex items-center">
          <img
            src={typeIcon.src}  
            alt="Transmission"
            className="w-3 h-3 mr-2"
          />
          {car.transmission}
        </div>
      </div>
      <img
        src={STATIC_URL + car.preview_image}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-48 object-cover rounded-lg mt-3"
      />
      <div className="flex justify-between items-center mt-4">
        <div className="text-xl font-medium">{car.price_per_day} BYN/сутки</div>
        <button className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg">
          <Link href={`${CLIENT_PAGES.FEED}/${car.id}`}>
            Арендовать
          </Link>
        </button>
      </div>
    </div>
  );
};

export default CarCard;
