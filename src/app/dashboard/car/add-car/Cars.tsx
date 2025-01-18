"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { IСhoiceCar } from "@/types/auth.type";
import styles from "./Cars.module.css";
import { useAppDispatch } from "@/hooks/redux";
import { setCar } from "@/store/slice/isCarSlice";
import { Field } from "@/components/fields/Field";
import { useEffect, useState } from "react";
export default function Cars() {
  const carTransmissionsData = ['Автоматическая', 'Механическая' ]
  const carClassData = [ 'Эконом класс', 'Бизнес класс', 'Внедорожники', 'Грузовые микроавтобусы', 'Кабриолеты', 'Купе', 'Лимузины', 'Микроавтобусы', 'Мотоциклы', 'Пассажирские микроавтобусы', 'Универсалы' ]

  const [carBrand, setCarBrand] = useState('')
  const [carTransmission, setCarTransmission] = useState('')
  const [carClass, setCarClass] = useState('')

  useEffect(()=> {
    console.log('brand', carBrand)
    console.log('carTransmission', carTransmission)
    console.log('carClass', carClass)

  }, [carBrand, carTransmission, carClass])

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IСhoiceCar>();
  const [photos, setPhotos] = useState<File[]>([]);

  const onSubmit: SubmitHandler<IСhoiceCar> = (data) => {
    reset();
    if (!data) {
      console.log("Ошибка");
    } else {
      dispatch(setCar(data));
      console.log(data);
    }
  };

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newPhotos = [...photos, ...Array.from(event.target.files)];
      if (newPhotos.length > 8) {
        newPhotos.length = 8;
      }
      setPhotos(newPhotos);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const newPhotos = [...photos, ...Array.from(event.dataTransfer.files)];
      if (newPhotos.length > 8) {
        newPhotos.length = 8;
      }
      setPhotos(newPhotos);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className={styles.h1}>Добавление нового автомобиля</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`flex flex-row flex-wrap items-center justify-center gap-4 mb-5 mt-5`}
        >
          <div className="flex flex-col">
            <label className={styles.labelTop}>Марка</label>
            <select
              className={styles.choice}
              {...register("stamp", { required: "Марка обязательна" })}
            >
              <option value="">Выберите марку</option>
              <option value="Toyota">Toyota</option>
              <option value="BMW">BMW</option>
            </select>
            {errors.stamp && <p>{errors.stamp.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className={styles.labelTop}>Модель</label>
            <select
              className={styles.choice}
              {...register("model", { required: "Модель обязательна" })}
            >
              <option value="">Выберите модель</option>
              <option value="Camry">Camry</option>
              <option value="X5">X5</option>
            </select>
            {errors.model && <p>{errors.model.message}</p>}
          </div>

          <div>
            <Field
              placeholder="Введите год"
              label="Год выпуска"
              id="1"
              {...register("year", { required: "Год обязятелен!" })}
            />
            {errors.year && <p>{errors.year.message}</p>}
          </div>

          <div>
            <Field
              placeholder="Введите номер"
              label="Номерной знак"
              id="1"
              {...register("number", { required: "Номер обязательный" })}
            />
            {errors.number && <p>{errors.number.message}</p>}
          </div>
        </div>

        <div
          className={`flex flex-row flex-wrap items-center justify-center gap-4 mb-5 mt-5`}
        >
          <div>
            <label className={styles.labelBottom}>Класс</label>
            <select
              className={styles.choiceBottom}
              {...register("stamp", { required: "Марка обязательна" })}
            >
              <option value="">Выберите класс</option>
              {carClassData.map((carClass)=> (
                <option value={carClass}>{carClass}</option>
              ))}
            </select>
            {errors.kpp && <p>{errors.kpp.message}</p>}
          </div>

          <div>
            <label className={styles.labelBottom}>Тип КПП</label>
            <select
              className={styles.choiceBottom}
              {...register("stamp", { required: "Марка обязательна" })}
            >
              <option value="">Выберите тип КПП</option>

              {carTransmissionsData.map((carTransmission)=> (
                <option value={carTransmission}>{carTransmission}</option>
              ))}
            </select>
            {errors.classCar && <p>{errors.classCar.message}</p>}
          </div>

          <div>
            <Field
              placeholder="Введите цену"
              label="Цена (BYN в сутки)"
              id="1"
              {...register("price", { required: "Цена обязательна" })}
            />
            {errors.price && <p>{errors.price.message}</p>}
          </div>
        </div>

        <div className={styles.contentText}>
          <label>Описание</label>
          <textarea
            placeholder="Введите описание"
            {...register("text", { required: "Описание обязательно" })}
          ></textarea>
        </div>

        <div className={`${styles.addPhotosContainer}`}>
          <div className={styles.addPhotosTitle}>
            {photos.length === 0 ? (
              <label>Загрузите фотографии</label>
            ) : (
              <>
                <label>Фотографии</label>
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
              <div className={styles.addFirstPhotoWrapper}>
                <label>Выберите или перетащите фотографии в область</label>
                <label className={styles.fontGrayThin}>
                  Форматы JPEG, JPG или PNG до 10 МБ каждый
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  multiple
                  onChange={handleAddPhoto}
                />
                <button
                  className={styles.addPhotoButton}
                  type="button"
                  // onClick={() =>
                  //   document.querySelector('input[type="file"]')?.click()
                  // }
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
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              {photos.length > 0 && photos.length < 8 && (
                <div
                  className={styles.addMorePhotos}
                  // onClick={() =>
                  //   document.querySelector('input[type="file"]')?.click()
                  // }

                  // ?
                >
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
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1 19.7775L8.22222 12.5553C9.56267 11.2654 11.2151 11.2654 12.5556 12.5553L19.7778 19.7775"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16.8887 16.8884L18.3331 15.444C19.6736 14.1541 21.326 14.1541 22.6664 15.444L26.9998 19.7773"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </label>
                  <label>Добавить</label>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    multiple
                    onChange={handleAddPhoto}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-6 justify-between flex-wrap">
          <button
            className={`${styles.whiteButton}`}
            style={{ margin: "0 auto 0 auto" }}
          >
            Отменить
          </button>
          <button
            className={`${styles.blueButton}`}
            style={{ margin: "0 auto" }}
          >
            Создать
          </button>
        </div>
      </form>
    </div>
  );
}
