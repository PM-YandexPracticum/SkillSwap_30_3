import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import style from './SkillsPage.module.css';
import { AppHeaderConnector } from '@/widgets/AppHeaderConnector/AppHeaderConnector';
import { FooterUI } from '@/shared/ui/footer';
import { CardSkill } from '@/shared/ui/CardSkill';
import { readUserById, readAllUsers } from '@/shared/lib/db/users/utils';
import { CardPersonInfo } from '@/shared/lib/db/users/types';
import { SkillDetailSection } from '@widgets/SkillsDetails/SkillDetailSection';

import img1 from '@/shared/assets/images/user_1_skill_image_1.jpg';
import img2 from '@/shared/assets/images/user_1_skill_image_2.jpg';
import img3 from '@/shared/assets/images/user_1_skill_image_3.jpg';
import img4 from '@/shared/assets/images/user_1_skill_image_4.jpg';
import img5 from '@/shared/assets/images/user_1_skill_image_5.jpg';
import img6 from '@/shared/assets/images/user_1_skill_image_6.jpg';
import img7 from '@/shared/assets/images/user_1_skill_image_7.jpg';

const testImages: string[] = [img1, img2, img3, img4, img5, img6, img7];

export const SkillsPage = () => {
    const handleAboutClick = useCallback(() => {}, []);
    const handleSkillsClick = useCallback(() => {}, []);
    const handleContactClick = useCallback(() => {}, []);
    const handleBlogClick = useCallback(() => {}, []);
    const handlePrivacyClick = useCallback(() => {}, []);
    const handleAgreementClick = useCallback(() => {}, []);

    const { userId: paramUserId } = useParams();
    const userId = paramUserId || "1";
    const [user, setUser] = useState<CardPersonInfo | null>(null);
    const [similarUsers, setSimilarUsers] = useState<CardPersonInfo[]>([]);

    useEffect(() => {
        if (userId) {
        readUserById(Number(userId)).then(fetchedUser => {
            if (fetchedUser) {
            setUser(fetchedUser);
            readAllUsers().then(allUsers => {
                const filtered = allUsers
                .filter(u => u.id !== fetchedUser.id)
                .map(u => {
                    const sameSkill = u.skillCanTeach?.name === fetchedUser.skillCanTeach?.name;
                    const commonSubcats = u.subcategoriesWantToLearn?.filter(sc =>
                    fetchedUser.subcategoriesWantToLearn?.some(fsc => fsc.id === sc.id)
                    ).length ?? 0;

                    return {
                    user: u,
                    score: (sameSkill ? 10 : 0) + commonSubcats
                    };
                })
                .sort((a, b) => b.score - a.score)
                .slice(0, 4)
                .map(item => item.user);

                setSimilarUsers(filtered);
            });
            } else {
            setUser(null);
            }
        });
        }
    }, [userId]);

    return (
        <>
        <AppHeaderConnector />
        <main className={style.skillsPage}>
            {userId ? (
            user ? (
                <div>
                <div className={style.detailedCard}>
                    <SkillDetailSection user={user} testImages={testImages} />
                </div>

                {similarUsers.length > 0 && (
                    <div className={style.similarUsersSection}>
                    <h2>Похожие пользователи</h2>
                    <div className={style.similarUsersGrid}>
                        {similarUsers.map(simUser => (
                        <CardSkill
                            key={simUser.id}
                            person={{
                            id: String(simUser.id),
                            avatarUrl: simUser.avatarUrl,
                            name: simUser.name,
                            location: simUser.location,
                            age: String(simUser.age),
                            skillsCanTeach: simUser.skillCanTeach
                                ? [{ id: String(simUser.skillCanTeach.id), name: simUser.skillCanTeach.name }]
                                : [],
                            skillsWantToLearn: simUser.subcategoriesWantToLearn?.map(sub => ({
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
                        ))}
                    </div>
                    </div>
                )}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '2rem' }}>Пользователь не найден</div>
            )
            ) : (
            <Outlet />
            )}
        </main>
        <FooterUI
            onAboutClick={handleAboutClick}
            onSkilsClick={handleSkillsClick}
            onContactClick={handleContactClick}
            onBlogClick={handleBlogClick}
            onPrivacyClick={handlePrivacyClick}
            onAgreementClick={handleAgreementClick}
        />
        </>
    );
};