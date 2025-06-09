import { FC, memo } from 'react';
import { NotificationsModalProps, NotificationSectionProps } from './types';
import styles from './NotificationsModal.module.css';
import lightbulbIcon from '@shared/assets/icons/lightbulb.png';

const NotificationSection: FC<NotificationSectionProps> = memo(
  ({
    title,
    items,
    actionText,
    onAction,
    onItemAction,
    itemActionText,
    isViewed,
  }) => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {actionText && onAction && (
          <button className={styles.actionButton} onClick={onAction}>
            {actionText}
          </button>
        )}
      </div>
      <div
        className={`${styles.itemsList} ${items.length > 2 ? (isViewed ? styles.scrollableViewed : styles.scrollableNew) : ''}`}
      >
        {items.map(item => (
          <div
            key={item.id}
            className={`${styles.notificationItem} ${isViewed ? styles.viewedItem : styles.newItem}`}
          >
            <div className={styles.notificationTop}>
              <div className={styles.iconContainer}>
                <img
                  src={lightbulbIcon}
                  alt="Иконка уведомления"
                  className={styles.lightbulbIcon}
                />
              </div>
              <div className={styles.content}>
                <div className={styles.titleRow}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.time}>{item.time}</span>
                </div>
                <p className={styles.description}>{item.description}</p>
              </div>
            </div>
            {itemActionText && onItemAction && (
              <button
                className={styles.acceptButton}
                onClick={() => onItemAction(item.id)}
              >
                {itemActionText}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
);

export const NotificationsModal: FC<NotificationsModalProps> = memo(
  ({
    notifications,
    viewed,
    onClose,
    onReadAll,
    onClearViewed,
    onGoToNotification,
  }) => {
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <NotificationSection
            title="Новые уведомления"
            items={notifications}
            actionText="Прочитать все"
            onAction={onReadAll}
            onItemAction={onGoToNotification}
            itemActionText="Перейти"
            isViewed={false}
          />

          <NotificationSection
            title="Просмотренные"
            items={viewed}
            actionText="Очистить"
            onAction={onClearViewed}
            isViewed={true}
          />
        </div>
      </div>
    );
  }
);
