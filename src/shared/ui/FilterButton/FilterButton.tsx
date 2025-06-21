import React, { FC, memo } from 'react';
import styles from './FilterButton.module.css';

import { TFilterButtonUIProps } from './type';

export const FilterButtonUI: FC<TFilterButtonUIProps> = memo(
  ({ title, onClick, icon }) => {
    return (
      <button 
        className={styles.container}
        onClick={onClick}>
        <p className={styles.title}>{title}</p>
        {icon &&
          <img src={icon} alt={title} className={styles.icon} loading="lazy"/>
        }
      </button>
    );
  }
);