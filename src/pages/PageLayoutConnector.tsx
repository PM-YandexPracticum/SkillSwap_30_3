import { AppHeaderConnector } from "@/shared/widgets/header/AppHeaderConnector";
import { Footer } from "@/shared/ui/footer";
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const PageLayoutConector = ({ children }: LayoutProps) => (
  <>
    <AppHeaderConnector />
    <main>{children}</main>
    <Footer />
  </>
);

export default PageLayoutConector ;