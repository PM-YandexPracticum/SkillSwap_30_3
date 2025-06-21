import React, { FC, memo } from 'react';
import styles from './Radio.module.css';

import { TRadioUIProps } from './type';

export const RadioUI: FC<TRadioUIProps> = memo(
  ({ title, value, name, onChange, checked}) => {
    const inputId = `${name}_radio_item_with_value__${value}`;

    return (
      <div
        className={styles.item}
        key={value}
      >
        <input
          className={styles.input}
          type="radio"
          name={name}
          id={inputId}
          value={value}
          onChange={onChange}
          checked={checked}
          title={title}
        />
        <label className={styles.label} htmlFor={inputId}>
          {title}
        </label>
      </div>
    );
  }
);