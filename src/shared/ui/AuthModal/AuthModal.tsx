import React, { useRef, useEffect } from 'react';
import styles from './AuthModal.module.css';
import { AuthModalProps } from './types';

const AuthModalComponent: React.FC<AuthModalProps> = ({
  children,
  rightPanelContent,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Фокусируем первое интерактивное поле при открытии модалки
  useEffect(() => {
    const container = modalRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'input, select, textarea, button'
    );
    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }, []);

  return (
    <div
      ref={modalRef}
      className={styles.registrationCard}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className={styles.leftPanel} id="auth-modal-title">
        {children}
      </div>
      <div className={styles.rightPanel} aria-hidden="true">
        {rightPanelContent}
      </div>
    </div>
  );
};

// Мемоизируем компонент, чтобы избежать лишних рендеров
export const AuthModal = React.memo(AuthModalComponent);
