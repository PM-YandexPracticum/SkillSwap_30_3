import React, { FC, memo } from 'react';
import styles from './Checkbox.module.css';

import { TCheckboxUIProps } from './type';

export const CheckboxUI: FC<TCheckboxUIProps> = memo(
  ({ title, value, name, onChange, checked}) => {
    const inputId = `${name}_checkbox_item_with_value__${value}`;

    return (
      <div
        className={styles.item}
        key={value}
      >
        <input
          className={styles.input}
          type="checkbox"
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