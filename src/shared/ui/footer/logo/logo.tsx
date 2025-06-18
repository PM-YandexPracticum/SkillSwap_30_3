import React from 'react';
import styles from './logo.module.css';
import logoImg from '../../../assets/icons/logo.svg';
import { LogoProps } from './types';

export const Logo: React.FC<LogoProps> = React.memo(({ className, title, onClick }) => (
    <div
        className={`${styles.logo} ${className || ''}`}
        onClick={onClick}
        title={title}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
        <img src={logoImg} alt="Логотип сайта" className={styles.logoIcon} loading="lazy" />
        <span className={styles.logoText}>SkillSwap</span>
    </div>
));