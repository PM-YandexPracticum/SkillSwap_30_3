import React, { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { InputField } from '../Input/Input';
import styles from './StepTwo.module.css';
import photo from '../../assets/icons/photo.svg';
import { TCity } from '@shared/lib/db/cities/types';
import { readAllCities } from '@shared/lib/db/cities/utils';
import { TCategory, TSubcategory } from '@shared/lib/db/skills/types';
import { readAllCategories } from '@shared/lib/db/skills/utils';

type StepTwoErrors = Partial<
  Record<'name' | 'city' | 'categoryToLearn' | 'subcategoryToLearn', string>
>;

interface StepTwoFormProps {
  formData: {
    name: string;
    birthDate: string;
    gender: string;
    city: string;
    categoryToLearn: string;
    subcategoryToLearn: string;
  };
  errors: StepTwoErrors;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StepTwoForm: React.FC<StepTwoFormProps> = ({
  formData,
  errors,
  onInputChange,
  onNext,
  onPrev,
}) => {
  const [allCities, setAllCities] = useState<TCity[]>([]);
  const [allCategories, setAllCategories] = useState<TCategory[]>([]);
  const [availableSubcategories, setAvailableSubcategories] = useState<
    TSubcategory[]
  >([]);

  useEffect(() => {
    readAllCities()
      .then(data => {
        setAllCities(data);
      })
      .catch(error => {
        console.error('Failed to load cities:', error);
      });
  }, []);

  useEffect(() => {
    readAllCategories()
      .then(data => {
        setAllCategories(data);
      })
      .catch(error => {
        console.error('Failed to load categories:', error);
      });
  }, []);

  useEffect(() => {
    if (formData.categoryToLearn && allCategories.length > 0) {
      const selectedCategory = allCategories.find(
        (cat: TCategory) => cat.category === formData.categoryToLearn
      );
      if (selectedCategory) {
        setAvailableSubcategories(selectedCategory.subcategory);
      } else {
        setAvailableSubcategories([]);
      }
    } else {
      setAvailableSubcategories([]);
    }
  }, [formData.categoryToLearn, allCategories]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onInputChange(e);
  };

  return (
    <div className={styles.stepTwoForm}>
      <div className={styles.profileIcon}>
        <img src={photo} alt="Иконка профиля" />
      </div>

      <div className={styles.formField}>
        <InputField
          id="name"
          name="name"
          label="Имя"
          placeholder="Введите ваше имя"
          value={formData.name}
          onChange={onInputChange}
          required
        />
        {errors.name && <p className={styles.errorText}>{errors.name}</p>}
      </div>

      <div className={styles.inlineFields}>
        <div className={styles.formField}>
          <InputField
            id="birthDate"
            name="birthDate"
            label="Дата рождения"
            type="date"
            placeholder="ДД.ММ.ГГГГ"
            value={formData.birthDate}
            onChange={onInputChange}
            required
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="gender">Пол</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={onInputChange}
            className={styles.selectField}
          >
            <option value="">Не указан</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
        </div>
      </div>

      <div className={styles.formField}>
        <label htmlFor="city">Город</label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={onInputChange}
          className={styles.selectField}
        >
          <option value="">Не указан</option>
          {allCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <p className={styles.errorText}>{errors.city}</p>}
      </div>

      <div className={styles.formField}>
        <label htmlFor="categoryToLearn">
          Категория навыка, которому хотите научиться
        </label>
        <select
          id="categoryToLearn"
          name="categoryToLearn"
          value={formData.categoryToLearn}
          onChange={handleCategoryChange}
          className={styles.selectField}
        >
          <option value="">Выберите категорию</option>
          {allCategories.map((cat: TCategory) => (
            <option key={cat.category} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>
        {errors.categoryToLearn && (
          <p className={styles.errorText}>{errors.categoryToLearn}</p>
        )}
      </div>

      <div className={styles.formField}>
        <label htmlFor="subcategoryToLearn">
          Подкатегория навыка, которому хотите научиться
        </label>
        <select
          id="subcategoryToLearn"
          name="subcategoryToLearn"
          value={formData.subcategoryToLearn}
          onChange={onInputChange}
          className={styles.selectField}
          disabled={!formData.categoryToLearn}
        >
          <option value="">Выберите подкатегорию</option>
          {availableSubcategories.map(subcat => (
            <option key={subcat.id} value={subcat.name}>
              {subcat.name}
            </option>
          ))}
        </select>
        {errors.subcategoryToLearn && (
          <p className={styles.errorText}>{errors.subcategoryToLearn}</p>
        )}
      </div>

      <div className={styles.modalActions}>
        <Button onClick={onPrev} variant={'back'}>
          Назад
        </Button>
        <Button variant="continue" onClick={onNext}>
          Продолжить
        </Button>
      </div>
    </div>
  );
};
