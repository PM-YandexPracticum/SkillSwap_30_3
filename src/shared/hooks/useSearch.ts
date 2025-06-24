import { CardPersonInfo, TCategoryWantToLearn } from "../lib/db/users/types";

function useSearch (
    data: CardPersonInfo[],
    format: string,
    search: string
  ): CardPersonInfo[] {
  let result = structuredClone(data);

  if (search && search.trim()) {
    const queryLowerCase = search.toLowerCase();

    if(format === 'wantToLearn') {
      result = result.filter((user: CardPersonInfo) => {
        const nameLowerCase = user.skillCanTeach.name.toLowerCase();
        return nameLowerCase.includes(queryLowerCase);
      })
    }

    if(format === 'canTeach') {
      result = result.filter((user: CardPersonInfo) => {
        return user.subcategoriesWantToLearn.some((skill: TCategoryWantToLearn) => {
          const nameLowerCase = skill.name.toLowerCase();
          return nameLowerCase.includes(queryLowerCase);
        })
      })
    } 

    if(format === undefined || format === '') {
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
  }

  return result;
}

export default useSearch;
