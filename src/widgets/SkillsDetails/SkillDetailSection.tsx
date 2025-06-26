import React from 'react';
import { CardSkill } from '@/shared/ui/CardSkill';
import { CardPersonInfo } from '@/shared/lib/db/users/types';
import { ImageSlider } from './ImageSlider/ImageSlider';
import style from './SkillDetailSection.module.css';

interface SkillDetailSectionProps {
    user: CardPersonInfo;
    testImages: string[];
}

export const SkillDetailSection: React.FC<SkillDetailSectionProps> = ({ user, testImages }) => {
    return (
        <>
        <div className={style.mainCard}>
            <CardSkill
            person={{
                id: String(user.id),
                avatarUrl: user.avatarUrl,
                name: user.name,
                location: user.location,
                age: String(user.age),
                skillsCanTeach: user.skillCanTeach
                ? [{ id: String(user.skillCanTeach.id), name: user.skillCanTeach.name }]
                : [],
                skillsWantToLearn: user.subcategoriesWantToLearn?.map(sub => ({
                id: String(sub.id),
                name: sub.name
                })) ?? [],
            }}
            onDetailsClick={() => {}}
            toggleFavorite={() => {}}
            isFavorite={false}
            addSkillsCount={0}
            onShowMoreClick={() => {}}
            />
        </div>

        <section className={style.sectionContainer}>
            <div className={style.aboutUser}>
            <div className={style.skillInfo}>
                <h2>{user.skillCanTeach?.name || "Навык не указан"}</h2>
                <p>{user.skillCanTeach?.description || "Описание недоступно"}</p>
                <button className={style.skillButton} onClick={() => alert('Подробнее о навыке')}>
                Подробнее
                </button>
            </div>

            <div className={style.sliderWrapper}>
                <ImageSlider images={testImages} />
            </div>
            </div>
        </section>
        </>
    );
};