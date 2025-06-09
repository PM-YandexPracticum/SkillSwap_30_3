import React from 'react';
import styles from '../app-header/header.module.css';
import search from '../../assets/img/search.svg';

type HeaderSearchProps = {
    isAuthenticated: boolean;
};

export const HeaderSearch = ({ isAuthenticated }: HeaderSearchProps) => {
    return (
        <div
            className={`${styles.search} ${
            isAuthenticated ? styles.searchAuth : styles.searchGuest
            }`}
        >
        <img src={search} alt="Поиск" />
        <input
            id="skill-search"
            name="skill"
            type="text"
            placeholder="Искать навык"
            className={styles.searchInput}
        />
        </div>
    );
};