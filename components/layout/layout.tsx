import { ReactNode } from 'react';
import MainNavigation from './main-navigation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
}
