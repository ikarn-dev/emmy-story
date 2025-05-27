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
      direction="right"
      bgColor="linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)"
      transitionKey={pathname}
    >
      {children}
    </PageTransition>
  );
};

export default PageTransitionWrapper; 