import styles from './app.module.css';
import { RegistrationPage } from '@/pages/RegistrationPage/RegistrationPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './providers/ProtectedRoute';

const App = () => {
  const isAuthenticated = false;

  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/registration" element={<RegistrationPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
