import React, { useCallback } from 'react';
import styles from './Footer.module.css';
import { Logo } from './logo/logo';
import { footerProps } from './types';
import { NavItem } from './navItem';

import { Link } from 'react-router-dom';

export const Footer: React.FC<footerProps> = React.memo(({
  onAboutClick,
  onSkilsClick,
  onContactClick,
  onBlogClick,
  onPrivacyClick,
  onAgreementClick
}: footerProps) => {
  const handleClick = useCallback((e: React.MouseEvent, callback?: () => void) => {
    e.preventDefault();
    callback?.();
  }, []);

  return (
    <footer className={styles.footer} aria-label="Подвал">
      <div className={styles.logoBlock}>
        <Logo />
      </div>
      <div className={styles.container}>
        <ul className={styles.buttons_list}>
          <NavItem href="#" title="О проекте" onClick={(e) => handleClick(e, onAboutClick)} />
          <NavItem href="#" title="Все навыки" onClick={(e) => handleClick(e, onSkilsClick)} />
        </ul>
        <ul className={styles.buttons_list}>
          <li className={styles.item}>
            <Link to="#" onClick={(e) => handleClick(e, onContactClick)}>
              Контакты
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="#" onClick={(e) => handleClick(e, onBlogClick)}>
              Блог
            </Link>
          </li>
        </ul>

        <ul className={styles.buttons_list}>
          <li className={styles.item}>
            <Link to="#" onClick={(e) => handleClick(e, onPrivacyClick)}>
              Политика конфиденциальности
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="#" onClick={(e) => handleClick(e, onAgreementClick)}>
              Пользовательское соглашение
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.copyright}>
        <p>SkillSwap — 2025</p>
      </div>
    </footer>
);});
