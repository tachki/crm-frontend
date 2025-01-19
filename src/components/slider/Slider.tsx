import React, { useState, useEffect } from "react";
import styles from "./Slider.module.css";

interface ImageGalleryProps {
  images: any[]; // Указание, что images — это массив строк (URLs)
}

const Slider: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    if (!images.length) return;
    setCurrentImage(images[0]);
  }, [images]);

  return (
    <div className={styles.images}>
      <div
        className={styles.current}
        style={{ backgroundImage: `url(${currentImage})` }}
      />
      <div className={styles["images-list"]}>
        {images.map((image, i) => (
          <div
            key={i}
            className={styles.image}
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => setCurrentImage(image)} // Обновление текущего изображения
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
