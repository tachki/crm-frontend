import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./Calendar.css"; // Импортируем ваш CSS-файл

interface CalendarProps {
  carId: string; 
}

const Calendar: React.FC<CalendarProps> = ({ carId }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [markedDates, setMarkedDates] = useState<Date[]>([]); // серые дни
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]); // недоступные дни
  const [reservations, setReservations] = useState<any[]>([]); // резервированные дни
  const [currentMonth, setCurrentMonth] = useState(new Date()); // текущий месяц

  useEffect(() => {
    const getReservations = async () => {
      // Подставьте свой API запрос с carId
      // const fetchedReservations = await fetchReservations(carId);
      // setReservations(fetchedReservations);
    };
    getReservations();
  }, [carId]);

  useEffect(() => {
    if (reservations.length === 0) return;

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

    if (selectedDates.length > 3) {
      alert("Нельзя отмечать более 3 дней подряд");
      return;
    }

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

  // кастомизировать лейбл календаря
  const CaptionLabel = () => <></>;

  return (
    <div className="border-2 border-black rounded-lg">
      <div className="flex flex-col justify-center items-center border-2 border-gray-300 rounded-lg">
        <div className="flex justify-between items-center w-full mb-4">
          <button
            onClick={handlePreviousMonth}
            className="border border-[#3B44FF] text-[#3B44FF] font-light text-sm w-[40px] h-[40px] flex items-center justify-center rounded-lg hover:bg-[#3B44FF] hover:text-white transition-all"
          >
            {"<"}
          </button>
          <span className="text-xl font-normal">
            {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
          </span>
          <button
            onClick={handleNextMonth}
            className="border border-[#3B44FF] text-[#3B44FF] font-light text-sm w-[40px] h-[40px] flex items-center justify-center rounded-lg hover:bg-[#3B44FF] hover:text-white transition-all"
          >
            {">"}
          </button>
        </div>

        {/* Календарь */}
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
            today: "border border-blue-500 rounded-full",
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
    </div>
  );
};

export default Calendar;
