import React, { useCallback } from 'react';
import styles from './Footer.module.css';
import { Logo } from './logo/logo';
import { footerProps } from './types';
import { NavItem } from './navItem';

import { Link, useNavigate } from 'react-router-dom';

export const FooterUI: React.FC<footerProps> = React.memo(({
  onAboutClick,
  onSkilsClick,
  onContactClick,
  onBlogClick,
  onPrivacyClick,
  onAgreementClick,
  onLogo
}: footerProps) => {
  const handleClick = useCallback((callback?: () => void, e?: React.MouseEvent) => {
    e?.preventDefault();
    callback?.();
  }, []);

  return (
    <footer className={styles.footer} aria-label="Подвал">
      <Logo className={styles.logoBlock} onClick={() => handleClick(onLogo)}/>
      <nav className={styles.container}>
        <li className={styles.item}>
          <Link to="#" onClick={(e) => handleClick(onAboutClick, e)}>
            О проекте
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" onClick={(e) => handleClick(onSkilsClick, e)}>
            Все навыки
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" onClick={(e) => handleClick(onContactClick, e)}>
            Контакты
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" onClick={(e) => handleClick(onBlogClick, e)}>
            Блог
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" onClick={(e) => handleClick(onPrivacyClick, e)}>
            Политика конфиденциальности
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#" onClick={(e) => handleClick(onAgreementClick, e)}>
            Пользовательское соглашение
          </Link>
        </li>
      </nav>
      <p className={styles.copyright}>SkillSwap — 2025</p>
    </footer>
  )
});
