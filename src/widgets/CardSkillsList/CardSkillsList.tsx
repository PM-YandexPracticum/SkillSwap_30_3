import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { CardSkillComponent } from './../../features/CardSkillComponent/CardSkillComponent';
import styles from './CardSkillsList.module.css';
import { CardPersonInfo } from '@/shared/lib/db/users/types';
import { CardSkillsListProps } from './type';

const CONFIG = {
  INITIAL_LOAD_COUNT: 6,
  LOAD_MORE_COUNT: 6,
  SCROLL_THRESHOLD: 0.1,
  LOADING_DELAY: 1000,
};

export const CardSkillsListComponent: React.FC<CardSkillsListProps> = memo(
  ({catalog}) => {
    const [visibleSkills, setVisibleSkills] = useState<CardPersonInfo[]>(
      []
    );
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setVisibleSkills(catalog.slice(0, CONFIG.INITIAL_LOAD_COUNT));
      setHasMore(catalog.length > CONFIG.INITIAL_LOAD_COUNT);
    }, [catalog]);

    const updateSkills = useCallback(
      (newBatch: CardPersonInfo[]) => {
        setVisibleSkills(prev => [...prev, ...newBatch]);
        setHasMore(visibleSkills.length + newBatch.length < catalog.length);
        setIsLoading(false);
      },
      [visibleSkills.length, catalog.length]
    );

    const loadMoreSkills = useCallback(() => {
      if (isLoading || !hasMore) return;

      setIsLoading(true);

      setTimeout(() => {
        const nextBatch = catalog.slice(
          visibleSkills.length,
          visibleSkills.length + CONFIG.LOAD_MORE_COUNT
        );

        if (nextBatch.length === 0) {
          setHasMore(false);
          setIsLoading(false);
          return;
        }

        updateSkills(nextBatch);
      }, CONFIG.LOADING_DELAY);
    }, [isLoading, hasMore, visibleSkills.length, updateSkills, catalog]);

    // настройка Intersection Observer
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          if (
            entries[0].isIntersecting &&
            !isLoading &&
            hasMore
          ) {
            loadMoreSkills();
          }
        },
        { threshold: CONFIG.SCROLL_THRESHOLD }
      );

      const currentLoader = loaderRef.current;

      if (currentLoader && hasMore) {
        observer.observe(currentLoader);
      }

      return () => {
        if (currentLoader) {
          observer.unobserve(currentLoader);
        }
      };
    }, [isLoading, hasMore, loadMoreSkills]);

    return (
      <div className={styles.skills_container}>
        {visibleSkills.map(user => (
          <CardSkillComponent
            key={user.id}
            person={user}
            subcategoriesWantToLearn={user.subcategoriesWantToLearn || []}
          />
        ))}

        <div ref={loaderRef}>
          {isLoading && (
            <div
              className={styles.loading_indicator}
              aria-busy="true"
              aria-label="Идет загрузка"
            >
              <div className={styles.spinner}></div>
              <p className={styles.loading_text}>Загрузка...</p>
            </div>
          )}
        </div>

        {!hasMore && visibleSkills.length > 0 && (
          <div className={styles.end_message}>
            <p className={styles.end_text}>Все карточки загружены</p>
          </div>
        )}
      </div>
    );
  }
);