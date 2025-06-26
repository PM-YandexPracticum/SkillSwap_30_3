export type ClickHandler = () => void;

export type footerProps = {
  onAboutClick?: ClickHandler;
  onSkilsClick?: ClickHandler;
  onContactClick?: ClickHandler;
  onBlogClick?: ClickHandler;
  onPrivacyClick?: ClickHandler;
  onAgreementClick?: ClickHandler;
  onLogo?: ClickHandler;
}