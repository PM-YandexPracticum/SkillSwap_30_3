import React, { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { InputField } from '../../Input/Input';
import styles from './StepThree.module.css';
import loadImg from '@shared/assets/icons/loadImg.svg';
import { TCategory, TSubcategory, TSkill } from '@shared/lib/db/skills/types';
import { readAllCategories } from '@shared/lib/db/skills/utils';
import { StepThreeFormProps } from './type';

const StepThreeComponent: React.FC<StepThreeFormProps> = ({
  formData,
  errors,
  onInputChange,
  onFileChange,
  onNext,
  onPrev,
}) => {
  const [allCategories, setAllCategories] = useState<TCategory[]>([]);
  const [availableSubcategories, setAvailableSubcategories] = useState<
    TSubcategory[]
  >([]);
  const [, setAvailableSkills] = useState<TSkill[]>([]);

  //загрузка категории при монтировании компонента
  useEffect(() => {
    readAllCategories()
      .then(data => {
        setAllCategories(data);
      })
      .catch(error => {
        console.error('Failed to load categories:', error);
      });
  }, []);

  //Для категории
  useEffect(() => {
    if (formData.category && allCategories.length > 0) {
      const selectedCategory = allCategories.find(
        (cat: TCategory) => cat.category === formData.category
      );
      if (selectedCategory) {
        setAvailableSubcategories(selectedCategory.subcategory);
      } else {
        setAvailableSubcategories([]);
      }
    } else {
      setAvailableSubcategories([]);
    }
  }, [formData.category, allCategories]);

  //Для подкатегории
  useEffect(() => {
    if (formData.subcategory && availableSubcategories.length > 0) {
      const selectedSubcategory = availableSubcategories.find(
        (subcat: TSubcategory) => subcat.name === formData.subcategory
      );
      if (selectedSubcategory) {
        setAvailableSkills(selectedSubcategory.skills);
      } else {
        setAvailableSkills([]);
      }
    } else {
      setAvailableSkills([]);
    }
  }, [formData.subcategory, availableSubcategories]);

  // Обработчик изменения для категории, чтобы сбросить подкатегорию и навык
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onInputChange(e);
  };
  // Обработчик изменения для подкатегории, чтобы сбросить навык
  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onInputChange(e);
  };

  return (
    <div className={styles.stepThreeForm}>
      <div className={styles.formField}>
        <InputField
          id="skillName"
          name="skillName"
          label="Название навыка"
          placeholder="Введите название вашего навыка"
          value={formData.skillName}
          onChange={onInputChange}
          required
        />
        {errors.skillName && (
          <p className={styles.errorText}>{errors.skillName}</p>
        )}
      </div>

      <div className={styles.formField}>
        <label htmlFor="category">Категория навыка</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleCategoryChange}
          className={styles.selectField}
          required
        >
          <option value="">Выберите категорию навыка</option>
          {allCategories.map((cat: TCategory) => (
            <option key={cat.category} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className={styles.errorText}>{errors.category}</p>
        )}
      </div>

      <div className={styles.formField}>
        <label htmlFor="subcategory">Подкатегория навыка</label>
        <select
          id="subcategory"
          name="subcategory"
          value={formData.subcategory}
          onChange={handleSubcategoryChange}
          className={styles.selectField}
          disabled={!formData.category}
        >
          <option value="">Выберите подкатегорию навыка</option>
          {availableSubcategories.map(subcat => (
            <option key={subcat.id} value={subcat.name}>
              {subcat.name}
            </option>
          ))}
        </select>
        {errors.subcategory && (
          <p className={styles.errorText}>{errors.subcategory}</p>
        )}
      </div>

      <div className={styles.formField}>
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          name="description"
          placeholder="Коротко опишите, чему можете научить"
          value={formData.description}
          onChange={onInputChange}
          rows={4}
          className={styles.textAreaField}
          required
        ></textarea>
        {errors.description && (
          <p className={styles.errorText}>{errors.description}</p>
        )}
      </div>
      <div className={styles.formField}>
        <label htmlFor="skillImage" className={styles.fileUploadContainer}>
          <input
            type="file"
            id="skillImage"
            name="skillImage"
            onChange={onFileChange}
            className={styles.fileInput}
            accept="image/*"
          />
          <div className={styles.uploadContent}>
            <span className={styles.dragDropText}>
              Перетащите или выберите изображения навыка
            </span>
            <button type="button" className={styles.selectImageButton}>
              <span className={styles.folderIcon}></span>
              <img
                src={loadImg}
                alt="Изображение загрузки"
                loading="lazy"
              ></img>
              Выбрать изображения
            </button>
            {formData.skillImage && (
              <span className={styles.fileName}>
                {formData.skillImage.name}
              </span>
            )}
          </div>
        </label>
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

export const StepThreeForm = React.memo(StepThreeComponent);
