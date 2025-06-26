import { TSubcategory } from "@/shared/lib/db/skills/types";

export type TSkillCategoryUIProps = {
  category: string;
  subcategory: TSubcategory[];
  icon: string;
  color: string;
  onSkillClick?: (skill: string) => void;
};
