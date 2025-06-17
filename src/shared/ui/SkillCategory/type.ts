export type TSkillCategoryUIProps = {
  category: string;
  subcategory: string[];
  icon: string;
  color: string;
  onSkillClick?: (skill: string) => void;
};
