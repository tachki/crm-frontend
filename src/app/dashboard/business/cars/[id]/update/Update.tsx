"use client";
import styles from "./Update.module.css";
import { useEffect, useRef, useState } from "react";
import { CarService } from "@/services/car.service";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";
import { useCar } from "../../hooks/useCar";

export default function Update() {
  const router = useRouter();
  const { id } = useParams()
  const carId = Array.isArray(id) ? id.join('') : id || ''
  const { data, isLoading } = useCar(carId)
  const [carPrice, setCarPrice] = useState(1);
  const [carDescription, setCarDescription] = useState('!!')
  const [carYear, setCarYear] = useState(1);

  const [isFieldPreparing, setIsFieldPreparing] = useState<boolean>(true);

  useEffect(()=> {
      if(!isLoading) {
          setCarPrice(()=>data?.data.car.price_per_day)
          setCarYear(()=>data?.data.car.year)
          setCarDescription(()=>data?.data.car.description)
      }
  }, [isLoading])

  const updateCar = async () => {
    const carData = {
      description: carDescription,
      price_per_day: carPrice,
      year: carYear.toString()
    };

    const carDataJson = JSON.stringify(carData)

    try {
      const createdCar = await CarService.updateCar(carId, carDataJson);
      router.replace(`${DASHBOARD_PAGES.BUSINESS_CARS}/${id}`);
      console.log("Обновленная машина:", createdCar);
    } catch (error) {
      console.error("Ошибка при обновлении машины:", error);
    }
  };

  const handleCancelAddCar = () => {
    setIsFieldPreparing(true);
    setCarPrice(0);
    setCarDescription("");
    setCarYear(2010);
  };

  const handleUpdateCar = () => {
    setIsFieldPreparing(false);
    if (
      carPrice &&
      carDescription &&
      carYear
    ) {
        updateCar();
    }
  };

  return (
    <div>
      <h1 className={styles.h1}>
        Редактирование авто <br /> {data?.data.car.brand} {data?.data.car.model}{" "}
        ({data?.data.car.year}) <span></span>{" "}
        {data?.data.car.class === "Эконом класс"
          ? "Эконом"
          : data?.data.car.class}{" "}
        <span></span>{" "}
        {data?.data.car.transmission === "Автоматическая"
          ? "Автомат"
          : data?.data.car.transmission}
      </h1>
      <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
      >
        <div className={`flex flex-row flex-wrap items-center gap-4 mb-5 mt-5`}>
          <div className={styles.inputWrap}>
            <label className={styles.labelBottom}>Цена (BYN в сутки)</label>
            <input
                type="number"
                value={carPrice}
                placeholder={"Введите цену"}
                className={`${styles.customInput} mt-2 w-full items-center border-2 border-grey bg-transparent p-4 font-light text-base outline-none placeholder:text-grey placeholder:font-normal duration-500 transition-colors focus:border-primary`}
                onChange={(e) => {
                  if (Number(e.target.value) < 1) {
                    e.target.value = "1";
                  }
                  setCarPrice(Number(e.target.value));
                }}
                style={
                  (isFieldPreparing || carPrice) === 1
                      ? {
                        backgroundColor: "rgba(255,0,0,0.025)",
                        border: "2px solid red",
                      }
                      : {}
                }
            />
          </div>
          <div className={styles.inputWrap}>
            <label className={styles.labelBottom}>Год выпуска</label>
            <input
                type="number"
                value={carYear}
                className={`${styles.customInput} mt-2 w-full items-center border-2 border-grey bg-transparent p-4 font-light text-base outline-none placeholder:text-grey placeholder:font-normal duration-500 transition-colors focus:border-primary`}
                onChange={(e) => {
                  if (Number(e.target.value) < 1) {
                    e.target.value = "1";
                  } else if (Number(e.target.value) > 2025) {
                    e.target.value = "2025";
                  }
                  setCarYear(Number(e.target.value));
                }}
                style={
                  (isFieldPreparing || carYear) === 1
                      ? {
                        backgroundColor: "rgba(255,0,0,0.025)",
                        border: "2px solid red",
                      }
                      : {}
                }
            />
          </div>
        </div>

        <div className={styles.contentText}>
          <label className={styles.labelBottom}>Описание</label>
          <textarea
              value={carDescription}
              placeholder="Введите описание"
              onChange={(e) => setCarDescription(e.target.value)}
              style={
                (isFieldPreparing || carDescription) === ""
                    ? {
                      backgroundColor: "rgba(255,0,0,0.025)",
                      border: "2px solid red",
                    }
                    : {}
              }
          ></textarea>
        </div>
        <div className="flex flex-row gap-6 justify-between m-0 flex-wrap">
          <Link href={`${DASHBOARD_PAGES.BUSINESS_CARS}/${carId}`}>
            <button
                className={`${styles.whiteButton}`}
                onClick={handleCancelAddCar}
            >
              Отменить
            </button>
          </Link>
          <button className={`${styles.blueButton}`} onClick={handleUpdateCar}>
            Обновить
          </button>
        </div>
      </form>
    </div>
  );
}
