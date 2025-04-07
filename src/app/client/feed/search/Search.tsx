"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import searchIcon from "../../../../images/main_page_park/search.png";
import Image from "next/image";
import { SingleDatePicker } from "@/components/calendar/search/DateSelect";
import { useState } from "react";

export function ChoiseCarForm({ 
  onSearch, 
  initialValues = {} 
}: {
  onSearch: (data: object) => void;
  initialValues?: object;
}) {
  const {
    handleSubmit,
  } = useForm({ defaultValues: initialValues });

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const onSubmit: SubmitHandler<object> = (dataForm) => {
    const searchData = {
      ...dataForm,
      // startDate,
      // endDate
    };
    onSearch(searchData); 
  };

  return (
    <div className="flex justify-center">
      <div className="h-[80px] rounded-full bg-white flex items-center shadow-lg">
      <form className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
         
          <div className="flex flex-col ml-[20px] w-[300px]">
            <label className="font-medium">Откуда</label>
            <input
              type="text"
              placeholder="Город, аэропорт, адрес"
              className="border-0 bg-transparent focus:outline-none placeholder:text-[16px] font-medium mt-2"
             
            />
          </div>

          <div className="w-[1px] h-[50px] bg-black mx-[20px]"></div>

          <div className="flex flex-col rounded-none">
            <label className="font-medium">С какого</label>
            <div className="flex flex-row text-gray-500 mt-2">
              <SingleDatePicker
                selectedDate={startDate}
                onSelect={setStartDate}
                placeholder="Выберите дату"
              />
            </div>
          </div>
          
          <div className="w-[1px] h-[50px] bg-black mx-[20px] ml-20"></div>

          <div className="flex flex-col rounded-none">
            <label className="font-medium">По какое</label>
            <div className="flex flex-row text-gray-500 mt-2">
              <SingleDatePicker
                selectedDate={endDate}
                onSelect={setEndDate}
                placeholder="Выберите дату"
              />
            </div>
          </div>

          <button
            type="submit"
            className="rounded-full bg-[#3B44FF] w-[50px] h-[50px] ml-[160px] mr-5 cursor-pointer flex items-center justify-center hover:bg-[#2a32cc] transition-colors"
          >
            <Image 
              src={searchIcon}
              alt="Search"
              width={23}
              height={23}
              className="text-white"
            />
          </button>
        </form>
      </div>
    </div>
  );
}