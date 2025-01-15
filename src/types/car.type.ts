
export interface Car {
    id: string;
    brand: string;
    model: string;
    class: string;
    transmission: string;
    description: string;
    year: string;
    pricePerDay: number;
    businessId: string;
    previewImage: string;
    status: CarStatus;
    createdAt: Date;
    updatedAt: Date;
    images?: string[];
    totalMileage: number; 
    averageMileage: number;
    averageConsumption: number;
    totalExpenses: number; 
    rating: string; 
    downtimeCoefficient: number;
}

export type CarStatus = 
  | "Бронь" 
  | "Арендовано" 
  | "Свободно" 
  | "Временно недоступно" 
  | "Недоступно";

export interface CarCardProps {
car: Car;
}

export const statusStyles: Record<CarStatus, string> = {
"Бронь": "bg-orange-500 text-white",
"Арендовано": "bg-red-500 text-white",
"Свободно": "bg-green-500 text-white",
"Временно недоступно": "bg-yellow-500 text-white",
"Недоступно": "bg-gray-500 text-white",
};