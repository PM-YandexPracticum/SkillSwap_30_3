import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '../profile-menu-ui';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  return <ProfileMenuUI pathname={pathname} />;
};