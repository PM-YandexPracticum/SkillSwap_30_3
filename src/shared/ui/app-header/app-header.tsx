import React, { useCallback } from 'react';
import styles from './header.module.css';
import { Logo } from './logo';
import { IconButton } from './iconButton';
import { HeaderMenu } from './headerMenu';
import { HeaderSearch } from './headerSearch';
import { AuthButtons } from './authButtons';
import { UserInfo } from './userInfo';
import { HeaderProps } from './types';

const HeaderComponent = ({
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
    const handleLogin = useCallback(() => {
        if (onLogin) {
            onLogin();
        }
    }, [onLogin]);

    const handleRegister = useCallback(() => {
        if (onRegister) {
            onRegister();
        }
    }, [onRegister]);

    const handleThemeToggle = useCallback(() => {
        if (onThemeToggle) {
            onThemeToggle();
        }
    }, [onThemeToggle]);

    const handleNotificationsClick = useCallback(() => {
        if (onNotificationsClick) {
            onNotificationsClick();
        }
    }, [onNotificationsClick]);

    const handleFavoritesClick = useCallback(() => {
        if (onFavoritesClick) {
            onFavoritesClick();
        }
    }, [onFavoritesClick]);

    const handleSkillsToggle = useCallback(() => {
        if (onSkillsToggle) {
            onSkillsToggle();
        }
    }, [onSkillsToggle]);

    return (
        <header className={styles.header} role="banner">
            <div className={styles.logoBlock}>
                <Logo />
            </div>

            <div>
                <HeaderMenu onSkillsToggle={handleSkillsToggle} />
            </div>

            <div>
                <HeaderSearch isAuthenticated={isAuthenticated} />
            </div>

            <div className={styles.rightBlock}>
                <div className={styles.iconBlock}>
                    <IconButton icon="theme" onClick={handleThemeToggle} title="Сменить тему" />
                    {isAuthenticated && (
                        <>
                            <IconButton icon="notifications" onClick={handleNotificationsClick} title="Уведомления" />
                            <IconButton icon="favorites" onClick={handleFavoritesClick} title="Избранные" />
                        </>
                    )}
                </div>

                <div className={styles.authButtonsOutside}>
                    {isAuthenticated ? (
                        <UserInfo userName={userName} avatarUrl={avatarUrl} />
                    ) : (
                        <AuthButtons onLogin={handleLogin} onRegister={handleRegister} />
                    )}
                </div>
            </div>
        </header>
    );
};

export const Header = React.memo(HeaderComponent);