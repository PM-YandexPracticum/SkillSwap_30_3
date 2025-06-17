export type IconType = 'theme' | 'notifications' | 'favorites';
export interface IconButtonProps {
    icon: IconType;
    onClick?: () => void;
    title?: string;
}