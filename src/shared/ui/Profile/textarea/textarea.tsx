import React, { FC } from 'react';
import styles from './textarea.module.css';
import { TextareaWithIconProps } from './type';

export const TextareaWithIcon: React.FC<TextareaWithIconProps> = ({
  icon,
  label,
  id,
  name,
  onChange,
  ...rest
}) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        name={name}
        onChange={onChange}
        id={id}
        className={styles.textarea}
        {...rest}
      />
      {icon && <img src={icon} alt="Иконка поля О себе" className={styles.icon} loading="eager" />}
    </div>
  );
};

export default TextareaWithIcon;
