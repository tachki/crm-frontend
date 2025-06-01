import { useGetAcceptedReservationsByCarId } from "@/services/reservation.service";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CalendarProps {
  carId: string;
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void; 
  onClearDates: () => void;
}

function stringToDate(dateString: string) {
  const [day, month, year] = dateString.split(".").map(Number);
  return new Date(year, month - 1, day);

}

const ClientCalendar: React.FC<CalendarProps> = ({
  carId,
  selectedDates,
  setSelectedDates,
  onClearDates,
}) => {
  const [markedDates, setMarkedDates] = useState<Date[]>([]); 
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { data: reservations } = useGetAcceptedReservationsByCarId(carId);

  useEffect(() => {
    if (reservations) {
      const redDays = reservations
        .map((reservation) => {
          const startDate = stringToDate(reservation.start_date);
          const endDate = stringToDate(reservation.end_date);
          const days = [];
          for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            days.push(new Date(d));
          }
          return days;
        })
        .flat();
      setUnavailableDates(redDays);
    }
  }, [reservations]);

  useEffect(() => {
    if (selectedDates.length === 2) {
      const [start, end] = selectedDates[0] < selectedDates[1] ? selectedDates : [selectedDates[1], selectedDates[0]];
      const range = [];
      const current = new Date(start);
      current.setDate(current.getDate() + 1); 
      while (current < end) {
        range.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      setMarkedDates(range);
    } else {
      setMarkedDates([]);
    }
  }, [selectedDates]);

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

    if (selectedDates.length === 0) {
      setSelectedDates([date]);
    } else if (selectedDates.length === 1) {
      const firstDate = selectedDates[0];
      if (date < firstDate) {
        setSelectedDates([date, firstDate]);
      } else {
        setSelectedDates([firstDate, date]);
      }
    } else {
      setSelectedDates([date]);
    }
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
    <div className="border-2 border-black rounded-lg max-w-md ">
      <div className="relative flex flex-col items-center border border-gray-300 rounded-lg p-4">
  <button
    onClick={handlePreviousMonth}
    className="absolute left-4 top-2 text-2xl text-[#3B44FF] hover:text-blue-700 transition"
    aria-label="Previous Month"
  >
    {"<"}
  </button>
  <button
    onClick={handleNextMonth}
    className="absolute right-4 top-2 text-2xl text-[#3B44FF] hover:text-blue-700 transition"
    aria-label="Next Month"
  >
    {">"}
  </button>

  <div className="mb-4 text-xl font-medium select-none">
    {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
  </div>

  <DayPicker
    mode="range"
    selected={selectedDates.length > 0 ? { from: selectedDates[0], to: selectedDates[1] } : undefined}
    onSelect={(range) => {
      if (range?.from && range?.to) {
        setSelectedDates([range.from, range.to]);
      } else if (range?.from) {
        setSelectedDates([range.from]);
      } else {
        setSelectedDates([]);
      }
    }}
    disabled={[{ before: new Date() }, ...unavailableDates]}
    modifiers={{
      unavailable: unavailableDates,
      today: new Date(),
      marked: markedDates,
      disabled: unavailableDates,
    }}
    modifiersClassNames={{
      marked: "bg-gray-400 text-white rounded-full",
      disabled: "bg-red-300 text-white rounded-full cursor-not-allowed",
      selected: "bg-blue-600 text-white",
      range_start: "rounded-l-md",
      range_end: "rounded-r-md",
      range_middle: "bg-blue-150 bg-opacity-50",
      unavailable: "bg-red-500 text-white opacity-70 cursor-not-allowed",
      today: "border border-blue-500 font-semibold",
    }}
    classNames={{
      day: "text-center text-gray-700 font-normal m-0 cursor-pointer select-none",
      cell: "w-10 h-10 p-0 relative",
      month_caption: "hidden",
    }}
    
    month={currentMonth}
    onMonthChange={setCurrentMonth}
    showOutsideDays
    hideNavigation
    components={{ CaptionLabel }}
  />
</div>

    </div>
  );
};


export default ClientCalendar;
