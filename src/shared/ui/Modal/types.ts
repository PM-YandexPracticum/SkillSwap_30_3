import { ReactNode } from 'react';

export interface ModalProps {
  content: ReactNode;
  onClose: () => void;
  dimBackground?: boolean;
}
