import { Routes, Route, Link } from 'react-router-dom';
import styles from './app.module.css';
import Page404 from '@/pages/Page404';
import Page500 from '@/pages/Page500';
import { Header } from '@/shared/ui/app-header';
import { Footer } from '@/shared/ui/footer';
// import { CardSkillsListComponent } from './../widgets/CardSkillsList/CardSkillsList';

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
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Header
        isAuthenticated={false}
        onLogin={() => console.log('Login clicked')}
        onRegister={() => console.log('Register clicked')}
        onThemeToggle={() => console.log('Theme toggle clicked')}
        onNotificationsClick={() => console.log('Notifications clicked')}
        onFavoritesClick={() => console.log('Favorites clicked')}
        onSkillsToggle={() => console.log('Skills toggle clicked')}
      />
      <main style={{ flex: 1 }}>
        <Routes>
          {/* <Route path="/" element={<CardSkillsListComponent />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
        </Routes>
      </main>
      <Footer
        onAboutClick={() => console.log('About clicked')}
        onSkilsClick={() => console.log('Skills clicked')}
        onContactClick={() => console.log('Contact clicked')}
        onBlogClick={() => console.log('Blog clicked')}
        onPrivacyClick={() => console.log('Privacy clicked')}
        onAgreementClick={() => console.log('Agreement clicked')}
      />
    </div>
  );
};

export default App;
