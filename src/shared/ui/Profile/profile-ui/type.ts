import { SyntheticEvent } from 'react';

export type ProfileUIProps = {
  formValue: {
    email: string;
    name: string;
    birthDate: string;
    gender: string;
    city: string;
    about: string[] | string;
  };
  cities: string[];
  avatarUrl: string;
  handleSubmit: (e: SyntheticEvent) => void;
  handleEditAvatar: () => void;
  handlePasswordChange: () => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  isFormChanged: boolean;
};
