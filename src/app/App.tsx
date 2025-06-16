import React from 'react';
import styles from './app.module.css';
import { Header } from '../shared/ui/app-header/app-header';

const App = () => {
  return (
    <div className={styles.app}>
      <Header
        isAuthenticated={false}
        userName=""
        avatarUrl=""
        onLogin={() => {}}
        onRegister={() => {}}
        onThemeToggle={() => {}}
        onNotificationsClick={() => {}}
        onFavoritesClick={() => {}}
        onSkillsToggle={() => {}}
      />
      Проект
    </div>
  );
};

export default App;
