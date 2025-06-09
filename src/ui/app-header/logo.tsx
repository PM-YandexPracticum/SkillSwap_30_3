import React from 'react';
import styles from './header.module.css';
import logoImg from '../../assets/img/logo.svg';

export const Logo = () => (
    <div className={styles.logo}>
        <img src={logoImg} alt="SkillSwap Logo" className={styles.logoIcon} />
        <span className={styles.logoText}>SkillSwap</span>
    </div>
);