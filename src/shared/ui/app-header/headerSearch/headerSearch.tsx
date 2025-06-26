import React from 'react';
import styles from './headerSearch.module.css';
import search from '../../../assets/icons/search.svg';
import type { HeaderSearchProps } from './types';

export const HeaderSearch = ({
    onChange,
    onKeyDown,
    value
}: HeaderSearchProps) => (
    <div className={styles.search}>
        <img src={search} alt="Иконка поиска" loading="lazy" />
        <input
            id="skill-search"
            name="skill"
            type="text"
            placeholder="Искать навык"
            className={styles.searchInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={value}
        />
    </div>
);