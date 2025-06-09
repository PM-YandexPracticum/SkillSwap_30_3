import React from 'react';
import styles from '../app-header/header.module.css';
import { Logo } from './logo';
import { Button } from './button';
import { IconButton } from './iconButton';
import { ClickHandler } from '../../types/common';
import { HeaderMenu } from './headerMenu';
import { HeaderSearch } from './headerSearch';
import placeholderAvatar from '../../assets/img/test.jpg';

type HeaderProps = {
    isAuthenticated: boolean;
    userName?: string;
    avatarUrl?: string;
    onLogin: ClickHandler;
    onRegister: ClickHandler;
    onThemeToggle: ClickHandler;
    onNotificationsClick?: ClickHandler;
    onFavoritesClick?: ClickHandler;
    onSkillsToggle?: ClickHandler;
};

export const Header = ({
    isAuthenticated,
    userName,
    avatarUrl,
    onLogin,
    onRegister,
    onThemeToggle,
    onNotificationsClick,
    onFavoritesClick,
    onSkillsToggle,
}: HeaderProps) => {
    return (
        <header className={styles.header}>
            <div className={styles.iconBlock}>
                <Logo />
            </div>

            <div>
                <HeaderMenu onSkillsToggle={onSkillsToggle} />
            </div>

            <div>
                <HeaderSearch isAuthenticated={isAuthenticated} />
            </div>

            <div className={styles.rightBlock}>
                <IconButton icon="theme" onClick={onThemeToggle} title="Сменить тему" />

                {isAuthenticated && (
                    <>
                        {onNotificationsClick && (
                            <IconButton icon="notifications" onClick={onNotificationsClick} title="Уведомления" />
                        )}
                        {onFavoritesClick && (
                            <IconButton icon="favorites" onClick={onFavoritesClick} title="Избранные" />
                        )}
                    </>
                )}

                <div className={styles.authButtonsOutside}>
                    {isAuthenticated ? (
                        <div className={styles.userBlock}>
                            <span className={styles.userName}>{userName}</span>
                            <img
                                src={avatarUrl || placeholderAvatar}
                                className={styles.avatar}
                                alt="User avatar"
                            />
                        </div>
                    ) : (
                        <div className={styles.auth_buttons}>
                            <Button label="Войти" variant="outline" onClick={onLogin} />
                            <Button label="Зарегистрироваться" onClick={onRegister} />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};