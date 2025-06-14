export type TSkill = {
  id: number;
  name: string;
};

export type TSubcategory = {
  id: number;
  name: string;
  skills: TSkill[];
};

export type TCategory = {
  category: string;
  subcategory: TSubcategory[];
  icon: string;
  color: string;
};
