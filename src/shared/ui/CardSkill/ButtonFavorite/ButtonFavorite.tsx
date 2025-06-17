import { ButtonFavoriteProps } from './../types';
import styles from './../ButtonFavorite/ButtonFavorite.module.css';
import React, { useState } from 'react';

const ButtonFavorite: React.FC<ButtonFavoriteProps> = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      type="button"
      className={`${styles.button_favorite} ${isFavorite ? styles.active : ''}`}
      onClick={handleToggleFavorite}
      aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      {isFavorite && <span className="active" />}
    </button>
  );
};

export default ButtonFavorite;
