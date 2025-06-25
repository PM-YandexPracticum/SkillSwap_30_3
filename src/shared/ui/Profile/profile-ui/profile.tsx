import { FC } from 'react';
import styles from './profile.module.css';
import { ProfileMenu } from '../profile-menu';
import { ProfileUIProps } from './type';
import { InputField } from '../../Input';
import edit from '@shared/assets/icons/edit.svg';
import calendar from '@shared/assets/icons/calendar.svg';
import { InputWithIcon } from '../input-with-icon';
import { Button } from '../../Button';
import buttonStyles from '../../Button/Button.module.css';
import { ProfileAvatar } from '../profile-avatar';
import testAvatar from '@shared/assets/avatars/user_1.jpg';
import TextareaWithIcon from '../textarea/textarea';
import DropdownSelect from '../dropdown/dropdown';

export const ProfileUI: FC<ProfileUIProps> = ({
  cities,
  formValue,
  avatarUrl,
  handleSubmit,
  handleInputChange,
  handleEditAvatar,
  handlePasswordChange,
  isFormChanged,
}) => (
  <div className={styles.container}>
    <div className={`${styles.block} ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <div className={`${styles.block} ${styles.profile}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <>
          <div>
            <InputWithIcon
              type="text"
              id="email"
              name="email"
              label="Почта"
              placeholder="Введите почту"
              value={formValue.email}
              onChange={handleInputChange}
              icon={edit}
            />
            <button type="button" className={styles.linkButton} onClick={handlePasswordChange}>
              Изменить пароль
            </button>
          </div>

          <InputWithIcon
            type="text"
            id="name"
            name="name"
            label="Имя"
            placeholder="Введите ваше имя"
            value={formValue.name}
            onChange={handleInputChange}
            icon={edit}
          />
          <div className={styles.flex}>
            <div className={`${styles.flexItem} ${styles.inputDate}`}>
              <InputField
                id="birthDate"
                name="birthDate"
                label="Дата рождения"
                type="date"
                placeholder="ДД.ММ.ГГГГ"
                value={formValue.birthDate}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.flexItem}>
              <DropdownSelect
                id={'gender'}
                label={'Пол'}
                name='gender'
                options={['Мужской', 'Женский']}
                value={formValue.gender}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DropdownSelect
            id={'city'}
            label={'Город'}
            name='city'
            options={cities}
            value={formValue.city}
            onChange={handleInputChange}
          />
          <TextareaWithIcon
            id={'description'}
            label={'О себе'}
            value={formValue.about}
            icon={edit}
            placeholder="Напишите о себе и своих навыках"
          />
          <Button
            className={`${buttonStyles.button} ${buttonStyles.submitButton} ${styles.formButton} ${!isFormChanged ? styles.buttonDisabled : ''}`}
            disabled={!isFormChanged}
            variant={'submit'}
            children={'Сохранить'}
          ></Button>
        </>
      </form>
      <ProfileAvatar avatarUrl={avatarUrl} onEdit={handleEditAvatar} />
    </div>
  </div>
);

export default ProfileUI;
