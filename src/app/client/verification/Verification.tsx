"use client";
import styles from "./Verification.module.css";
import { useRef, useState } from "react";
import { VerificationService } from "@/services/verification.service";

import React from 'react';
import logo from '../../../../public/logo.svg';

export default function Verification () {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [photos, setPhotos] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isFieldPreparing, setIsFieldPreparing] = useState<boolean>(true);

    const createCar = async () => {
        const formData = new FormData();

        formData.append("full_name", `${name} ${surname}`);
        formData.append("birthday", birthday);
        formData.append("number", phoneNumber);
        formData.append("image", photos[0]);

        setIsFieldPreparing(true)
        setName(()=> "")
        setSurname(()=> "")
        setBirthday(()=> "")
        setPhoneNumber(()=> "")
        setPhotos(()=> [])

        try {
            const createdCar = await VerificationService.makeVerification(formData);
            //TODO make correct route after submit form
            //router.replace(DASHBOARD_PAGES.BUSINESS_CARS);
            console.log("Результат верификации:", createdCar);
        } catch (error) {
            console.error("Ошибка при верификации:", error);
        }
    };

    const handleCancelAddCar = () => {
        setIsFieldPreparing(true);
        setName(()=> "")
        setSurname(()=> "")
        setBirthday(()=> "")
        setPhoneNumber(()=> "")
        setPhotos(()=> [])
    };

    const handleAddCar = () => {
        setIsFieldPreparing(false);
        if (
            name &&
            surname &&
            birthday &&
            phoneNumber &&
            photos.length
        ) {
            createCar();
        }
    };

    const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newPhotos = [...photos, ...Array.from(event.target.files)];
            if (newPhotos.length > 1) {
                newPhotos.length = 1;
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

    const openFilePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
            <form className="mt-14 flex flex-col w-full text-center items-center m-auto"
                  onSubmit={(e) => {
                      e.preventDefault();
                  }}
            >
                <img
                    className='mb-12'
                    src={logo.src}
                    alt="logo"
                    width={'120px'}
                    height={'48px'}
                />
                <span className='text-2xl font-bold mb-3'>
                    Подтвердите личность
                </span>

                <div
                    className={`flex flex-row flex-wrap items-center justify-center gap-4 mb-5 mt-5`}
                >
                    <div className={styles.inputWrap}>
                        <label className={styles.labelBottom}>Имя</label>
                        <input
                            type="text"
                            value={name}
                            className={`${styles.customInput} mt-2 w-full items-center border-2 border-grey bg-transparent p-4 font-light text-base outline-none placeholder:text-grey placeholder:font-normal duration-500 transition-colors focus:border-primary`}
                            placeholder={"Введите полное имя"}
                            onChange={(e) => setName(e.target.value)}
                            style={
                                (isFieldPreparing || name) === ""
                                    ? {
                                        backgroundColor: "rgba(255,0,0,0.025)",
                                        border: "2px solid red",
                                    }
                                    : {}
                            }
                        />
                    </div>
                    <div className={styles.inputWrap}>
                        <label className={styles.labelBottom}>Фамилия</label>
                        <input
                            type="text"
                            value={surname}
                            className={`${styles.customInput} mt-2 w-full items-center border-2 border-grey bg-transparent p-4 font-light text-base outline-none placeholder:text-grey placeholder:font-normal duration-500 transition-colors focus:border-primary`}
                            placeholder={"Введите фамилию"}
                            onChange={(e) => setSurname(e.target.value)}
                            style={
                                (isFieldPreparing || surname) === ""
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
                        <label className={styles.labelBottom}>Дата рождения</label>
                        <input
                            type="text"
                            value={birthday}
                            className={`${styles.customInput} mt-2 w-full items-center border-2 border-grey bg-transparent p-4 font-light text-base outline-none placeholder:text-grey placeholder:font-normal duration-500 transition-colors focus:border-primary`}
                            placeholder={"DD.MM.YYYY"}
                            onChange={(e) => setBirthday(e.target.value)}
                            style={
                                (isFieldPreparing || birthday) === ""
                                    ? {
                                        backgroundColor: "rgba(255,0,0,0.025)",
                                        border: "2px solid red",
                                    }
                                    : {}
                            }
                        />
                    </div>
                    <div className={styles.inputWrap}>
                        <label className={styles.labelBottom}>Номер телефона</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            className={`${styles.customInput} mt-2 w-full items-center border-2 border-grey bg-transparent p-4 font-light text-base outline-none placeholder:text-grey placeholder:font-normal duration-500 transition-colors focus:border-primary`}
                            placeholder={"Введите номер телефона"}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={
                                (isFieldPreparing || phoneNumber) === ""
                                    ? {
                                        backgroundColor: "rgba(255,0,0,0.025)",
                                        border: "2px solid red",
                                    }
                                    : {}
                            }
                        />
                    </div>
                </div>


                <div className={`${styles.addPhotosContainer}`}>
                    <div className={styles.addPhotosTitle}>
                        <label className={styles.labelBottom}>Фотография водительского удостоверения</label>
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
                                    Выберите или перетащите фотографию в область
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
                                    Выбрать фотографию
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
                        </div>
                    </div>
                </div>

                <button
                    className={`${styles.blueButton} mb-3`}
                    onClick={handleAddCar}
                >
                    Завершить
                </button>
                <button
                    className={`${styles.whiteButton}`}
                    onClick={handleCancelAddCar}
                >
                    Отменить
                </button>
            </form>
            );
            };