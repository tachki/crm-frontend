import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { FiChevronDown } from "react-icons/fi";

interface SingleDatePickerProps {
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  placeholder?: string;
  unavailableDates?: Date[];
}

export const SingleDatePicker = ({
  selectedDate,
  onSelect,
  placeholder = "Выберите дату",
  unavailableDates = [],
}: SingleDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <span className="font-medium">
        {selectedDate ? selectedDate.toLocaleDateString("ru-RU") : placeholder}
        </span>
        <FiChevronDown className="ml-1 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg p-4 "> 
            <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
                onSelect(date);
                setIsOpen(false);
            }}
            modifiers={{
                unavailable: unavailableDates,
                today: new Date(),
            }}
            modifiersClassNames={{
                unavailable: "bg-red-100 text-red-500 line-through",
                today: "border border-blue-500",
                selected: "bg-blue-500 text-white",
            }}

            month={currentMonth}
            onMonthChange={setCurrentMonth}
            showOutsideDays
            required
            hideNavigation
            />
        </div>
      )}
    </div>
  )
}