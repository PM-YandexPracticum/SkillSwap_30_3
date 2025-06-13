import { FC, useCallback } from 'react';
import { Modal } from '../Modal';
import { StatusModalProps } from './types';
import styles from './StatusModal.module.css';

export const StatusModal: FC<StatusModalProps> = ({
  icon,
  iconAlt,
  title,
  description,
  dimBackground = true,
  onClose,
}) => {
  const handleDoneClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal
      content={
        <div className={`${styles.modalContent}`}>
          <div className={styles.iconContainer}>
            <img src={icon} alt={iconAlt} className={styles.icon} />
          </div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <button className={`${styles.doneButton}`} onClick={handleDoneClick}>
            Готово
          </button>
        </div>
      }
      onClose={onClose}
      dimBackground={dimBackground}
    />
  );
};
