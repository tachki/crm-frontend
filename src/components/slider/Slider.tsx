import React, { useRef, useState, MouseEvent } from "react"
import styles from "./Slider.module.css"
import clsx from "clsx"
import Image from 'next/image'

interface ImageGalleryProps {
  images: string[]
}

const Slider: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return
    isDragging.current = true
    startX.current = e.pageX
    scrollLeft.current = carouselRef.current.scrollLeft
    carouselRef.current.style.cursor = "grabbing"
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !carouselRef.current) return
    e.preventDefault()
    const walk = (e.pageX - startX.current) * 1.2
    carouselRef.current.scrollLeft = scrollLeft.current - walk
  }

  const handleMouseUp = () => {
    isDragging.current = false
    if (carouselRef.current) carouselRef.current.style.cursor = "grab"
  }

  return (
    <div className={styles.slider}>
      <div className={styles.currentImage}>
        <Image
          src={images[currentImageIndex]}
          alt="Slider Image"
          width={150}
          height={150}
        />
      </div>

      <div
        className={styles.thumbnails}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        {images.map((image, index) => (
          <Image
            src={image}
            alt="slider thumb image"
            key={index}
            className={clsx(styles.thumbnail, {
              [styles.active]: currentImageIndex === index,
            })}
            onClick={() => setCurrentImageIndex(index)}
            draggable="false"
            width={150}
            height={150}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
