import React from 'react';
import styles from './Footer.module.css';
import { AboutNavItem, SkillsNavItem } from './mainNavLink';
import { Logo } from './logo';
import { ClickHandler } from '@/types/common';

type footerProps = {
  onAboutClick?: ClickHandler;
  onSkilsClick?: ClickHandler;
  onContactClick?: ClickHandler;
  onBlogClick?: ClickHandler;
  onPrivicyClick?: ClickHandler;
  onAgreementClick?: ClickHandler;
}

export const Footer = ({
  onAboutClick,
  onSkilsClick,
  onContactClick,
  onBlogClick,
  onPrivicyClick,
  onAgreementClick
}: footerProps) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoBlock}>
        <Logo />
      </div>
      <div className={styles.container}>
        <ul className={styles.buttons_list}>
          <AboutNavItem  onClick={onAboutClick}/>
          <SkillsNavItem onClick={onSkilsClick} />
        </ul>
        <ul className={styles.buttons_list}>
          <li className={styles.item}>
            <a href="#" onClick={onContactClick}>Контакты</a>
          </li>
          <li className={styles.item}>
            <a href="#" onClick={onBlogClick}>Блог</a>
          </li>
        </ul>

        <ul className={styles.buttons_list}>
          <li className={styles.item}>
            <a href="#" onClick={onPrivicyClick}>Политика конфиденциальности</a>
          </li>
          <li className={styles.item}>
            <a href="#" onClick={onAgreementClick}>Пользовательское соглашение</a>
          </li>
        </ul>
      </div>
      <div className={styles.copyright}>
        <p>SkillSwap — 2025</p>
      </div>
    </footer>
  );
};
