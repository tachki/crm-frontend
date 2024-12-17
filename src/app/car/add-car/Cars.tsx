"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { IСhoiceCar } from "@/types/auth.type";
import styles from "./Cars.module.css";
import { useAppDispatch } from "@/hooks/redux";
import { setCar } from "@/store/slice/isCarSlice";
export default function Cars() {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IСhoiceCar>();

  const onSubmit: SubmitHandler<IСhoiceCar> = (data) => {
    reset();
    if (!data) {
      console.log("Ошибка");
    } else {
      dispatch(setCar(data));
      console.log(data);
    }
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
        </form>
      </div>
    </div>
  );
}
