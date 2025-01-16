import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

//TODO временно пока нет основного сервиса
const fetchReservations = async () => {
    //сюда ключик бы
  const response = await fetch("http://localhost:8081/v1/cars/reservations/1");
  const data = await response.json();
  return data.reservations;
};

const Calendar: React.FC = () => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [markedDates, setMarkedDates] = useState<Date[]>([]); // Серые дни
    const [unavailableDates, setUnavailableDates] = useState<Date[]>([]); // Недоступные дни
    const [reservations, setReservations] = useState<any[]>([]); // Резервированные дни
  
    useEffect(() => {
      const getReservations = async () => {
        const fetchedReservations = await fetchReservations(); 
        setReservations(fetchedReservations);
      };
      getReservations();
    }, []);
  
    useEffect(() => {
   
      const redDays = reservations
        .map((reservation) => {
          const startDate = new Date(reservation.start_date);
          const endDate = new Date(reservation.end_date);
  
          const days = [];
          for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            days.push(new Date(d)); 
          }
          return days;
        })
        .flat();
  
      setUnavailableDates(redDays);
    }, [reservations]);
  
    const handleMarkDate = () => {
      if (!selectedDates.length) return; 
      setMarkedDates((prev) =>
        Array.from(new Set([...prev, ...selectedDates.map((date) => new Date(date))]))
      );
      setSelectedDates([]); 
    };
  
    const handleRemoveMark = () => {
      if (!selectedDates.length) return;
      setMarkedDates((prev) =>
        prev.filter(
          (markedDate) =>
            !selectedDates.some(
              (selectedDate) => markedDate.toDateString() === selectedDate.toDateString()
            )
        )
      );
      setSelectedDates([]); 
    };
  
    const handleUnavailable = () => {
      if (!selectedDates.length) return; 
      setUnavailableDates((prev) =>
        Array.from(new Set([...prev, ...selectedDates.map((date) => new Date(date))]))
      );
      setSelectedDates([]); 
    };
  
    return (
        <div
        className="flex flex-col justify-center items-center mt-4"
        style={{ height: "auto" }}
      >
        <DayPicker
          mode="multiple"
          selected={selectedDates}
          onSelect={setSelectedDates}
          modifiers={{
            marked: markedDates,
            unavailable: unavailableDates,
          }}
          modifiersClassNames={{
            marked: "bg-gray-400 text-white font-light",
            unavailable: "bg-red-500 text-white font-light",
          }}
          className="custom-calendar"
          classNames={{
            caption: "text-xl font-bold",
            day: "text-center",
          }}
          showOutsideDays={true}
          required={true}
        />
      
      <div className="flex justify-between mt-4 gap-2 w-full">
        <button
            onClick={handleMarkDate}
            className="border border-[#3B44FF] text-[#3B44FF] font-light text-sm px-2 py-1 rounded hover:bg-[#3B44FF] hover:text-white transition-all w-1/3"
            style={{ height: "40px" }}
        >
            Отметить
        </button>
        <button
            onClick={handleRemoveMark}
            className="border border-[#F23434] text-[#F23434] font-light text-sm px-2 py-1 rounded hover:bg-[#F23434] hover:text-white transition-all w-1/3"
            style={{ height: "40px" }}
        >
            Убрать метку
        </button>
        <button
            onClick={handleUnavailable}
            className="border border-[#F6C61A] text-[#F6C61A] font-light text-sm px-2 py-1 rounded hover:bg-[#F6C61A] hover:text-white transition-all w-1/3"
            style={{ height: "40px" }}
        >
            Недоступно
        </button>
        </div>

      </div>
      
    );
  };
  

export default Calendar;
