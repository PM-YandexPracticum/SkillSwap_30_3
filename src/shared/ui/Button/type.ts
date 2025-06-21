export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'google' | 'apple' | 'continue' | 'submit' | 'back';
  children: React.ReactNode;
}
