import React, { useCallback, useState } from 'react';
import { Header } from '@/shared/ui/app-header/app-header';
import { AllSkillsModal } from '@/shared/ui/AllSkillsModal';
import { categories } from '@/shared/ui/AllSkillsModal/mockCategories';

export const AppHeaderConnector = () => {
    const [isSkillsModalVisible, setSkillsModalVisible] = useState(false);

    const isAuthenticated = false;

    const handleSkillsToggle = useCallback(() => {
        setSkillsModalVisible(true);
    }, []);

    const handleCloseSkillsModal = useCallback(() => {
        setSkillsModalVisible(false);
    }, []);

    return (
        <>
        <Header
            isAuthenticated={isAuthenticated}
            userName="Мария"
            avatarUrl=""
            onLogin={() => {}}
            onRegister={() => {}}
            onThemeToggle={() => {}}
            onNotificationsClick={() => {}}
            onFavoritesClick={() => {}}
            onSkillsToggle={handleSkillsToggle}
        />
        <AllSkillsModal
            visible={isSkillsModalVisible}
            categories={categories}
            onClose={handleCloseSkillsModal}
        />
        </>
    );
};