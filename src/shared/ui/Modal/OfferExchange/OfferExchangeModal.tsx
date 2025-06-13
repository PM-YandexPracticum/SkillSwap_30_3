import { FC } from 'react';
import { StatusModal } from '../StatusModal';
import { OfferExchangeModalProps } from './types';
import bellIcon from '@shared/assets/icons/bell.png';

export const OfferExchangeModal: FC<OfferExchangeModalProps> = ({
  onClose,
}) => {
  return (
    <StatusModal
      icon={bellIcon}
      iconAlt="Иконка колокола"
      title="Вы предложили обмен"
      description="Теперь дождитесь подтверждения. Вам придёт уведомление"
      dimBackground={true}
      onClose={onClose}
    />
  );
};
