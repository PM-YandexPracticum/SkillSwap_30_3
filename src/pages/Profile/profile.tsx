import { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import PageLayoutConnector from '../PageLayoutConnector';
import { ProfileUI } from '@/shared/ui/Profile/profile-ui';
import users from '../../../public/db/users.json';
import cities from '../../../public/db/cities.json';
import defaultAvatar from '@shared/assets/icons/user.svg';
import mockAvatar from '@shared/assets/avatars/user_6.jpg';

export const PageProfile: FC = () => {
  //пока используем мок-данные
  const userId = 6;
  const user = users.find(u => u.id === userId);
  const avatarUrl = mockAvatar;

  //"Это заглушки: во всех местах, где дата и почта должны быть переменные из user
  //но пока используем мок-данные из макета, т.к. их нет в user.json
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
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValue(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditAvatar = () => {
    console.log('Редактирование аватара');
  };

  const handlePasswordChange = () => {
    console.log('Изменение пароля');
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    
    const dataToSend = {
    email: formValue.email,
    name: formValue.name,
    birthDate: formValue.birthDate,
    gender: formValue.gender,
    city: formValue.city,
    description: formValue.about
    }
    console.log(dataToSend);
  };

  const isFormChanged = useMemo(() => {
    return (
      formValue.name !== user?.name ||
      formValue.email !== mockEmail ||
      formValue.city !== user?.location ||
      formValue.gender !== user?.gender ||
      formValue.birthDate !== mockBirthDay ||
      formValue.about !== user?.skillCanTeach?.description
    );
  }, [formValue, user]);

  return (
    <PageLayoutConnector>
      <ProfileUI
        formValue={formValue}
        cities={cities}
        avatarUrl={avatarUrl}
        handleSubmit={handleSubmit}
        handleEditAvatar={handleEditAvatar}
        handlePasswordChange={handlePasswordChange}
        handleInputChange={handleInputChange}
        isFormChanged={isFormChanged}
      />
    </PageLayoutConnector>
  );
};

export default PageProfile;
