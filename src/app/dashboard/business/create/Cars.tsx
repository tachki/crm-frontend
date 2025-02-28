"use client"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { CarService } from "@/services/car.service"
import { carBrandData, carClassData, carTransmissionsData } from "@/utils/constants"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useRef, useState } from "react"
import styles from "./Cars.module.css"

export default function Cars() {
  const router = useRouter()
  const [carBrand, setCarBrand] = useState("")
  const [carModel, setCarModel] = useState("")
  const [carNumber, setCarNumber] = useState("")
  const [carTransmission, setCarTransmission] = useState("")
  const [carClass, setCarClass] = useState("")
  const [carPrice, setCarPrice] = useState(1)
  const [carYear, setCarYear] = useState(2010)
  const [carDescription, setCarDescription] = useState("")
  const [photos, setPhotos] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isFieldPreparing, setIsFieldPreparing] = useState<boolean>(true)

  const createCar = async () => {
    const formData = new FormData()

    formData.append("brand", carBrand)
    formData.append("class", carClass)
    formData.append("description", carDescription)
    formData.append("model", carModel)
    formData.append("price_per_day", carPrice.toString())
    formData.append("transmission", carTransmission)
    formData.append("year", carYear.toString())
    photos.forEach((photo) => {
      formData.append(`image`, photo)
    })

    setIsFieldPreparing(true)
    setCarBrand(() => "")
    setCarModel(() => "")
    setCarNumber(() => "")
    setCarTransmission(() => "")
    setCarClass(() => "")
    setCarPrice(() => 1)
    setCarYear(() => 2010)
    setCarDescription(() => "")
    setPhotos(() => [])

    try {
      const createdCar = await CarService.createCar(formData)
      router.replace(DASHBOARD_PAGES.BUSINESS_CARS)
      console.log("Созданная машина:", createdCar)
    } catch (error) {
      console.error("Ошибка при создании машины:", error)
    }
  }

  const handleCancelAddCar = () => {
    setIsFieldPreparing(true)
    setCarBrand("")
    setCarModel("")
    setCarNumber("")
    setCarTransmission("")
    setCarClass("")
    setCarPrice(0)
    setCarYear(2010)
    setCarDescription("")
    setPhotos([])
  }

  const handleAddCar = () => {
    setIsFieldPreparing(false)
    if (
      carBrand &&
      carModel &&
      carNumber &&
      carTransmission &&
      carClass &&
      carPrice &&
      carYear &&
      carDescription &&
      photos.length
    ) {
      createCar()

    }
  }

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newPhotos = [...photos, ...Array.from(event.target.files)]
      if (newPhotos.length > 8) {
        newPhotos.length = 8
      }
      setPhotos(newPhotos)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files) {
      const newPhotos = [...photos, ...Array.from(event.dataTransfer.files)]
      if (newPhotos.length > 8) {
        newPhotos.length = 8
      }
      setPhotos(newPhotos)
    }
  }

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div>
      <h1 className={styles.h1}>Добавление нового автомобиля</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div
          className={`flex flex-row flex-wrap items-center justify-center gap-4 mb-5 mt-5`}
        >
          <div className={styles.inputWrap}>
            <label className={styles.labelBottom}>Марка</label>
            <select
              className={styles.choiceBottom}
              onChange={(e) => {
                setCarBrand(e.target.value)
              }}
              value={carBrand}
              style={
                (isFieldPreparing || carBrand) === ""
                  ? {
                    backgroundColor: "rgba(255,0,0,0.025)",
                    border: "2px solid red",
                  }
                  : {}
              }
            >
              <option value="">Выберите марку</option>

              {carBrandData.map((carBrand, index) => (
                <option key={carBrand + index} value={carBrand}>
                  {carBrand}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputWrap}>
            <label className={styles.labelBottom}>Модель</label>
            <input
              type="text"
              value={carModel}
              className={`${styles.customInput} mt-2 w-full items-center border-2 border-grey bg-transparent p-4 font-light text-base outline-none placeholder:text-grey placeholder:font-normal duration-500 transition-colors focus:border-primary`}
              placeholder={"Введите модель"}
              onChange={(e) => setCarModel(e.target.value)}
              style={
                (isFieldPreparing || carModel) === ""
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
                setCarYear(Number(e.target.value))
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
          <div className={styles.inputWrap}>
            <label className={styles.labelBottom}>Номерной знак</label>
            <input
              type="text"
              value={carNumber}
              className={`${styles.customInput} mt-2 w-full items-center border-2 border-grey bg-transparent p-4 font-light text-base outline-none placeholder:text-grey placeholder:font-normal duration-500 transition-colors focus:border-primary`}
              placeholder={"Введите номер"}
              onChange={(e) => setCarNumber(e.target.value)}
              style={
                (isFieldPreparing || carNumber) === ""
                  ? {
                    backgroundColor: "rgba(255,0,0,0.025)",
                    border: "2px solid red",
                  }
                  : {}
              }
            />
          </div>
        </div>

        <div
          className={`flex flex-row flex-wrap items-center justify-center gap-4 mb-5 mt-5`}
        >
          <div className={styles.inputWrap}>
            <label className={styles.labelBottom}>Класс</label>
            <select
              className={styles.choiceBottom}
              onChange={(e) => {
                setCarClass(e.target.value)
              }}
              value={carClass}
              style={
                (isFieldPreparing || carClass) === ""
                  ? {
                    backgroundColor: "rgba(255,0,0,0.025)",
                    border: "2px solid red",
                  }
                  : {}
              }
            >
              <option value="">Выберите класс</option>

              {carClassData.map((carClass, index) => (
                <option key={carClass + index} value={carClass}>
                  {carClass}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputWrap}>
            <label className={styles.labelBottom}>Тип КПП</label>
            <select
              className={styles.choiceBottom}
              onChange={(e) => {
                setCarTransmission(e.target.value)
              }}
              value={carTransmission}
              style={
                (isFieldPreparing || carTransmission) === ""
                  ? {
                    backgroundColor: "rgba(255,0,0,0.025)",
                    border: "2px solid red",
                  }
                  : {}
              }
            >
              <option value="">Выберите тип КПП</option>

              {carTransmissionsData.map((carTransmission, index) => (
                <option key={carTransmission + index} value={carTransmission}>
                  {carTransmission}
                </option>
              ))}
            </select>
          </div>

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

        <div className={`${styles.addPhotosContainer}`}>
          <div className={styles.addPhotosTitle}>
            {photos.length === 0 ? (
              <label className={styles.labelBottom}>Загрузите фотографии</label>
            ) : (
              <>
                <label className={styles.labelBottom}>Фотографии</label>
                <label
                  className={`${styles.fontGrayThin} ${styles.imagesCounter}`}
                >
                  Загружено: {photos.length}/8
                </label>
              </>
            )}
          </div>
          <div
            className={styles.addPhotosWrapper}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {photos.length === 0 && (
              <div
                className={styles.addFirstPhotoWrapper}
                style={
                  !isFieldPreparing || photos.length
                    ? {
                      backgroundColor: "rgba(255,0,0,0.025)",
                      border: "2px solid red",
                    }
                    : {}
                }
              >
                <label
                  className={`${styles.labelBottom} ${styles.addPhotoText}`}
                >
                  Выберите или перетащите фотографии в область
                </label>
                <label
                  className={`${styles.fontGrayThin} ${styles.addPhotoText}`}
                >
                  Форматы JPEG, JPG или PNG до 10 МБ каждый
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  multiple
                  ref={fileInputRef}
                  onChange={handleAddPhoto}
                />
                <button
                  className={styles.addPhotoButton}
                  type="button"
                  onClick={openFilePicker}
                >
                  Выбрать фотографии
                </button>
              </div>
            )}
            <div className={styles.photosWrapper}>
              {photos.map((photo, index) => (
                <div key={index} className={styles.photoContainer}>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Фото ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.46484 8.53484L8.53684 1.46484M1.46484 1.46484L8.53684 8.53484"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              {photos.length > 0 && photos.length < 8 && (
                <div className={styles.addMorePhotos} onClick={openFilePicker}>
                  <label>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.3333 8.22222H18.3478M1 5.33333C1 4.18406 1.45655 3.08186 2.2692 2.2692C3.08186 1.45655 4.18406 1 5.33333 1H22.6667C23.8159 1 24.9181 1.45655 25.7308 2.2692C26.5435 3.08186 27 4.18406 27 5.33333V22.6667C27 23.8159 26.5435 24.9181 25.7308 25.7308C24.9181 26.5435 23.8159 27 22.6667 27H5.33333C4.18406 27 3.08186 26.5435 2.2692 25.7308C1.45655 24.9181 1 23.8159 1 22.6667V5.33333Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1 19.7775L8.22222 12.5553C9.56267 11.2654 11.2151 11.2654 12.5556 12.5553L19.7778 19.7775"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.8887 16.8884L18.3331 15.444C19.6736 14.1541 21.326 14.1541 22.6664 15.444L26.9998 19.7773"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </label>
                  <label className={styles.labelBottom}>Добавить</label>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    multiple
                    ref={fileInputRef}
                    onChange={handleAddPhoto}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-6 justify-between flex-wrap">
          <Link href={DASHBOARD_PAGES.BUSINESS_CARS}>
            <button
              className={`${styles.whiteButton}`}
              style={{ margin: "0 auto 0 auto" }}
              onClick={handleCancelAddCar}
            >
              Отменить
            </button>
          </Link>
          <button
            className={`${styles.blueButton}`}
            style={{ margin: "0 auto" }}
            onClick={handleAddCar}
          >
            Создать
          </button>
        </div>
      </form>
    </div>
  )
}
