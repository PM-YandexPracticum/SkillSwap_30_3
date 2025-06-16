import { readSubcategoryById } from '../lib/db/skills/utils';
import {TCategoryWantToLearn, CardPersonInfo} from '../lib/db/users/types';

type Filter = {
  [name: string]: string | string[];
}

function useFilter(
    data: CardPersonInfo[],
    filters: Filter,
    format?: string
  ): CardPersonInfo[] {
  let result = structuredClone(data);

  Object.keys(filters).forEach((field: string) => {
    if (field === 'subcategory') {
      if (filters[field] && filters[field].length){
        if(format === 'Хочу научиться') {
          result = result.filter((user: CardPersonInfo) => {
            if (Array.isArray(filters[field])) {
              return filters[field].includes(String(user.skillCanTeach.id))
            } else {
              return filters[field] === String(user.skillCanTeach.id)
            }
          })
        }

        if(format === 'Могу научить') {
          result = result.filter((user: CardPersonInfo) => {
            return user.subcategoriesWantToLearn.some((skill: TCategoryWantToLearn) => {
              if (Array.isArray(filters[field])) {
                return filters[field].includes(String(skill.id))
              } else {
                return filters[field] === String(skill.id)
              }
            })
          })
        } 

        if(format === 'Всё' || format === undefined || format === '') {
          const canTeachResult = result.filter((user: CardPersonInfo) =>{
            if (Array.isArray(filters[field])) {
              return filters[field].includes(String(user.skillCanTeach.id))
            } else {
              return filters[field] === String(user.skillCanTeach.id)
            }
          })
          const wantToLearnResult = result.filter((user: CardPersonInfo) => {
            return user.subcategoriesWantToLearn.some((skill: TCategoryWantToLearn) =>{
              if (Array.isArray(filters[field])) {
                return filters[field].includes(String(skill.id))
              } else {
                return filters[field] === String(skill.id)
              }
            })
          })

          result = [... new Set([...canTeachResult, ...wantToLearnResult])];
        }
      }
    } else {
      if (filters[field] && filters[field].length){
        result = result.filter((user: CardPersonInfo) =>{
            if (Array.isArray(filters[field])) {
              return filters[field].includes(user[field as keyof CardPersonInfo] as string)
            } else {
              return filters[field] === user[field as keyof CardPersonInfo] as string
            }
          }
        )
      }
    }
  })

  return result;
}

export default useFilter;