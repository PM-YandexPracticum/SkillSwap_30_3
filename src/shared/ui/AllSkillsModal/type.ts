import { TCategory } from "@/shared/lib/db/skills/types";

export type AllSkillsModalProps = {
  visible: boolean;
  categories: TCategory[];
  onClose?: () => void;
  onSkillClick?: (skill: string) => void;
};