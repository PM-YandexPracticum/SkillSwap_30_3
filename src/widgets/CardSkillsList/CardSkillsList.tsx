import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CardSkillComponent } from './../../features/CardSkillComponent/CardSkillComponent';
import { TCardPersonInfoProps } from './../../features/CardSkillComponent/type';
import styles from './CardSkillsList.module.css';

const CONFIG = {
  INITIAL_LOAD_COUNT: 6,
  LOAD_MORE_COUNT: 6,
  SCROLL_THRESHOLD: 0.1,
  LOADING_DELAY: 1000,
};

export const CardSkillsListComponent: React.FC = () => {
  const [skillsData, setSkillsData] = useState<TCardPersonInfoProps[]>([]);
  const [visibleSkills, setVisibleSkills] = useState<TCardPersonInfoProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Загрузка данных
  useEffect(() => {
    setIsLoading(true);

    fetch('/db/users.json')
      .then((res: Response) => {
        if (!res.ok) throw new Error('Ошибка загрузки данных');
        return res.json() as Promise<TCardPersonInfoProps[]>;
      })
      .then((data: TCardPersonInfoProps[]) => {
        setSkillsData(data);
        setVisibleSkills(data.slice(0, CONFIG.INITIAL_LOAD_COUNT));
        setHasMore(data.length > CONFIG.INITIAL_LOAD_COUNT);
      })
      .catch((error: Error) => {
        console.error('Ошибка:', error);
        setSkillsData([]);
      })
      .finally(() => {
        setIsLoading(false);
        setInitialLoadComplete(true);
      });
  }, []);

  const updateSkills = useCallback(
    (newBatch: TCardPersonInfoProps[]) => {
      setVisibleSkills(prev => [...prev, ...newBatch]);
      setHasMore(visibleSkills.length + newBatch.length < skillsData.length);
      setIsLoading(false);
    },
    [visibleSkills.length, skillsData.length]
  );

  const loadMoreSkills = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    setTimeout(() => {
      const nextBatch = skillsData.slice(
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
  }, [isLoading, hasMore, visibleSkills.length, updateSkills, skillsData]);

  // настройка Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          hasMore &&
          initialLoadComplete
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
  }, [isLoading, hasMore, loadMoreSkills, initialLoadComplete]);

  if (!initialLoadComplete) {
    return (
      <div className={styles.skills_container}>
        <div className={styles.loading_indicator}>
          <div className={styles.spinner}></div>
          <p className={styles.loading_text}>Загрузка данных...</p>
        </div>
      </div>
    );
  }

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
};
