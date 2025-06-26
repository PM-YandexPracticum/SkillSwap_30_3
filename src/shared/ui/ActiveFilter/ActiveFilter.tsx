import React, { FC, memo } from 'react';
import styles from './ActiveFilter.module.css';

import { TActiveFilterUIProps } from './type';

export const ActiveFilterUI: FC<TActiveFilterUIProps> = memo(
  ({ title, onClick, icon }) => {
    return (
      <div className={styles.container}>
        <p className={styles.title}>{title}</p>
        <button 
          className={styles.button}
          onClick={onClick}
        >
          <img src={icon} alt={title} loading="lazy"/>
        </button>
      </div>
    );
  }
);