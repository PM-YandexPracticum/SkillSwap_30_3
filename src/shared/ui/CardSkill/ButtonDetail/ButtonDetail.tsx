import React from 'react';
import { ButtonDetailProps } from './../types';
import styles from './../ButtonDetail/ButtonDetail.module.css';

const ButtonDetail: React.FC<ButtonDetailProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      aria-label="Перейти на страницу предложения"
      className={styles.button_details}
      onClick={onClick}
    >
      Подробнее
    </button>
  );
};

export default ButtonDetail;
