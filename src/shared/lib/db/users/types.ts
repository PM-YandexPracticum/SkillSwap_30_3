export type TCategoryWantToLearn = {
  id: number;
  name: string;
};

export type TSkillCanTeach = {
  id: number;
  name: string;
  description: string;
};

export type CardPersonInfo = {
  id: number;
  avatarUrl: string;
  name: string;
  location: string;
  age: string;
  gender: string;
  images?: string[];
  skillCanTeach: TSkillCanTeach;
  subcategoriesWantToLearn: TCategoryWantToLearn[];
};
