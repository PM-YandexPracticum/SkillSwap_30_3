export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
}

export interface NotificationsModalProps {
  notifications: NotificationItem[];
  viewed: NotificationItem[];
  onClose?: () => void;
  onReadAll?: () => void;
  onClearViewed?: () => void;
  onGoToNotification?: (id: string) => void;
}

export interface NotificationSectionProps {
  title: string;
  items: NotificationItem[];
  actionText?: string;
  onAction?: () => void;
  onItemAction?: (id: string) => void;
  itemActionText?: string;
  isViewed: boolean;
}
