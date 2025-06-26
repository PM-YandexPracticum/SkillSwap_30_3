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
    onLogo,
    onSearchChange,
    searchValue
}: HeaderProps) => {
    const handleLogo = useCallback(() => {
        if (onLogo) {
            onLogo();
        }
    }, [onLogo]);

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
            <Logo onClick={handleLogo}/>

            <HeaderMenu onSkillsToggle={handleSkillsToggle} />

            
            <HeaderSearch 
                isAuthenticated={isAuthenticated}
                onChange={onSearchChange}
                value={searchValue}
            />

            <div className={styles.iconBlock}>
                <IconButton icon="theme" onClick={handleThemeToggle} title="Сменить тему" />
                {isAuthenticated && (
                    <>
                        <IconButton icon="notifications" onClick={handleNotificationsClick} title="Уведомления" />
                        <IconButton icon="favorites" onClick={handleFavoritesClick} title="Избранные" />
                    </>
                )}
            </div>

            {isAuthenticated ? (
                <UserInfo userName={userName} avatarUrl={avatarUrl} />
            ) : (
                <AuthButtons onLogin={handleLogin} onRegister={handleRegister} />
            )}
        </header>
    );
};

export const HeaderUI = React.memo(HeaderComponent);