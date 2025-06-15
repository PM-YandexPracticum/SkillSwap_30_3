import React from 'react';
import styles from './iconButton.module.css';
import type { IconButtonProps, IconType } from './types';
import themeIcon from '../../../assets/icons/themeIcon.svg';
import notification from '../../../assets/icons/notification.svg';
import like from '../../../assets/icons/like.svg';

const iconMap: Record<IconType, React.ReactNode> = {
    theme: <img src={themeIcon} alt="Theme icon" loading="lazy" />,
    notifications: <img src={notification} alt="Notification icon" loading="lazy" />,
    favorites: <img src={like} alt="Favorites icon" loading="lazy" />,
};

export const IconButton = React.memo(({ icon, onClick, title }: IconButtonProps) => (
    <button title={title} onClick={onClick} className={styles.iconButton} type="button" aria-label={title}>
        {iconMap[icon]}
    </button>
));