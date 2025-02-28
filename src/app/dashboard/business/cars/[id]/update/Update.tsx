"use client"

import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { CarService } from "@/services/car.service"
import Link from "next/link"
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { useCar } from "../../hooks/useCar"
import styles from "./Update.module.css"

export default function Update() {
  const router = useRouter()
  const { id } = useParams()
  const carId = Array.isArray(id) ? id.join('') : id || ''
  const { data, isLoading } = useCar(carId)
  const [carPrice, setCarPrice] = useState<number | undefined>(0)
  const [carDescription, setCarDescription] = useState<string | undefined>("")
  const [carYear, setCarYear] = useState<string | undefined>("2025")

  const [isFieldPreparing, setIsFieldPreparing] = useState<boolean>(true)

  useEffect(() => {
    if (!isLoading) {
      setCarPrice(data?.price_per_day)
      setCarYear(data?.year)
      setCarDescription(data?.description)
    }
  }, [isLoading, data?.description, data?.price_per_day, data?.year])

  const updateCar = async () => {
    const carData = {
      description: carDescription,
      price_per_day: carPrice,
      year: carYear?.toString()
    }

    const carDataJson = JSON.stringify(carData)

    try {
      await CarService.updateCar(carId, carDataJson)
      router.replace(`${DASHBOARD_PAGES.BUSINESS_CARS}/${id}`)
    } catch (error) {
      console.error("Ошибка при обновлении машины:", error)
    }
  }

  const handleUpdateCar = () => {
    setIsFieldPreparing(false)
    if (
      carPrice &&
      carDescription &&
      carYear
    ) {
      updateCar()
    }
  }

  return (
    <div>
      <h1 className={styles.h1}>
        Редактирование авто <br /> {data?.brand} {data?.model}{" "}
        ({data?.year}) <span></span>{" "}
        {data?.class === "Эконом класс"
          ? "Эконом"
          : data?.class}{" "}
        <span></span>{" "}
        {data?.transmission === "Автоматическая"
          ? "Автомат"
          : data?.transmission}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
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
                  e.target.value = "1"
                }
                setCarPrice(Number(e.target.value))
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
                  e.target.value = "1"
                } else if (Number(e.target.value) > 2025) {
                  e.target.value = "2025"
                }
                setCarYear(e.target.value)
              }}
              style={
                (isFieldPreparing || Number(carYear)) === 1
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
  )
}
