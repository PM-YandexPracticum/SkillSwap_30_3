import { FC } from 'react';
import clsx from 'clsx';
import styles from './profile.module.css';
import { ProfileUIProps } from './type';
import { InputField } from '../../Input';
import edit from '@shared/assets/icons/edit.svg';
import { InputWithIcon } from '../input-with-icon';
import { Button } from '../../Button';
import buttonStyles from '../../Button/Button.module.css';
import { ProfileAvatar } from '../profile-avatar';
import testAvatar from '@shared/assets/avatars/user_1.jpg';
import TextareaWithIcon from '../textarea/textarea';
import DropdownSelect from '../dropdown/dropdown';
import { ProfileMenuUI } from '../profile-menu-ui';

export const ProfileUI: FC<ProfileUIProps> = ({
  cities,
  formValue,
  avatarUrl,
  emailErrorText,
  nameErrorText,
  handleSubmit,
  handleInputChange,
  handleEditAvatar,
  handlePasswordChange,
  isFormChanged,
}) => {
  const hasErrors = !!emailErrorText || !!nameErrorText;

  return (
    <div className={styles.container}>
      <div className={`${styles.block} ${styles.menu}`}>
        <ProfileMenuUI />
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
                smallText={emailErrorText}
                hasError={!!emailErrorText}
              />
              <button
                type="button"
                className={`${styles.linkButton}`}
                onClick={handlePasswordChange}
              >
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
              smallText={nameErrorText}
              hasError={!!nameErrorText}
            />
            <div className={`${styles.flex} ${styles.margin}`}>
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
                  name="gender"
                  options={['Мужской', 'Женский']}
                  value={formValue.gender}
                  onChange={handleInputChange}
                  placeholder='Не выбран'
                />
              </div>
            </div>
            <div className={styles.margin}>
              <DropdownSelect
                id={'city'}
                label={'Город'}
                name="city"
                options={cities}
                value={formValue.city}
                onChange={handleInputChange}
                placeholder='Не выбран'
              />
            </div>
            <div className={styles.margin}>
              <TextareaWithIcon
                id={'description'}
                label={'О себе'}
                value={formValue.about}
                name="about"
                onChange={handleInputChange}
                placeholder="Напишите о себе и своих навыках"
              />
            </div>
            <Button
              className={clsx(
                buttonStyles.button,
                buttonStyles.submitButton,
                styles.formButton,
                { [styles.buttonDisabled]: !isFormChanged || hasErrors }
              )}
              disabled={!isFormChanged || hasErrors}
              variant={'submit'}
              children={'Сохранить'}
            ></Button>
          </>
        </form>
        <ProfileAvatar avatarUrl={avatarUrl} onEdit={handleEditAvatar} />
      </div>
    </div>
  );
};

export default ProfileUI;
