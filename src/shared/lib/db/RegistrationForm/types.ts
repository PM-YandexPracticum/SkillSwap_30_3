export interface IFormData {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  gender: string;
  city: string;
  categoryToLearn: string;
  subcategoryToLearn: string;
  skillName: string;
  category: string;
  subcategory: string;
  description: string;
  skillImage: File | null;
}

export type IFormErrors = Partial<Record<keyof IFormData, string>>;

export type ValidatorFn<T> = (value: T) => string | undefined;

export type FormAction =
  | {
      type: 'SET_FIELD';
      field: keyof IFormData;
      value: IFormData[keyof IFormData];
    }
  | { type: 'SET_ERRORS'; errors: IFormErrors }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' };

export interface FormState {
  formData: IFormData;
  errors: IFormErrors;
  step: number;
}
