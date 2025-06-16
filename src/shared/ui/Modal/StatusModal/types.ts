export interface StatusModalProps {
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  dimBackground?: boolean;
  onClose: () => void;
}
