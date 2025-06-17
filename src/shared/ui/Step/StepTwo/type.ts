type StepTwoErrors = Partial<
  Record<'name' | 'city' | 'categoryToLearn' | 'subcategoryToLearn', string>
>;

export interface StepTwoFormProps {
  formData: {
    name: string;
    birthDate: string;
    gender: string;
    city: string;
    categoryToLearn: string;
    subcategoryToLearn: string;
  };
  errors: StepTwoErrors;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onNext: () => void;
  onPrev: () => void;
}
