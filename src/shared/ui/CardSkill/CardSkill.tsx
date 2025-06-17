import React from 'react';
import styles from './CardSkill.module.css';
import ButtonDetail from './../CardSkill/ButtonDetail/ButtonDetail';
import ButtonFavorite from './../CardSkill/ButtonFavorite/ButtonFavorite';
import CardUserInfo from './../CardSkill/CardUserInfo/CardUserInfo';
import type { CardSkillProps } from './types';

const CardSkill: React.FC<CardSkillProps> = ({
  person,
  onDetailsClick,
  toggleFavorite,
  isFavorite,
  addSkillsCount,
  onShowMoreClick,
}) => {
  return (
    <article role="article" className={styles.container_card}>
      <div className={styles.container_cardInfo}>
        <CardUserInfo
          id={person.id}
          name={person.name}
          avatarUrl={person.avatarUrl}
          location={person.location}
          age={person.age}
          skillsCanTeach={person.skillsCanTeach}
          skillsWantToLearn={person.skillsWantToLearn}
          onShowMoreClick={onShowMoreClick}
          addSkillsCount={addSkillsCount}
        />

        <ButtonFavorite
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      </div>

      <ButtonDetail onClick={onDetailsClick} />
    </article>
  );
};

export default React.memo(CardSkill);
