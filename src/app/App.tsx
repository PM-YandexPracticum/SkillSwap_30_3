import styles from './app.module.css';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
