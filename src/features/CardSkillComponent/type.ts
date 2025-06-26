import { TSkill } from "@/shared/lib/db/skills/types";
import { CardPersonInfo } from "@/shared/lib/db/users/types";

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

// для компонента коннектора
export interface CardSkillComponentProps {
  person: CardPersonInfo;
  onClick?: () => void;
  subcategoriesWantToLearn: TSkill[];
}