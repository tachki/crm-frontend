"use client";
import {useForm, SubmitHandler} from "react-hook-form";
import {IСhoiceCar} from "@/types/auth.type";
import styles from "./Cars.module.css";
import {useAppDispatch} from "@/hooks/redux";
import {setCar} from "@/store/slice/isCarSlice";
import {Field} from "@/components/fields/Field";
import {useEffect, useState} from "react";
import {number} from "prop-types";
import { CarService } from "@/services/car.service";

export default function Cars() {
    const carTransmissionsData = ['Автоматическая', 'Механическая']
    const carClassData = ['Эконом класс', 'Бизнес класс', 'Внедорожники', 'Грузовые микроавтобусы', 'Кабриолеты', 'Купе', 'Лимузины', 'Микроавтобусы', 'Мотоциклы', 'Пассажирские микроавтобусы', 'Универсалы']

    const [carBrand, setCarBrand] = useState('')
    const [carModel, setCarModel] = useState('')
    const [carNumber, setCarNumber] = useState('')
    const [carTransmission, setCarTransmission] = useState('')
    const [carClass, setCarClass] = useState('')
    const [carPrice, setCarPrice] = useState(1)
    const [carYear, setCarYear] = useState(2024)
    const [carDescription, setCarDescription] = useState('')

    const createCar = async () => {
        const carData = {
            car: {
                brand: "Alfa Romeo",
                business_id: "string",
                class: "Эконом класс",
                created_at: "string",
                description: "string",
                id: "string",
                images: [
                    "string"
                ],
                model: "string",
                preview_image: "string",
                price_per_day: 0,
                status: "string",
                transmission: "Автоматическая",
                updated_at: "string",
                year: "string"
            }
        };

        try {
            const createdCar = await CarService.createCar(carData);
            console.log('Созданная машина:', createdCar);
         
          } catch (error) {
            console.error('Ошибка при создании машины:', error);
          }
    };

    useEffect(() => {
        console.log('--------------------------------------')
        createCar()
        console.log('brand', carBrand)
        console.log('carTransmission', carTransmission)
        console.log('carClass', carClass)
        console.log('carPrice', carPrice)
        console.log('carNumber', carNumber)
        console.log('carModel', carModel)
        console.log('carYear', carYear)
        console.log('carDescription', carDescription)
    }, [carBrand, carTransmission, carClass, carPrice, carYear, carNumber, carModel, carDescription])

    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
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
                    <div style={{width: '270px'}}>
                        <label className={styles.labelBottom}>Марка</label>
                        <input type="text"
                               className={`mt-2 w-full items-center border-2 border-grey bg-transparent p-4 font-light text-base outline-none placeholder:text-grey placeholder:font-normal duration-500 transition-colors focus:border-primary`}
                               style={{height: '55px', borderRadius: '10px'}}
                               placeholder={'Введите марку'}
                               onChange={(e) => setCarBrand(e.target.value)}
                        />
                    </div>

                    <div style={{width: '270px'}}>
                        <label className={styles.labelBottom}>Модель</label>
                        <input type="text"
                               className={`mt-2 w-full items-center border-2 border-grey bg-transparent p-4 font-light text-base outline-none placeholder:text-grey placeholder:font-normal duration-500 transition-colors focus:border-primary`}
                               style={{height: '55px', borderRadius: '10px'}}
                               placeholder={'Введите модель'}
                               onChange={(e) => setCarModel(e.target.value)}
                        />
                    </div>

                    <div style={{width: '270px'}}>
                        <label className={styles.labelBottom}>Год выпуска</label>
                        <input type="number"
                               className={`mt-2 w-full items-center border-2 border-grey bg-transparent p-4 font-light text-base outline-none placeholder:text-grey placeholder:font-normal duration-500 transition-colors focus:border-primary`}
                               style={{height: '55px', borderRadius: '10px'}}
                               onChange={((e) => {
                                   if (Number(e.target.value) < 2000) {
                                       e.target.value = '2000'
                                   } else if (Number(e.target.value) > 2025) {
                                       e.target.value = '2025'
                                   }
                                   setCarYear(Number(e.target.value))
                               })}
                        />
                    </div>
                        <div style={{width: '270px'}}>
                            <label className={styles.labelBottom}>Номерной знак</label>
                            <input type="text"
                                   className={`mt-2 w-full items-center border-2 border-grey bg-transparent p-4 font-light text-base outline-none placeholder:text-grey placeholder:font-normal duration-500 transition-colors focus:border-primary`}
                                   style={{height: '55px', borderRadius: '10px'}}
                                   placeholder={'Введите номер'}
                                   onChange={(e) => setCarNumber(e.target.value)}
                            />
                        </div>
                </div>

                <div
                    className={`flex flex-row flex-wrap items-center justify-center gap-4 mb-5 mt-5`}
                >
                    <div>
                        <label className={styles.labelBottom}>Класс</label>
                        <select
                            className={styles.choiceBottom}
                            {...register("stamp", {required: "Класс обязателен"})}
                            onChange={(e)=>{
                                setCarClass(e.target.value)
                            }}
                        >
                            <option value="">Выберите класс</option>

                            {carClassData.map((carClass, index) => (
                                <option key={carClass + index} value={carClass}>{carClass}</option>
                            ))}
                        </select>
                        {errors.classCar && <p>{errors.classCar.message}</p>}
                    </div>

                    <div>
                        <label className={styles.labelBottom}>Тип КПП</label>
                        <select
                            className={styles.choiceBottom}
                            {...register("stamp", {required: "Марка обязательна"})}
                            onChange={(e)=>{
                                setCarTransmission(e.target.value)
                            }}
                        >
                            <option value="">Выберите тип КПП</option>

                            {carTransmissionsData.map((carTransmission, index) => (
                                <option key={carTransmission + index} value={carTransmission}>{carTransmission}</option>
                            ))}
                        </select>
                        {errors.classCar && <p>{errors.classCar.message}</p>}
                    </div>

                    <div style={{width: '270px'}}>
                        <label className={styles.labelBottom}>Цена (BYN в сутки)</label>
                        <input type="number"
                               className={`mt-2 w-full items-center border-2 border-grey bg-transparent p-4 font-light text-base outline-none placeholder:text-grey placeholder:font-normal duration-500 transition-colors focus:border-primary`}
                               style={{height: '55px', borderRadius: '10px'}}
                               onChange={((e) => {
                                   if (Number(e.target.value) < 1) {
                                       e.target.value = '1'
                                   }
                                   setCarPrice(Number(e.target.value))
                               })}
                        />
                    </div>
                </div>

                <div className={styles.contentText}>
                    <label>Описание</label>
                    <textarea
                        placeholder="Введите описание"
                        {...register("text", {required: "Описание обязательно"})}
                        onChange={(e) => setCarDescription(e.target.value)}
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
                        style={{margin: "0 auto 0 auto"}}
                    >
                        Отменить
                    </button>
                    <button
                        className={`${styles.blueButton}`}
                        style={{margin: "0 auto"}}
                    >
                        Создать
                    </button>
                </div>
            </form>
        </div>
    );
}
