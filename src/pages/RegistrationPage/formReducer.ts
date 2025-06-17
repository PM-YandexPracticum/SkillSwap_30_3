import { IFormData } from '@/shared/lib/db/RegistrationForm/types';
import { FormAction } from '@/shared/lib/db/RegistrationForm/types';

export type FormState = {
  formData: IFormData;
  errors: Partial<Record<keyof IFormData, string>>;
  step: number;
};

export const initialState: FormState = {
  formData: {
    name: '',
    email: '',
    password: '',
    birthDate: '',
    gender: '',
    city: '',
    categoryToLearn: '',
    subcategoryToLearn: '',
    skillName: '',
    category: '',
    subcategory: '',
    description: '',
    skillImage: null,
  },
  errors: {},
  step: 1,
};

export const formReducer = (
  state: FormState,
  action: FormAction
): FormState => {
  switch (action.type) {
    case 'SET_FIELD': {
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    }

    case 'SET_ERRORS': {
      return {
        ...state,
        errors: action.errors,
      };
    }

    case 'CLEAR_ERRORS': {
      return {
        ...state,
        errors: {},
      };
    }

    case 'NEXT_STEP': {
      return {
        ...state,
        step: state.step + 1,
        errors: {},
      };
    }

    case 'PREV_STEP': {
      return {
        ...state,
        step: state.step - 1,
        errors: {},
      };
    }

    default:
      return state;
  }
};
