import React from 'react';
import styles from './CardSkill.module.css';
import ButtonDetail from './../CardSkill/ButtonDetail/ButtonDetail';
import ButtonFavorite from './../CardSkill/ButtonFavorite/ButtonFavorite';
import CardUserInfo from './../CardSkill/CardUserInfo/CardUserInfo';
import type { CardSkillProps } from './types';

export const CardSkill: React.FC<CardSkillProps> = React.memo(
  ({ person, onDetailsClick, toggleFavorite, isFavorite, onClick }) => {
    return (
      <article role="article" className={styles.container_card}>
        <div className={styles.container_cardInfo}>
          <CardUserInfo
            id={person.id}
            name={person.name}
            avatarUrl={person.avatarUrl}
            location={person.location}
            gender={person.gender}
            age={person.age}
            skillCanTeach={person.skillCanTeach}
            onClick={onClick}
            subcategoriesWantToLearn={person.subcategoriesWantToLearn}
          />

          <ButtonFavorite
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        </div>

        <ButtonDetail onClick={onDetailsClick} />
      </article>
    );
  }
);
