import { FC } from 'react';
import { StatusModal } from '../StatusModal';
import { ProposalCreatedModalProps } from './types';
import tickIcon from '@shared/assets/icons/tick.png';

export const ProposalCreatedModal: FC<ProposalCreatedModalProps> = ({
  onClose,
}) => {
  return (
    <StatusModal
      icon={tickIcon}
      iconAlt="Успех"
      title="Ваше предложение создано"
      description="Теперь вы можете предложить обмен"
      dimBackground={true}
      onClose={onClose}
    />
  );
};
