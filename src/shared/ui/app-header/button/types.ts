export interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'outline';
    type?: 'button' | 'submit' | 'reset';
}