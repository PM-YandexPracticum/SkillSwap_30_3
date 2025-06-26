import React from 'react';
import { InputField } from '../../Input';
import { InputWithIconProps } from './type';
import styles from './input-with-icon.module.css';

export const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  hasError,
  ...rest
}) => {
  return (
    <div className={`${styles.wrapper} ${hasError ? styles.error : ''}`}>
      <InputField {...rest} />
      {icon && <img src={icon} alt="Иконка поля ввода" className={styles.icon} loading="eager" />}
    </div>
  );
};

export default InputWithIcon;
