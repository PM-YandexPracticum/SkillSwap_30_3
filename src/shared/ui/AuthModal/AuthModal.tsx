import React from 'react';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  children: React.ReactNode; // Для левой панели (формы)
  rightPanelContent: React.ReactNode; // Для правой панели
}

export const AuthModal: React.FC<AuthModalProps> = ({
  children,
  rightPanelContent,
}) => {
  return (
    <div className={styles.registrationCard}>
      <div className={styles.leftPanel}>{children}</div>
      <div className={styles.rightPanel}>{rightPanelContent}</div>
    </div>
  );
};
