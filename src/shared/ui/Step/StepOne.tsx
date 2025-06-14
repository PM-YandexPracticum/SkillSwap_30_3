import React from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { InputField } from '../Input/Input';
import styles from './StepOne.module.css';
import GoogleIcon from '../../assets/icons/google.svg';
import AppleIcon from '../../assets/icons/apple.svg';
import EyeSlashIcon from '@shared/assets/icons/eyeSlash.svg';
import EyeIcon from '@shared/assets/icons/eye.svg';

interface StepOneProps {
  formData: {
    email: string;
    password: string;
  };
  errors: {
    email?: string;
    password?: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
}

export const StepOne: React.FC<StepOneProps> = ({
  formData,
  errors,
  onInputChange,
  onNext,
  isPasswordVisible,
  togglePasswordVisibility,
}) => {
  return (
    <div className={styles.stepOne}>
      <div className={styles.socialButtons}>
        <Button variant="google" onClick={() => alert('Login with Google')}>
          <img src={GoogleIcon} alt="Google logo" />
          Продолжить с Google
        </Button>
        <Button variant="apple" onClick={() => alert('Login with Apple')}>
          <img src={AppleIcon} alt="Apple logo" />
          Продолжить с Apple
        </Button>
      </div>

      <div className={styles.orDivider}>
        <span>или</span>
      </div>
      <div className={styles.formField}>
        <InputField
          id="email"
          name="email"
          label="Email"
          placeholder="Введите email"
          value={formData.email}
          onChange={onInputChange}
          type="email"
          required
        />
      </div>
      {errors.email && <p className={styles.errorText}>{errors.email}</p>}

      <div className={styles.formField}>
        <label htmlFor="password" className={styles.passwordLabel}>
          Пароль
        </label>
        <div className={styles.passwordInputWrapper}>
          <InputField
            id="password"
            name="password"
            placeholder="Придумайте надёжный пароль"
            value={formData.password}
            onChange={onInputChange}
            type={isPasswordVisible ? 'text' : 'password'}
            required
            minLength={8}
            className={styles.passwordInputField}
            label={''}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
          >
            {isPasswordVisible ? (
              <img src={EyeSlashIcon} alt="Скрыть пароль" />
            ) : (
              <img src={EyeIcon} alt="Показать пароль" />
            )}
          </button>
        </div>
        <p className={styles.smallText}>
          Пароль должен содержать не менее 8 знаков
        </p>
        {errors.password && (
          <p className={styles.errorText}>{errors.password}</p>
        )}
      </div>

      <Button variant="submit" onClick={onNext}>
        Далее
      </Button>
    </div>
  );
};
