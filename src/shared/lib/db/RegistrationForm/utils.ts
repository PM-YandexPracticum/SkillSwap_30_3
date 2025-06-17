import { IFormData, ValidatorFn } from './types';

export const validationRules: {
  [step: number]: Partial<{
    [K in keyof IFormData]: ValidatorFn<IFormData[K]>;
  }>;
} = {
  1: {
    email: (value: string) => {
      if (!value) return 'Email обязателен для заполнения';
      if (!/\S+@\S+\.\S+/.test(value)) return 'Некорректный формат email';
      return undefined;
    },
    password: (value: string) => {
      if (!value) return 'Пароль обязателен для заполнения';
      if (value.length < 8)
        return 'Пароль должен содержать не менее 8 символов';
      return undefined;
    },
  },
  2: {
    name: (value: string) =>
      !value ? 'Имя обязательно для заполнения' : undefined,
    city: (value: string) => (!value ? 'Город обязателен' : undefined),
  },
  3: {
    skillName: (value: string) =>
      !value ? 'Укажите название навыка' : undefined,
    category: (value: string) => (!value ? 'Выберите категорию' : undefined),
  },
};

// Имитация асинхронной проверки email в базе данных
export const checkEmailExists = async (email: string): Promise<boolean> => {
  if (email.includes('petrov')) return true;
  return false;
};
