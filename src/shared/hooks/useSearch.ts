import {TCategoryWantToLearn, CardPersonInfo} from '../lib/db/users/types';


function useSearch (
    data: CardPersonInfo[],
    search: string
  ): CardPersonInfo[] {
  let result = structuredClone(data);

  if (search && search.trim()) {
    const queryLowerCase = search.toLowerCase();
    
    const canTeachResult = result.filter((user: CardPersonInfo) => {
        const nameLowerCase = user.skillCanTeach.name.toLowerCase();
      return nameLowerCase.includes(queryLowerCase);
    })
    const wantToLearnResult = result.filter((user: CardPersonInfo) => {
      return user.subcategoriesWantToLearn.some((skill: TCategoryWantToLearn) => {
        const nameLowerCase = skill.name.toLowerCase();
        return nameLowerCase.includes(queryLowerCase);
      })
    })

    result = [... new Set([...canTeachResult, ...wantToLearnResult])];
  }

  return result;
}

export default useSearch;