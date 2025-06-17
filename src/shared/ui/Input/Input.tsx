import React from 'react';
import styles from './Input.module.css';
import { InputFieldProps } from './type';

export const InputFieldComponent: React.FC<InputFieldProps> = ({
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

export const InputField = React.memo(InputFieldComponent);
