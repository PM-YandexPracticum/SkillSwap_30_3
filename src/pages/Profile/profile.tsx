import { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import styles from './profile.module.css';
import { ProfileUI } from '@/shared/ui/Profile/profile-ui';
import users from '../../../public/db/users.json';
import cities from '../../../public/db/cities.json';
import defaultAvatar from '@shared/assets/icons/user.svg';
import mockAvatar from '@shared/assets/avatars/user_6.jpg';

export const PageProfile: FC = () => {
  //пока используем мок-данные
  const userId = 6;

  let user;
  try {
    user = users?.find(u => u.id === 6);
  } catch {
    user = undefined;
  }

  if (!user) {
    return (
        <div className={styles.empty}>
          <h2>Пользователь не найден</h2>
          <p>Пожалуйста, проверьте, авторизованы ли вы в системе.</p>
        </div>
    );
  }
  //"Это заглушки: во всех местах, где дата и почта должны быть переменные из user
  //но пока используем мок-данные из макета, т.к. их нет в user.json
  const avatarUrl = mockAvatar;
  const mockBirthDay = '1995-10-28';
  const mockEmail = 'Mariia@gmail.com';

  const [formValue, setFormValue] = useState({
    email: mockEmail,
    name: user?.name ?? '',
    birthDate: mockBirthDay,
    gender: user?.gender ?? '',
    city: user?.location ?? '',
    about: user?.skillCanTeach.description ?? '',
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof typeof formValue, string>>
  >({});

  const validateForm = () => {
    const errors: Partial<typeof formErrors> = {};

    if (!formValue.name.trim()) {
      errors.name = 'Имя должно содержать хотя бы один символ';
    }

    if (!formValue.email.trim()) {
      errors.email = 'Email не может быть пустым';
    } else if (!/^\S+@\S+\.\S+$/.test(formValue.email)) {
      errors.email = 'Введите корректный email';
    } //сюда же можно будет добавить проверки на совпадение емейлов

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    setFormValue(prevState => ({
      ...prevState,
      name: user?.name || '',
      gender: user?.gender || '',
      city: user?.location || '',
      about: user?.skillCanTeach.description || '',
      email: mockEmail,
      birthDate: mockBirthDay,
    }));
  }, [user, mockEmail, mockBirthDay]); //добавляем временно моки

  const handleInputChange = (e: React.ChangeEvent<Element>) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;

    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement
    ) {
      const { name, value } = target;

      setFormValue(prev => ({
        ...prev,
        [name]: value,
      }));

      if (name === 'email') {
        if (!value.trim()) {
          setFormErrors(prev => ({
            ...prev,
            email: 'Email не может быть пустым',
          }));
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          setFormErrors(prev => ({
            ...prev,
            email: 'Введите корректный email',
          }));
        } else {
          setFormErrors(prev => ({ ...prev, email: '' }));
        }
      }

      if (name === 'name') {
        if (!value.trim()) {
          setFormErrors(prev => ({
            ...prev,
            name: 'Имя не может быть пустым',
          }));
        } else {
          setFormErrors(prev => ({ ...prev, name: '' }));
        }
      }
    }
  };

  const handleEditAvatar = () => {
    console.log('Редактирование аватара');
  };

  const handlePasswordChange = () => {
    console.log('Изменение пароля');
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    const dataToSend = {
      email: formValue.email,
      name: formValue.name,
      birthDate: formValue.birthDate,
      gender: formValue.gender,
      city: formValue.city,
      description: formValue.about,
    };
    console.log(dataToSend);
  };

  const isFormChanged = useMemo(() => {
    const userAbout = user?.skillCanTeach?.description ?? '';
    const userName = user?.name ?? '';
    const userCity = user?.location ?? '';
    const userGender = user?.gender ?? '';

    return (
      formValue.name !== userName ||
      formValue.email !== mockEmail ||
      formValue.city !== userCity ||
      formValue.gender !== userGender ||
      formValue.birthDate !== mockBirthDay ||
      formValue.about !== userAbout
    );
  }, [formValue, user, mockEmail, mockBirthDay]); //моки как заглушка

  return (
      <ProfileUI
        formValue={formValue}
        cities={cities}
        avatarUrl={avatarUrl}
        handleSubmit={handleSubmit}
        handleEditAvatar={handleEditAvatar}
        handlePasswordChange={handlePasswordChange}
        handleInputChange={handleInputChange}
        isFormChanged={isFormChanged}
        nameErrorText={formErrors.name}
        emailErrorText={formErrors.email}
      />
  );
};

export default PageProfile;
