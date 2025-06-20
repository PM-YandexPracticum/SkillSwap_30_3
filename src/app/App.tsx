import React, { useState, useCallback } from 'react';
import styles from './app.module.css';
import { RegistrationPage } from '@/pages/RegistrationPage/RegistrationPage';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './providers/ProtectedRoute';
import { Header } from '../shared/ui/app-header/app-header';
import { AllSkillsModal } from '../shared/ui/AllSkillsModal';
import { categories } from '../shared/ui/AllSkillsModal/mockCategories';

const App = () => {
  const [isSkillsModalVisible, setSkillsModalVisible] = useState(false);
  const isAuthenticated = false;

  const handleSkillsToggle = useCallback(() => {
    setSkillsModalVisible(true);
  }, []);

  const handleCloseSkillsModal = useCallback(() => {
    setSkillsModalVisible(false);
  }, []);

  return (
    <div className={styles.app}>
      <Header
        isAuthenticated={isAuthenticated}
        userName=""
        avatarUrl=""
        onLogin={() => {}}
        onRegister={() => {}}
        onThemeToggle={() => {}}
        onNotificationsClick={() => {}}
        onFavoritesClick={() => {}}
        onSkillsToggle={handleSkillsToggle}
      />

      <AllSkillsModal
        visible={isSkillsModalVisible}
        categories={categories}
        onClose={handleCloseSkillsModal}
      />

      <Routes>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/registration" element={<RegistrationPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;