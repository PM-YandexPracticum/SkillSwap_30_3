import React, { FC } from 'react';
import styles from './textarea.module.css';
import { TextareaWithIconProps } from './type';

export const TextareaWithIcon: React.FC<TextareaWithIconProps> = ({
  icon,
  label,
  id,
  ...rest
}) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <textarea id={id} className={styles.textarea} {...rest} />
      {icon && <img src={icon} alt="" className={styles.icon} loading="lazy" />}
    </div>
  );
};

export default TextareaWithIcon;
