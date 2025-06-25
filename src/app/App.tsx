import { Routes, Route, Link } from 'react-router-dom';
import styles from './app.module.css';
import { RegistrationPage } from '@/pages/RegistrationPage/RegistrationPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './providers/ProtectedRoute';
import Page404 from '@/pages/Page404';
import Page500 from '@/pages/Page500';

const HomePage = () => (
  <div className={styles.app}>
    <h1>Проект</h1>
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
      <Link to="/404">Показать 404</Link>
      <Link to="/500">Показать 500</Link>
    </div>
  </div>
);

const App = () => {
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

export default App;