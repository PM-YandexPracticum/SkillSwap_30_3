import React, { useState } from 'react';
import styles from './ImageSlider.module.css';

interface ImageSliderProps {
  images: string[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const otherImages = images
    .map((img, idx) => ({ img, idx }))
    .filter(({ idx }) => idx !== currentIndex);

  const visibleThumbnails = otherImages.slice(0, 3);
  const remaining = otherImages.slice(3);
  const nextPreviewImage = remaining[0]?.img;

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.mainImageContainer}>
        <button className={`${styles.navButton} ${styles.navButtonLeft}`} onClick={handlePrev}>
          ‹
        </button>
        <img
          src={images[currentIndex]}
          alt="Main"
          className={styles.mainImage}
        />
        <button className={`${styles.navButton} ${styles.navButtonRight}`} onClick={handleNext}>
          ›
        </button>
      </div>

      <div className={styles.thumbnailList}>
        {visibleThumbnails.map(({ img, idx }) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx}`}
            onClick={() => handleThumbnailClick(idx)}
            className={styles.thumbnail}
          />
        ))}

        {remaining.length > 0 && (
          <div
            onClick={() => handleThumbnailClick(remaining[0].idx)}
            className={styles.moreThumbnail}
            style={{ backgroundImage: `url(${nextPreviewImage})` }}
          >
            <div className={styles.moreOverlay}>+{remaining.length}</div>
          </div>
        )}
      </div>
    </div>
  );
};