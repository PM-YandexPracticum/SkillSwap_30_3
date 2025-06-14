import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'google' | 'apple' | 'continue' | 'submit' | 'back';
  children: React.ReactNode;
}

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
