export type ButtonDetailProps = {
  onClick?: () => void;
};

export type ButtonFavoriteProps = {
  isFavorite: boolean;
  toggleFavorite: () => void;
};

export type Skill = {
  id: string;
  name: string;
};

export type CardPersonInfoProps = {
  id: string;
  avatarUrl: string;
  name: string;
  location: string;
  age: string;
  skillsCanTeach: Skill[];
  skillsWantToLearn: Skill[];
};

export type CardUserInfoProps = CardPersonInfoProps & {
  onShowMoreClick?: () => void;
  addSkillsCount: number;
};

export interface CardSkillProps {
  person: CardPersonInfoProps;
  onDetailsClick: () => void;
  toggleFavorite: () => void;
  isFavorite: boolean;
  onShowMoreClick?: () => void;
  addSkillsCount: number;
}