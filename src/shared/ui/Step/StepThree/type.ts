type StepThreeErrors = Partial<
  Record<'skillName' | 'category' | 'subcategory' | 'description', string>
>;

export interface StepThreeFormProps {
  formData: {
    skillName: string;
    category: string;
    subcategory: string;
    description: string;
    skillImage: File | null;
  };
  errors: StepThreeErrors;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onPrev: () => void;
}
