import styles from './skill-category.module.css';
import React from 'react';
import { TSkillCategoryUIProps } from './type';

export const SkillCategoryUI: React.FC<TSkillCategoryUIProps> = ({
  category,
  subcategory,
  icon,
  color,
  onSkillClick,
}) => {
  const validColors = [
    'EEE7F7',
    'F7E7F2',
    'EBE5C5',
    'E7F2F6',
    'F7EBE5',
    'E9F7E7',
    'E8ECF7',
  ];

  const colorClass =
    color && validColors.includes(color) ? styles[color] : styles['E8ECF7'];

  return (
    <div className={styles.category}>
      <div className={styles.container}>
        <div className={`${styles.icon} ${colorClass}`}>
          {icon && (
            <img
              src={icon}
              alt={category}
              className={styles.img}
              loading="lazy"
            />
          )}
        </div>
        <h2 className={styles.title}>{category}</h2>
      </div>
      <ul className={styles.subcategory}>
        {subcategory.map(skill => (
          <li
            key={skill.name}
            onClick={() => onSkillClick?.(skill.name)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSkillClick?.(skill.name);
              }
            }}
            className={styles.skill}
            tabIndex={0}
            role="button"
          >
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
