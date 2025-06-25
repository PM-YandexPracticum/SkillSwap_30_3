import React from 'react';
import { InputField } from '../../Input';
import { InputWithIconProps } from './type';
import styles from './input-with-icon.module.css';

export const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  ...rest
}) => {
  return (
    <div className={`${styles.wrapper}`}>
      <InputField {...rest} />
      {icon && <img src={icon} alt="" className={styles.icon} loading="lazy" />}
    </div>
  );
};

export default InputWithIcon;
