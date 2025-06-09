import React from 'react';
import styles from '../app-header/header.module.css';
import { ButtonVariant, ClickHandler } from '../../types/common';

type Props = {
    label: string;
    onClick: ClickHandler;
    variant?: ButtonVariant;
};

export const Button = ({ label, onClick, variant = 'primary' }: Props) => {
    const className = variant === 'primary' ? styles.buttonPrimary : styles.buttonOutline;
    return <button className={className} onClick={onClick}>{label}</button>;
};