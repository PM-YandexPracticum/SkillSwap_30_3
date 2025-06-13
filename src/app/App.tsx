import styles from './app.module.css';
import { Footer } from '@/shared/ui/footer/footer';
import { ClickHandler } from '@/types/common';

const App = () => {
   const handleAbout: ClickHandler = () => {
    console.log('Our Project');
  };

  const handleSkils: ClickHandler = () => {
    console.log('All Skils');
  };

  const handleContacts: ClickHandler = () => {
    console.log('Our Contacts');
  };

  const handleBlog: ClickHandler = () => {
    console.log('Our Blog');
  };

  const handlePrivicy: ClickHandler = () => {
    console.log('Our Privicy');
  };

  const handleAgreement: ClickHandler = () => {
    console.log('Our Agreement');
  };
  return (
    <div className={styles.app}>
      <main className={styles.app}>
      </main>
      <Footer 
      onAboutClick={handleAbout}
      onSkilsClick={handleSkils}
      onContactClick={handleContacts}
      onBlogClick={handleBlog}
      onPrivicyClick={handlePrivicy}
      onAgreementClick={handleAgreement}/>
    </div>
  );
};

export default App;
