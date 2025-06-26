import React, { FC, useState, useEffect, useCallback, useMemo } from 'react';
import styles from './../CardUserInfo/CardUserInfo.module.css';
import type { TCardUserInfoProps } from './../types';
import { readSkillColorClass } from './../../../lib/db/skills/utils';
import clsx from 'clsx';

const INITIALLY_VISIBLE_SKILLS_COUNT = 2;

const CardUserInfo: FC<TCardUserInfoProps> = ({
  name,
  avatarUrl,
  location,
  age,
  skillCanTeach,
  subcategoriesWantToLearn,
}) => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [colorClassMap, setColorClassMap] = useState<Record<string, string>>(
    {}
  );

  const skillCanTeachName = useMemo(() => skillCanTeach?.name, [skillCanTeach]);

  const loadColorClasses = useCallback(async () => {
    try {
      const colorMap: Record<string, string> = {};

      // загружаем цвет для основного навыка (если есть)
      if (skillCanTeachName) {
        const skillColor = await readSkillColorClass(
          skillCanTeachName,
          'skill'
        );
        colorMap[skillCanTeachName] = skillColor;
      }

      // Загружаем цвета для подкатегорий
      const subcategoryPromises = subcategoriesWantToLearn
        .filter(subcategory => subcategory?.name)
        .map(subcategory =>
          readSkillColorClass(subcategory.name!, 'subcategory').then(color => ({
            name: subcategory.name!,
            color,
          }))
        );

      const subcategoryColors = await Promise.all(subcategoryPromises);
      subcategoryColors.forEach(({ name, color }) => {
        colorMap[name] = color;
      });

      setColorClassMap(colorMap);
    } catch (error) {
      console.error('Ошибка загрузки цветов:', error);
    }
  }, [skillCanTeachName, subcategoriesWantToLearn]);

  useEffect(() => {
    loadColorClasses();
  }, [loadColorClasses]);

  const [alwaysVisibleSkills, expandableSkills] = useMemo(
    () => [
      subcategoriesWantToLearn.slice(0, INITIALLY_VISIBLE_SKILLS_COUNT),
      subcategoriesWantToLearn.slice(INITIALLY_VISIBLE_SKILLS_COUNT),
    ],
    [subcategoriesWantToLearn]
  );

  const getSkillTagClass = (skillName: string) => {
    const baseClass = styles.skill_tag;
    const colorClass = colorClassMap[skillName]
      ? styles[`skill_tag${colorClassMap[skillName]}`]
      : '';
    return `${baseClass} ${colorClass}`.trim();
  };

  return (
    <div className={styles.card_userInfo}>
      <div className={styles.block_userInfo}>
        <img
          src={avatarUrl}
          alt={`Аватар пользователя ${name}`}
          className={styles.avatar_user}
          loading="lazy"
        />
        <div>
          <h3 className={styles.user_name}>{name}</h3>
          <p className={styles.user_details}>
            {location}, <span>{age}</span>
          </p>
        </div>
      </div>

      <div className={styles.block_userSkills}>
        <div className={styles.skills_canTeach}>
          <h4 className={styles.tags_title}>Может научить:</h4>
          <div className={styles.skill_tags} role="list">
            <span
              className={getSkillTagClass(skillCanTeach.name)}
              aria-label={`Навык: ${skillCanTeach.name}`}
              role="listitem"
            >
              {skillCanTeach.name}
            </span>
          </div>
        </div>

        <div className={styles.skills_WantToLearn}>
          <h4 className={styles.tags_title}>Хочет научиться:</h4>
          <div className={styles.skill_tags} role="list">
            {alwaysVisibleSkills.map(subcategory => (
              <span
                key={subcategory.id}
                className={getSkillTagClass(subcategory.name)}
                role="listitem"
                aria-label={`Навык: ${subcategory.name}`}
              >
                {subcategory.name}
              </span>
            ))}

            {showAllSkills &&
              expandableSkills.map(subcategory => (
                <span
                  key={subcategory.id}
                  className={getSkillTagClass(subcategory.name)}
                  role="listitem"
                  aria-label={`Навык: ${subcategory.name}`}
                >
                  {subcategory.name}
                </span>
              ))}

            {expandableSkills.length > 0 && (
              <button
                type="button"
                onClick={() => setShowAllSkills(!showAllSkills)}
                className={clsx(styles.skill_tag, styles.skill_tagMore)}
                aria-label={`${showAllSkills ? 'Скрыть' : 'Показать'} ещё ${expandableSkills.length} навыков`}
                role="button"
              >
                {showAllSkills ? 'Скрыть' : `+${expandableSkills.length}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUserInfo;
