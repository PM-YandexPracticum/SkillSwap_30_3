import { FC, useEffect, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { ModalProps } from './types';
import styles from './Modal.module.css';

export const Modal: FC<ModalProps> = ({
  content,
  onClose,
  dimBackground = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', handleKeyDown);

    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className={clsx(styles.overlay, {
        [styles.dimmed]: dimBackground,
      })}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={styles.modal}
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        {content}
      </div>
    </div>
  );
};
