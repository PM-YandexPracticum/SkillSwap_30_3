export type Skill = {
  id: number;
  name: string;
};

// для компонента - информация пользователя
export type TCardPersonInfoProps = {
  id: number;
  avatarUrl: string;
  name: string;
  location: string;
  age: string;
  skillCanTeach: {
    id: number; 
    name: string;
  };
  subcategoriesWantToLearn: Skill[];
};

// для кнопки +2
export type TCardUserInfoProps = TCardPersonInfoProps & {
  onClick?: () => void;
};

// для целикового компонента
export interface CardSkillProps {
  person: TCardPersonInfoProps;
  onDetailsClick: () => void;
  toggleFavorite?: () => void;
  isFavorite?: boolean;
  onClick?: () => void;
}

// для компонента коннектора
export interface CardSkillComponentProps {
  person: TCardPersonInfoProps;
  onClick?: () => void;
  subcategoriesWantToLearn: Skill[];
}