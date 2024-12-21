"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { IСhoiceCar } from "@/types/auth.type";
import styles from "./Cars.module.css";
import { useAppDispatch } from "@/hooks/redux";
import { setCar } from "@/store/slice/isCarSlice";
import { useState } from "react";

export default function Cars() {
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
    <div className={styles.items}>
      <div className={styles.conteiner}>
        <h1>Добавление нового автомобиля</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.components}>
            <div className={styles.contentTop}>
              <label>Марка</label>
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

            <div className={styles.contentTop}>
              <label>Модель</label>
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

            <div className={styles.contentTop}>
              <label>Год выпуска</label>
              <input
                placeholder="Введите год"
                className={styles.choice}
                {...register("year", { required: "Год обязательна" })}
              />
              {errors.year && <p>{errors.year.message}</p>}
            </div>

            <div className={styles.contentTop}>
              <label>Номерной знак</label>
              <input
                placeholder="Введите номер"
                className={styles.choice}
                {...register("number", { required: "Номер обязательный" })}
              />
              {errors.number && <p>{errors.number.message}</p>}
            </div>
          </div>

          <div className={styles.components}>
            <div className={styles.contentBottom}>
              <label>Класс</label>
              <input
                placeholder="Выберите класс"
                className={styles.choice}
                {...register("kpp", { required: "Класс обязателен" })}
              />
              {errors.kpp && <p>{errors.kpp.message}</p>}
            </div>

            <div className={styles.contentBottom}>
              <label>Тип КПП</label>
              <input
                placeholder="Выберите тип КПП"
                className={styles.choice}
                {...register("classCar", { required: "Тип КПП обязателен" })}
              />
              {errors.classCar && <p>{errors.classCar.message}</p>}
            </div>

            <div className={styles.contentBottom}>
              <label>Цена (BYN в сутки)</label>
              <input
                placeholder="Введите цену"
                className={styles.choice}
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

          <div
            className={`${styles.contentBottom} ${styles.addPhotosContainer}`}
          >
            <div className={styles.addPhotosTitle}>
              {photos.length === 0 ? (
                <label>Загрузите фотографии</label>
              ) : (
                <>
                  <label>Фотографии</label>
                  <label>Количество добавленных фото: {photos.length}/8</label>
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
                    onClick={() =>
                      document.querySelector('input[type="file"]')?.click()
                    }
                  >
                    Выбрать фотографии
                  </button>
                </div>
              )}
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
                    ✖
                  </button>
                </div>
              ))}
              {photos.length > 0 && photos.length < 8 && (
                <div>
                  <p>Выберите или перетащите фотографии в область</p>
                  <p>Форматы JPEG, JPG или PNG до 10 МБ каждый</p>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    multiple
                    onChange={handleAddPhoto}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.querySelector('input[type="file"]')?.click()
                    }
                  >
                    Выбрать фотографии
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
