export interface ProposalReviewModalProps {
  title: string;
  category: string;
  description: string;
  images: string[];
  onClose: () => void;
  onEdit: () => void;
}