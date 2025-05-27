'use client';

import { usePathname } from 'next/navigation';
import PageTransition from './PageTransition';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

const PageTransitionWrapper = ({ children }: PageTransitionWrapperProps) => {
  const pathname = usePathname();
  
  // Skip transition for home page (which contains hero and intro)
  if (pathname === '/') {
    return <>{children}</>;
  }

  return (
    <PageTransition
      bgColor="rgba(79, 70, 229, 0.95)"
      transitionKey={pathname}
    >
      {children}
    </PageTransition>
  );
};

export default PageTransitionWrapper; 