import React from 'react';
import styles from './Input.module.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  smallText?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  placeholder,
  smallText,
  ...props
}) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} placeholder={placeholder} {...props} />
      {smallText && <small className={styles.smallText}>{smallText}</small>}
    </div>
  );
};
