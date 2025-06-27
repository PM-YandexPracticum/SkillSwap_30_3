export interface TextareaWithIconProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: string;
  label?: string;
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}