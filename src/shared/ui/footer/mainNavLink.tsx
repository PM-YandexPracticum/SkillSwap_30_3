import styles from './Footer.module.css';
import React from "react";

interface AboutNavItemProps {
  onClick?: () => void;
}

export const AboutNavItem: React.FC<AboutNavItemProps> = ({ onClick }) => (
  <li className={styles.item}>
    <a href="#" onClick={onClick}>
      О проекте
    </a>
  </li>
);

interface SkillsNavItemProps {
  onClick?: () => void;
}

export const SkillsNavItem: React.FC<SkillsNavItemProps> = ({ onClick }) => (
  <li className={styles.item}>
    <a href="#" onClick={onClick}>
      Все навыки
    </a>
  </li>
);

