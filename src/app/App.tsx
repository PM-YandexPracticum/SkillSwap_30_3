import React from 'react';
import styles from './app.module.css';
import { RegistrationPage } from '@/pages/RegistrationPage/RegistrationPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './providers/ProtectedRoute';
import Page404 from '@/pages/Page404';
import Page500 from '@/pages/Page500';

const App = () => {
  const isAuthenticated = false;

  return (
      <div className={styles.app}>
        <Routes>
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/404" element={<Page404 />} />
            <Route path="/500" element={<Page500 />} />
            </Route>
        </Routes>
      </div>
  );
};

export default App;4