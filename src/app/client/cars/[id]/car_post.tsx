import { CarDto } from "@/types/car.type";

export const STATIC = "http://localhost:9000/images/"


interface CarPostProps {
    car: CarDto;
  }
  
  export const CarPost: React.FC<CarPostProps> = ({ car }) => {
    return (
      <div className="bg-white shadow-md rounded-2xl p-4 w-80">
        <h2 className="text-lg font-semibold">
          {car.brand} {car.model} ({car.year})
        </h2>
        <div className="flex items-center text-gray-500 text-sm mt-1 space-x-4">
          <span>🚗 {car.class}</span>
          <span>⚙️ {car.transmission}</span>
        </div>
        <img
          src={STATIC + car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-48 object-cover rounded-lg mt-3"
        />
        <div className="flex justify-between items-center mt-4">
          <div className="text-xl font-semibold">{car.price_per_day} BYN/сутки</div>
          <button className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg">
            Арендовать
          </button>
        </div>
      </div>
    );
  };
  