import { ChangeEvent, InputEventHandler } from "react";

export type ClickHandler = () => void;

export interface HeaderProps {
    isAuthenticated: boolean;
    userName?: string;
    avatarUrl?: string;
    onLogin: ClickHandler;
    onRegister: ClickHandler;
    onThemeToggle: ClickHandler;
    onNotificationsClick?: ClickHandler;
    onFavoritesClick?: ClickHandler;
    onSkillsToggle?: ClickHandler;
    onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onLogo?: ClickHandler;
    searchValue?: string;
}