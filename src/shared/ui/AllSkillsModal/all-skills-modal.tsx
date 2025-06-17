import React, { memo } from 'react';
import { SkillCategoryUI } from '../SkillCategory';
import styles from './all-skills-modal.module.css';
import { AllSkillsModalProps } from './type';

export const AllSkillsModal: React.FC<AllSkillsModalProps> = memo(
  ({ visible, categories, onClose, onSkillClick }) => {
    const firstColumn = categories.slice(0, Math.ceil(categories.length / 2));
    const secondColumn = categories.slice(Math.ceil(categories.length / 2));

    if (!visible) return null;

    return (
      <>
        {visible && (
          <div className={styles.overlay} onClick={onClose}>
            <div
              className={`${styles.modal} ${visible ? styles.modalVisible : ''} ${categories.length === 0 ? styles.compact : ''}`}
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.content}>
                {categories.length === 0 ? (
                  <div className={styles.emptyMessage}>
                    Категории недоступны сейчас. Воспользуйтесь боковой панелью
                    или поиском.
                  </div>
                ) : (
                  <>
                    <div className={styles.column}>
                      {firstColumn.map(category => (
                        <SkillCategoryUI
                          key={category.category}
                          onSkillClick={onSkillClick}
                          category={category.category}
                          subcategory={category.subcategory}
                          icon={category.icon}
                          color={category.color}
                        />
                      ))}
                    </div>

                    <div className={styles.column}>
                      {secondColumn.map(category => (
                        <SkillCategoryUI
                          key={category.category}
                          onSkillClick={onSkillClick}
                          category={category.category}
                          subcategory={category.subcategory}
                          icon={category.icon}
                          color={category.color}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);
