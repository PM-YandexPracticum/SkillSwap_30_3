import React from 'react';
import styles from './button.module.css';
import type { ButtonProps } from './types';

export const Button = React.memo(({ label, onClick, variant = 'primary', type = 'button' }: ButtonProps) => {
    const className = styles[`button${variant.charAt(0).toUpperCase()}${variant.slice(1)}`] || styles.buttonPrimary;

    return (
        <button className={className} onClick={onClick} type={type}>
            {label}
        </button>
    );
});