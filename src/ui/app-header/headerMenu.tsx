import React from 'react';
import styles from '../app-header/header.module.css';
import chevron from '../../assets/img/chevron-down.svg';

type HeaderMenuProps = {
    onSkillsToggle?: () => void;
};

export const HeaderMenu = ({ onSkillsToggle }: HeaderMenuProps) => {
    return (
        <div className={styles.menuBlock}>
            <a href="#about" className={styles.navLink}>О проекте</a>
            <div className={styles.skillsToggle} onClick={() => onSkillsToggle?.()}>
                <span>Все навыки</span>
                <img src={chevron} alt="Toggle skills" />
            </div>
        </div>
    );
};