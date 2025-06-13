import { FC, useMemo, useCallback } from 'react';
import { Modal } from '../Modal';
import { ProposalReviewModalProps } from './types';
import styles from './ProposalReviewModal.module.css';
import placeholderIcon from '@shared/assets/icons/placeholder.png';
import editIcon from '@shared/assets/icons/edit.png';

export const ProposalReviewModal: FC<ProposalReviewModalProps> = ({
  title,
  category,
  description,
  images,
  onClose,
  onEdit,
}) => {
  const handleDoneClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleEditClick = useCallback(() => {
    onEdit();
  }, [onEdit]);

  const renderImages = useMemo(() => {
    const displayImages = images.slice(0, 4);
    const remainingCount = images.length - 4;

    if (displayImages.length === 0) return null;

    const firstImage = displayImages[0];
    const sideImages = displayImages.slice(1, 4);
    const showOverlay = sideImages.length === 3 && remainingCount > 0;

    return (
      <>
        <div className={styles.mainImageWrapper}>
          <img
            src={firstImage || placeholderIcon}
            alt="Основное изображение навыка"
            className={styles.mainImage}
          />
        </div>

        {sideImages.length > 0 && (
          <div className={styles.sideImagesWrapper}>
            {sideImages.map((image, index) => {
              const isLastSideImage = index === 2 && showOverlay;

              return (
                <div key={index + 1} className={styles.sideImageWrapper}>
                  <img
                    src={image || placeholderIcon}
                    alt={`Вспомогательное изображение навыка ${index + 2}`}
                    className={styles.sideImage}
                  />
                  {isLastSideImage && (
                    <div className={styles.imageOverlay}>
                      <span className={styles.remainingCount}>
                        +{remainingCount}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }, [images]);

  const modalContent = useMemo(
    () => (
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2 className={styles.modalTitle}>Ваше предложение</h2>
          <p className={styles.modalSubtitle}>
            Пожалуйста, проверьте и подтвердите правильность данных
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.textContent}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.category}>{category}</p>
            <p className={styles.description}>{description}</p>

            <div className={styles.buttons}>
              <button className={styles.editButton} onClick={handleEditClick}>
                <span>Редактировать</span>
                <img
                  src={editIcon}
                  alt="Иконка редактирования"
                  className={styles.editIcon}
                />
              </button>
              <button className={styles.doneButton} onClick={handleDoneClick}>
                Готово
              </button>
            </div>
          </div>

          <div className={styles.imageGallery}>{renderImages}</div>
        </div>
      </div>
    ),
    [
      title,
      category,
      description,
      renderImages,
      handleDoneClick,
      handleEditClick,
    ]
  );

  return (
    <Modal content={modalContent} onClose={onClose} dimBackground={true} />
  );
};
