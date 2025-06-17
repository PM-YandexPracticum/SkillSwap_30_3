import { TCategory, TSkill, TSubcategory } from '@shared/lib/db/skills/types';

export function readAllCategories(): Promise<TCategory[]> {
  return fetch('/db/skills.json')
    .then(response => response.json())
    .then(data => data as TCategory[])
    .catch(error => {
      console.error('Error fetching skills data:', error);
      return [];
    });
}

export function readCategoryByName(
  name: string
): Promise<TCategory | undefined> {
  return readAllCategories().then(categories => {
    return categories.find(category => category.category === name);
  });
}

export function readSubcategoryByName(
  subcategoryName: string
): Promise<TSubcategory | undefined> {
  return readAllCategories().then(categories => {
    for (const category of categories) {
      const subcategory = category.subcategory.find(
        sub => sub.name === subcategoryName
      );
      if (subcategory) {
        return subcategory;
      }
    }
    return undefined;
  });
}

export function readSubcategoryById(
  subcategoryId: number
): Promise<TSubcategory | undefined> {
  return readAllCategories().then(categories => {
    for (const category of categories) {
      const subcategory = category.subcategory.find(
        sub => sub.id === subcategoryId
      );
      if (subcategory) {
        return subcategory;
      }
    }
    return undefined;
  });
}

export function readSkillByName(
  skillName: string
): Promise<TSkill | undefined> {
  return readAllCategories().then(categories => {
    for (const category of categories) {
      for (const subcategory of category.subcategory) {
        const skill = subcategory.skills.find(
          skill => skill.name === skillName
        );
        if (skill) {
          return skill;
        }
      }
    }
    return undefined;
  });
}

export function readSkillById(skillId: number): Promise<TSkill | undefined> {
  return readAllCategories().then(categories => {
    for (const category of categories) {
      for (const subcategory of category.subcategory) {
        const skill = subcategory.skills.find(skill => skill.id === skillId);
        if (skill) {
          return skill;
        }
      }
    }
    return undefined;
  });
}
