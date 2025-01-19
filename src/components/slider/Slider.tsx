import React, { useState, useEffect } from "react";
import styles from "./Slider.module.css";

interface ImageGalleryProps {
  images: any[];
}

const Slider: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const setCurrentImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className={styles.slider}>
      <img
        className={styles.currentImage}
        src={images[currentImageIndex]}
        alt="Slider Image"
      />

      <button className={styles.prev} onClick={goToPrevImage}>
        &#10094;
      </button>
      <button className={styles.next} onClick={goToNextImage}>
        &#10095;
      </button>

      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${
              currentImageIndex === index ? styles.active : ""
            }`}
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
