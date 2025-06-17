import React, { FC } from 'react';
import styles from './../CardUserInfo/CardUserInfo.module.css';
import type { CardUserInfoProps } from './../types';

const CardUserInfo: FC<CardUserInfoProps> = ({
  name,
  avatarUrl,
  location,
  age,
  skillsCanTeach,
  skillsWantToLearn,
  onShowMoreClick,
  addSkillsCount,
}) => {
  return (
    <div className={styles.card_userInfo}>
      <div className={styles.block_userInfo}>
        <img
          src={avatarUrl}
          alt="Аватар пользователя"
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
          <div className={styles.skill_tags}>
            {skillsCanTeach.map(skill => (
              <span key={skill.id} className={styles.skill_tag}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.skills_WantToLearn}>
          <h4 className={styles.tags_title}>Хочет научиться:</h4>
          <div className={styles.skill_tags}>
            {skillsWantToLearn.map(skill => (
              <span key={skill.id} className={styles.skill_tag}>
                {skill.name}
              </span>
            ))}

            {addSkillsCount > 0 && (
              <button
                type="button"
                onClick={onShowMoreClick}
                className={`${styles.skill_tag} ${styles.skill_tagMore}`}
                aria-label={`Показать ещё ${addSkillsCount} навыков`}
              >
                +{addSkillsCount}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUserInfo;
