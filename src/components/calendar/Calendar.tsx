import { useGetAcceptedReservationsByCarId } from "@/services/reservation.service";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CalendarProps {
  carId: string;
}

function stringToDate(dateString: string) {
  const [day, month, year] = dateString.split(".").map(Number);
  return new Date(year, month - 1, day);
}

const Calendar: React.FC<CalendarProps> = ({ carId }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [markedDates, setMarkedDates] = useState<Date[]>([]); // Серые дни
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]); // Заблокированные дни
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Текущий месяц
  const [isMarked] = useState(false);
 
  const { data: reservations } = useGetAcceptedReservationsByCarId(carId);
 
  useEffect(() => {
    if (reservations) {
      const redDays = reservations
        .map((reservation) => {
          const startDate = stringToDate(reservation.start_date);
          const endDate = stringToDate(reservation.end_date);

          const days = [];
          for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            days.push(new Date(d));
          }
          return days;
        })
        .flat();

      setUnavailableDates(redDays); 
    }
  }, [reservations]);

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

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };

  const CaptionLabel = () => <></>;

  return (
    <div className="border-6 border-black rounded-lg">
      <div className="flex flex-col justify-center items-center border-2 border-gray-300 rounded-lg">
        <div className="flex justify-between items-center w-full mb-4">
          <button
            onClick={handlePreviousMonth}
            className="border border-[#3B44FF] text-[#3B44FF] font-light text-sm w-[40px] h-[40px] flex items-center justify-center rounded-lg hover:bg-[#3B44FF] hover:text-white transition-all"
          >
            {"<"}
          </button>
          <span className="text-xl font-bold">
            {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
          </span>
          <button
            onClick={handleNextMonth}
            className="border border-[#3B44FF] text-[#3B44FF] font-light text-sm w-[40px] h-[40px] flex items-center justify-center rounded-lg hover:bg-[#3B44FF] hover:text-white transition-all"
          >
            {">"}
          </button>
        </div>

        <DayPicker
          mode="multiple"
          selected={selectedDates}
          onSelect={setSelectedDates}
          modifiers={{
            marked: markedDates,
            unavailable: unavailableDates, 
            today: new Date(),
          }}
          modifiersClassNames={{
            marked: "bg-gray-400 text-white rounded-full",
            unavailable: "bg-red-500 text-white rounded-full",
            today: "border-2 border-blue-500 rounded-full",
          }}
          classNames={{
            day: "text-center text-gray-700 font-normal m-1",
            cell: "w-10 h-10",
            month_caption: "hidden",
          
          }}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          showOutsideDays={true}
          required={true}
          hideNavigation
          components={{
            CaptionLabel: CaptionLabel,
          }}
        />

        <div className="flex justify-between mt-4 gap-2 w-full">
          <button
            onClick={handleUnavailable}
            className={`border border-[#3B44FF] text-[#3B44FF] font-light text-sm px-2 py-1 rounded transition-all w-1/2 ${
              isMarked ? "bg-[#3B44FF] text-white" : "hover:bg-[#3B44FF] hover:text-white"
            }`}
            style={{ height: "40px" }}
          >
            {"Отметить"}
          </button>

          <button
            onClick={handleRemoveMark}
            className="border border-[#F23434] text-[#F23434] font-light text-sm px-2 py-1 rounded hover:bg-[#F23434] hover:text-white transition-all w-1/2"
            style={{ height: "40px" }}
          >
            Убрать метку
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default Calendar;
