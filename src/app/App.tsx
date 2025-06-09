import React from 'react';
import { Header } from '../ui/app-header/app-header';
import { ClickHandler } from '../types/common';
import styles from './app.module.css';

const App = () => {
  const handleLogin: ClickHandler = () => {
    console.log('Login clicked');
  };

  const handleRegister: ClickHandler = () => {
    console.log('Register clicked');
  };

  const handleThemeToggle: ClickHandler = () => {
    console.log('Theme toggled');
  };

  const handleNotificationsClick: ClickHandler = () => {
    console.log('Notifications clicked');
  };

  const handleFavoritesClick: ClickHandler = () => {
    console.log('Favorites clicked');
  };

  const handleSkillsToggle: ClickHandler = () => {
    console.log('Skills toggled');
  };

  return (
    <div className={styles.app}>
      <Header
        isAuthenticated={false}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onThemeToggle={handleThemeToggle}
        onNotificationsClick={handleNotificationsClick}
        onFavoritesClick={handleFavoritesClick}
        onSkillsToggle={handleSkillsToggle}
      />
    </div>
  );
};

export default App;