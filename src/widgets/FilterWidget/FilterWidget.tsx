import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './FilterWidget.module.css';

import { FilterWidgetProps } from './type';
import { RadioUI } from '@/shared/ui/Radio';
import { CheckboxUI } from '@/shared/ui/Checkbox';
import { FilterButtonUI } from '@/shared/ui/FilterButton';
import arrowDown from '@/shared/assets/icons/chevron-down.svg';
import cross from '@/shared/assets/icons/cross.svg';
import useFilter from '@/shared/hooks/useFilter';
import { readAllCategories } from '@/shared/lib/db/skills/utils';
import { readAllCities } from '@/shared/lib/db/cities/utils';
import { TCategory } from '@/shared/lib/db/skills/types';
import { CardPersonInfo } from '@/shared/lib/db/users/types';
import { readAllUsers } from '@/shared/lib/db/users/utils';
import { Preloader } from '@/shared/ui/Preloader';

export const FilterWidget: FC<FilterWidgetProps>= memo(
  ({setFilteredUsers, setIsFilterLoading, setIsCatalogLoading}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const formatParams = useMemo(() => searchParams.get('format') || '', [searchParams.get('format')]);
    const subсategoryParams = useMemo(() => searchParams.getAll('subсategory'), [String(searchParams.getAll('subсategory'))]);
    const genderParams = useMemo(() => searchParams.get('gender') || '', [searchParams.get('gender')]);
    const locationParams = useMemo(() => searchParams.getAll('location'), [String(searchParams.getAll('location'))]);
    
    const [isWidgetLoading, setIsWidgetLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<CardPersonInfo[]>([]);
    const [citiesOption, setSitiesOption] = useState<string[]>([]);
    const [skillsOption, setSkillsOption] = useState<TCategory[]>([]);

    useEffect(() => {
      Promise.all([readAllUsers(), readAllCities(), readAllCategories()])
      .then(([usersResponse, citiesResponse, categoriesResponse]) => {
        setUsers(usersResponse);
        setSitiesOption(citiesResponse);
        setSkillsOption(categoriesResponse);

        setIsWidgetLoading(false);
      }).catch(error => {
        console.error('Получение данных о навыках, городах и пользователях', error);
      });

      return () => {
        setUsers([]);
        setSitiesOption([]);
        setSkillsOption([]);

        setIsWidgetLoading(true);
      }
    }, []);

    useEffect(() => {      
      if (!isWidgetLoading){
        setIsCatalogLoading(true);
        setIsFilterLoading(true);
        setFilteredUsers(useFilter(
          users,
          {
            subcategory: subсategoryParams,
            gender: genderParams,
            location: locationParams
          },
          formatParams
        ));
        setIsFilterLoading(false);
      }

      return () => {
        setFilteredUsers([]);
        setIsFilterLoading(true);
      }
    }, [formatParams, subсategoryParams, genderParams, locationParams, isWidgetLoading]);

    const formatOption = [
      {
        title: 'Всё',
        value: ''
      },
      {
        title: 'Хочу научиться',
        value: 'wantToLearn'
      },
      {
        title: 'Могу научить',
        value: 'canTeach'
      }
    ];

    const genderOption = [
      {
        title: 'Не имеет значения',
        value: ''
      },
      {
        title: 'Мужской',
        value: 'Мужской'
      },
      {
        title: 'Женский',
        value: 'Женский'
      }
    ];

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === ''){
        searchParams.delete(e.target.name);
        setSearchParams(searchParams);
      } else {
        searchParams.set(e.target.name, e.target.value);
        setSearchParams(searchParams);
      }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if ((searchParams.getAll(e.target.name) || []).includes(e.target.value)) {
        searchParams.delete(e.target.name, e.target.value);
        setSearchParams(searchParams);
      } else {
        searchParams.append(e.target.name, e.target.value);
        setSearchParams(searchParams);
      }
    };

    const [categories, setCategories] = useState<string[]>([]);
    const handleCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (categories.includes(e.target.value)) {
        setCategories(categories.filter((category) => category !== e.target.value));
      } else {
        setCategories([...categories, e.target.value]);
      }
    };

    const [isOpenCities, setIsOpenCities] = useState<boolean>();
    const [isOpenCategories, setIsOpenCategories] = useState<boolean>();

    if (isWidgetLoading) {
      return (
        <aside className={`${styles.container} ${styles.preloader}`}>
          <Preloader />
        </aside>
      )
    }

    return (
      <aside className={styles.container}>
        {Array.from(searchParams.entries()).filter(([key]) => key !== 'search').length ? (
          <div className={styles.title_container}>
            <h3 className={styles.title}>
              Фильтры ({Array.from(searchParams.entries()).filter(([key]) => key !== 'search').length})
            </h3>
            <FilterButtonUI
              title={'Сбросить'}
              icon={cross}
              onClick={() => {
                Array.from(searchParams.entries()).map(([key]) => {
                  if (key !== 'search') {
                    searchParams.delete(key);
                    setSearchParams(searchParams);
                  }
                })
              }}
            />
          </div>
        ) : (
          <h3 className={styles.title}>Фильтры</h3>
        )}
        <form className={styles.form}>
          <fieldset className={styles.group}>
            {formatOption.map((format) => (
              <RadioUI
                key={format.value}
                name='format'
                value={format.value}
                title={format.title}
                checked={format.value === formatParams}
                onChange={handleRadioChange}
              />
            ))}
          </fieldset>
          <div className={styles.form_item}>
            <h4 className={styles.field_title}>Навыки</h4>
            <fieldset className={styles.group}>
              {skillsOption.map((skill, index) => {
                if (isOpenCategories) {
                  return (
                    <div className={styles.сategory} key={`${skill.category}-container`}>
                      <CheckboxUI
                        key={skill.category}
                        name='сategory'
                        value={skill.category}
                        title={skill.category}
                        checked={categories.includes(skill.category)}
                        onChange={handleCategoriesChange}
                      />
                      {categories.includes(skill.category) &&
                        <fieldset 
                          className={styles.group}
                          key={`${skill.category}-group`}
                        >
                          {skill.subcategory.map((subсategory) => (
                            <CheckboxUI
                              key={subсategory.id}
                              name='subсategory'
                              value={String(subсategory.id)}
                              title={subсategory.name}
                              checked={subсategoryParams.includes(String(subсategory.id))}
                              onChange={handleCheckboxChange}
                            />
                          ))}
                        </fieldset>
                      }
                    </div>
                  );
                } else {
                  if (index < 5) {
                    return (
                      <div className={styles.сategory} key={`${skill.category}-container`}>
                        <CheckboxUI
                          key={skill.category}
                          name='сategory'
                          value={skill.category}
                          title={skill.category}
                          checked={categories.includes(skill.category)}
                          onChange={handleCategoriesChange}
                        />
                        {categories.includes(skill.category) &&
                          <fieldset 
                            className={styles.group}
                            key={`${skill.category}-group`}
                          >
                            {skill.subcategory.map((subсategory) => (
                              <CheckboxUI
                                key={subсategory.id}
                                name='subсategory'
                                value={String(subсategory.id)}
                                title={subсategory.name}
                                checked={subсategoryParams.includes(String(subсategory.id))}
                                onChange={handleCheckboxChange}
                              />
                            ))}
                          </fieldset>
                        }
                      </div>
                    );
                  }
                }
              })}
            </fieldset>
            {!isOpenCategories &&
              <FilterButtonUI 
                title={'Все категории'}
                icon={arrowDown}
                onClick={() => {setIsOpenCategories(true)}}
              />
            }
          </div>
          <div className={styles.form_item}>
            <h4 className={styles.field_title}>Пол автора</h4>
            <fieldset className={styles.group}>
              {genderOption.map((gender) => (
                <RadioUI
                  key={gender.value}
                  name='gender'
                  value={gender.value}
                  title={gender.title}
                  checked={gender.value === genderParams}
                  onChange={handleRadioChange}
                />
              ))}
            </fieldset>
          </div>
          <div className={styles.form_item}>
            <h4 className={styles.field_title}>Город</h4>
            <fieldset className={styles.group}>
              {citiesOption.map((location, index) => {
                if (isOpenCities) {
                  return (
                    <CheckboxUI
                      key={location}
                      name="location"
                      value={location}
                      title={location}
                      checked={locationParams.includes(location)}
                      onChange={handleCheckboxChange}
                    />
                  );
                } else {
                  if (index < 5) {
                    return (
                      <CheckboxUI
                        key={location}
                        name="location"
                        value={location}
                        title={location}
                        checked={locationParams.includes(location)}
                        onChange={handleCheckboxChange}
                      />
                    );
                  }
                }
              })}
            </fieldset>
            {!isOpenCities &&
              <FilterButtonUI 
                title={'Все категории'}
                icon={arrowDown}
                onClick={() => {setIsOpenCities(true)}}
              />
            }
          </div>
        </form>
      </aside>
    );
  }
);