export interface StepOneProps {
  formData: {
    email: string;
    password: string;
  };
  errors: {
    email?: string;
    password?: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
}
