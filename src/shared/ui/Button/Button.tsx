import React from 'react';
import styles from './Button.module.css';
import { ButtonProps } from './type';

export const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  ...props
}) => {
  const buttonClass = {
    google: styles.googleButton,
    apple: styles.appleButton,
    continue: styles.continueButton,
    submit: styles.submitButton,
    back: styles.backButton,
  }[variant];

  return (
    <button className={`${styles.button} ${buttonClass}`} {...props}>
      {children}
    </button>
  );
};
