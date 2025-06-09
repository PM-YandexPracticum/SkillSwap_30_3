import React from 'react';
import styles from '../app-header/header.module.css';
import { IconType, ClickHandler } from '../../types/common';
import themeIcon from '../../assets/img/themeIcon.svg';
import notification from '../../assets/img/notification.svg';
import like from '../../assets/img/like.svg';

type Props = {
    icon: IconType;
    onClick: ClickHandler;
    title?: string;
};

const iconMap: Record<IconType, React.ReactNode> = {
    theme: <img src={themeIcon} alt="Theme" />,
    notifications: <img src={notification} alt="Theme" />,
    favorites: <img src={like} alt="Theme" />,
};

export const IconButton = ({ icon, onClick, title }: Props) => (
    <button title={title} onClick={onClick} className={styles.iconButton}>
        {iconMap[icon]}
    </button>
);