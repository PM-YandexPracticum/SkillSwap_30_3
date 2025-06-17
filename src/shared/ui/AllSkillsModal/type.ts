export type SkillCategory = {
  category: string;
  subcategory: string[];
  icon: string;
  color: string;
};

export type AllSkillsModalProps = {
  visible: boolean;
  categories: SkillCategory[];
  onClose?: () => void;
  onSkillClick?: (skill: string) => void;
};