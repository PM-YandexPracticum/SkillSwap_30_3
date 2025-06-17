import React from 'react';
import styles from './headerSearch.module.css';
import search from '../../../assets/icons/search.svg';
import type { HeaderSearchProps } from './types';
import clsx from 'clsx';

export const HeaderSearch = ({
    isAuthenticated,
    onChange,
    onKeyDown,
}: HeaderSearchProps) => (
    <div className={clsx(styles.search, {
        [styles.searchAuth]: isAuthenticated,
        [styles.searchGuest]: !isAuthenticated,
    })}>
        <img src={search} alt="Иконка поиска" loading="lazy" />
        <input
            id="skill-search"
            name="skill"
            type="text"
            placeholder="Искать навык"
            className={styles.searchInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    </div>
);