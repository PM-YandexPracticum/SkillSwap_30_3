import React from 'react';
import styles from './preloader.module.css';

export const Preloader = () => (
  <div className={styles.preloader}>
    <div className={styles.preloader_chasing_squares}>
        <div className={styles.square}></div>
        <div className={styles.square}></div>
        <div className={styles.square}></div>
        <div className={styles.square}></div>
    </div>
  </div>
);
