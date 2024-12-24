"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { IСhoiceCar } from "@/types/auth.type";
import styles from "./Cars.module.css";
import { useAppDispatch } from "@/hooks/redux";
import { setCar } from "@/store/slice/isCarSlice";
import { Field } from "@/components/fields/Field";
export default function Cars() {
  const dispatch = useAppDispatch();
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
              <Field
                placeholder="Введите год"
                label="Год выпуска"
                id="1"
                {...register("year", { required: "Год обязятелен!" })}
              />
              {errors.year && <p>{errors.year.message}</p>}
            </div>

            <div className={styles.contentTop}>
              <Field
                placeholder="Введите номер"
                label="Номерной знак"
                id="1"
                {...register("number", { required: "Номер обязательный" })}
              />
              {errors.number && <p>{errors.number.message}</p>}
            </div>
          </div>

          <div className={styles.components}>
            <div className={styles.contentBottom}>
              <label>Класс</label>
              <select
                className={styles.choiceBottom}
                {...register("stamp", { required: "Марка обязательна" })}
              >
                <option value="">Выберите класс</option>
                <option value="Toyota">Toyota</option>
                <option value="BMW">BMW</option>
              </select>
              {errors.kpp && <p>{errors.kpp.message}</p>}
            </div>

            <div className={styles.contentBottom}>
              <label>Тип КПП</label>
              <select
                className={styles.choiceBottom}
                {...register("stamp", { required: "Марка обязательна" })}
              >
                <option value="">Выберите тип КПП</option>
                <option value="Toyota">Toyota</option>
                <option value="BMW">BMW</option>
              </select>
              {errors.classCar && <p>{errors.classCar.message}</p>}
            </div>

            <div className={styles.contentBottom}>
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
        </form>
      </div>
    </div>
  );
}
