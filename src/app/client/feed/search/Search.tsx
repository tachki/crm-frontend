"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCarForm } from "../../../../store/slice/iCarFormSlice";
import searchIcon from "../../../../images/main_page_park/search.png"; 
import Image from "next/image";

export function ChoiseCarForm() {
  const { senData } = useCarForm();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const data = ["12.12.2024", "13.12.2024", "14.12.2024"];
  const time = ["12:20", "12:21"];
 

  const onSubmit: SubmitHandler<any> = (dataForm) => {
    reset();
    if (!dataForm) {
      console.log("Ошибка");
    } else {
      senData(dataForm);
      console.log(dataForm);
    }
  };

  return (
    <div className="bg-gray-200 h-screen">
      <div className="flex justify-center pt-[50px]">
        <div className="w-[900px] h-[80px] rounded-full bg-white flex items-center">
          <form className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col ml-[20px] w-[300px]">
              <label className="font-bold">Откуда</label>
              <input
                type="text"
                placeholder="Город, аэропорт, адрес"
                className="border-0 bg-transparent focus:outline-none text-sm font-medium"
                {...register("place", { required: "Введите место!" })}
              />
              {errors.place && typeof errors.place.message === "string" && (
                <p className="text-red-500 text-sm">{errors.place.message}</p>
              )}
            </div>

            <div className="w-[2px] h-[50px] bg-black mx-[20px]"></div>
            <div className="flex flex-col rounded-none">
              <label>С какого</label>
              <div>
                <select
                  className="border-none"
                  {...register("dataRes", { required: "Дата обязательна!" })}
                >
                  {data.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.dataRes &&
                  typeof errors.dataRes.message === "string" && (
                    <p className="text-red-500 text-sm">
                      {errors.dataRes.message}
                    </p>
                  )}
                <select
                  className="ml-[20px] border-none"
                  {...register("timeRes", { required: "Время обязательно!" })}
                >
                  {time.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.timeRes && errors.timeRes.message === "string" && (
                  <p className="text-red-500 text-sm">
                    {errors.timeRes.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-[2px] h-[50px] bg-black mx-[20px]"></div>
            <div>
              <div className="flex flex-col rounded-none">
                <label>По какое</label>
                <div>
                  <select
                    className="border-none"
                    {...register("dataRet", { required: "Дата обязательна!" })}
                  >
                    {data.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  {errors.dataRet && errors.dataRet.message === "string" && (
                    <p className="text-red-500 text-sm">
                      {errors.dataRet.message}
                    </p>
                  )}
                  <select
                    className="ml-[20px] border-none"
                    {...register("timeRet", { required: "Время обязательно!" })}
                  >
                    {time.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  {errors.timeRet && errors.timeRet.message === "string" && (
                    <p className="text-red-500 text-sm">
                      {errors.timeRet.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <button
            type="submit"
            className="rounded-full bg-violet-700 w-[50px] h-[50px] ml-[100px] cursor-pointer flex items-center justify-center"
        >
            <Image 
            src={searchIcon}
            alt="Search"
            width={20}
            height={20}
            className="text-white"
            />
        </button>
          </form>
        </div>
      </div>
      
    </div>
  );
}