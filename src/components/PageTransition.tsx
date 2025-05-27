'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  transitionKey: string;
  direction?: 'left' | 'right';
  bgColor?: string;
}

const PageTransition = ({ children, transitionKey, direction = 'left', bgColor = 'bg-indigo-900' }: PageTransitionProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const animateTransition = () => {
    if (overlayRef.current) {
      const overlay = overlayRef.current;
      overlay.style.opacity = '1';
      setTimeout(() => {
        overlay.style.opacity = '0';
      }, 500);
    }
  };

  useEffect(() => {
    animateTransition();
  }, [transitionKey, direction, bgColor]);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={transitionKey}
          initial={{ x: direction === 'left' ? '100%' : '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === 'left' ? '-100%' : '100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 transition-opacity duration-500 pointer-events-none z-50`}
        style={{ opacity: 0 }}
      />
    </div>
  );
};

export default PageTransition;