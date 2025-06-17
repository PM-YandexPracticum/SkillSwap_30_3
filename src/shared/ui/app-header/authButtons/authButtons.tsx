import React from 'react';
import { Button } from '../button';
import { AuthButtonsProps } from './types';
import styles from './authButtons.module.css';

export const AuthButtons = React.memo(({ onLogin, onRegister }: AuthButtonsProps) => (
    <div className={styles.auth_buttons}>
        <Button label="Войти" variant="outline" onClick={onLogin} type="button" />
        <Button label="Зарегистрироваться" onClick={onRegister} type="button" />
    </div>
));