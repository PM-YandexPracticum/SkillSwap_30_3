import { CardPersonInfo } from "@/shared/lib/db/users/types";

export type ButtonDetailProps = {
  onClick?: () => void;
};

export type ButtonFavoriteProps = {
  isFavorite?: boolean;
  toggleFavorite?: () => void;
}

// для кнопки +2
export type TCardUserInfoProps = CardPersonInfo & {
  onClick?: () => void;
};

// для целикового компонента
export interface CardSkillProps {
  person: CardPersonInfo;
  onDetailsClick: () => void;
  toggleFavorite?: () => void;
  isFavorite?: boolean;
  onClick?: () => void;
}