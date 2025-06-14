import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationPage.module.css';
import { StepOne } from '@/shared/ui/Step/StepOne';
import { StepTwoForm } from '@/shared/ui/Step/StepTwo';
import { StepThreeForm } from '@/shared/ui/Step/StepThree';
import { AuthModal } from '@/shared/ui/AuthModal/AuthModal';
import { Button } from '@/shared/ui/Button/Button';
import lamp from '../shared/assets/icons/lamp.svg';
import logo from '../shared/assets/icons/logo.svg';
import about from '../shared/assets/icons/about.svg';
import StepThreeIcon from '../shared/assets/icons/StepThree.svg';
import close from '../shared/assets/icons/close.svg';

interface IFormData {
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

// Тип для объекта с ошибками.

type IFormErrors = Partial<Record<keyof IFormData, string>>;

type ValidatorFn = (value: any) => string | undefined;

const validationRules: Record<
  number,
  Partial<Record<keyof IFormData, ValidatorFn>>
> = {
  1: {
    email: value => {
      if (!value) return 'Email обязателен для заполнения';
      if (!/\S+@\S+\.\S+/.test(value)) return 'Некорректный формат email';
      return undefined;
    },
    password: value => {
      if (!value) return 'Пароль обязателен для заполнения';
      if (value.length < 8)
        return 'Пароль должен содержать не менее 8 символов';
      return undefined;
    },
  },
  2: {
    name: value => (!value ? 'Имя обязательно для заполнения' : undefined),
    city: value => (!value ? 'Город обязателен' : undefined),
  },
  3: {
    skillName: value => (!value ? 'Укажите название навыка' : undefined),
    category: value => (!value ? 'Выберите категорию' : undefined),
  },
};

// Имитация асинхронной проверки email в базе данных
const checkEmailExists = async (email: string): Promise<boolean> => {
  if (email.includes('petrov')) return true;
  return false;
};

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<IFormData>({
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
  });
  const [errors, setErrors] = useState<IFormErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const validate = (currentStep: number, data: IFormData): IFormErrors => {
    const newErrors: IFormErrors = {};
    const rulesForStep = validationRules[currentStep];

    for (const key in rulesForStep) {
      const field = key as keyof IFormData;
      const validator = rulesForStep[field];
      if (validator) {
        const error = validator(data[field]);
        if (error) {
          newErrors[field] = error;
        }
      }
    }
    return newErrors;
  };

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target as {
        name: keyof IFormData;
        value: string;
      };
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setFormData(prev => ({ ...prev, skillImage: e.target.files![0] }));
      }
    },
    []
  );

  const handleNextStep = useCallback(async () => {
    const validationErrors = validate(step, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (step === 1) {
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setErrors({ email: 'Email уже используется' });
        return;
      }
    }

    setErrors({});
    setStep(prev => prev + 1);
  }, [step, formData]);

  const handlePrevStep = useCallback(() => {
    setErrors({});
    setStep(prev => prev - 1);
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const handleSubmit = useCallback(() => {
    const finalErrors = validate(3, formData);
    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }
    console.log('ОТПРАВКА ДАННЫХ:', formData);
    // будет логика отправки на сервер
    navigate('/'); //навигация на "Ваше предлжение"
  }, [formData]);

  const rightPanelContent = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <div className={styles.rightPanel}>
            <img src={lamp} alt="Лампочка"></img>
            <h2 className={styles.welcomeTitle}>
              Добро пожаловать в SkillSwap!
            </h2>
            <p className={styles.welcomeText}>
              Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками
              с другими людьми
            </p>
          </div>
        );
      case 2:
        return (
          <>
            <img src={about} alt='Человек рассказывающий о себе'></img>
            <h2 className={styles.welcomeTitle}>Расскажите немного о себе</h2>
            <p>
              Это поможет другим людям лучше вас узнать, чтобы выбрать
              для обмена
            </p>
          </>
        );
      case 3:
        return (
          <>
            <img src={StepThreeIcon} alt='Доска с записями'></img>
            <h2 className={styles.welcomeTitle}>
              Укажите, чем вы готовы поделиться
            </h2>
            <p>
              Так другие люди смогут увидеть ваши предложения и предложить
              вам обмен!
            </p>
          </>
        );
      default:
        return null;
    }
  }, [step]);

  return (
    <div className={styles.pageLayout}>
      <div className={styles.contentWrapper}>
        <header className={styles.mainHeader}>
          <div className={styles.logo}>
            <h1>
              <img
                src={logo}
                className={styles.logo}
                alt="SkillSwap Logo"
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
              />
              <span className={styles.logoBold}>SkillSwap</span>
            </h1>
          </div>
          <Button
            variant="back"
            onClick={() => navigate('/')}
            className={styles.closeButton}
          >
            Закрыть
            <img src={close}></img>
          </Button>
        </header>
        <main className={styles.mainContent}>
          <div className={styles.stepTracker}>
            <h2 className={styles.stepTitle}>Шаг {step} из 3</h2>
            <div className={styles.progressBars}>
              <div
                className={`${styles.bar} ${step >= 1 ? styles.filled : ''}`}
              />
              <div
                className={`${styles.bar} ${step >= 2 ? styles.filled : ''}`}
              />
              <div
                className={`${styles.bar} ${step >= 3 ? styles.filled : ''}`}
              />
            </div>
          </div>
          <AuthModal rightPanelContent={rightPanelContent}>
            {step === 1 && (
              <StepOne
                formData={{
                  email: formData.email,
                  password: formData.password,
                }}
                errors={errors}
                onInputChange={handleInputChange}
                onNext={handleNextStep}
                isPasswordVisible={isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            )}
            {step === 2 && (
              <StepTwoForm
                formData={formData}
                onInputChange={handleInputChange}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
                errors={errors}
              />
            )}
            {step === 3 && (
              <StepThreeForm
                formData={formData}
                onInputChange={handleInputChange}
                onFileChange={handleFileChange}
                onNext={handleSubmit}
                onPrev={handlePrevStep}
                errors={errors}
              />
            )}
          </AuthModal>
        </main>
      </div>
    </div>
  );
};
