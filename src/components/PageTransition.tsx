'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
  direction: 'left' | 'right';
  bgColor: string;
  transitionKey?: string | number;
  onTransitionComplete?: () => void;
}

const PageTransition = ({ 
  children, 
  direction, 
  bgColor,
  transitionKey,
  onTransitionComplete
}: PageTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevTransitionKey = useRef(transitionKey);

  useEffect(() => {
    if (prevTransitionKey.current !== transitionKey && transitionKey !== undefined) {
      animateTransition();
      prevTransitionKey.current = transitionKey;
    }
  }, [transitionKey, direction, bgColor]);

  const animateTransition = () => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    
    if (!overlay || !content) return;

    // Create GSAP timeline for perfect sequencing
    const tl = gsap.timeline({
      onComplete: () => {
        onTransitionComplete?.();
      }
    });

    // Set initial positions
    gsap.set(overlay, {
      x: direction === 'right' ? '100%' : '-100%',
      scaleX: 1,
      transformOrigin: direction === 'right' ? 'left' : 'right'
    });

    gsap.set(content, {
      opacity: 0,
      y: 20,
      scale: 0.98
    });

    // Animation sequence
    tl
      // Slide overlay in (covers screen)
      .to(overlay, {
        x: '0%',
        duration: 0.6,
        ease: 'power2.out'
      })
      // Brief hold
      .to({}, { duration: 0.08 })
      // Slide overlay out while fading in content
      .to(overlay, {
        x: direction === 'right' ? '-100%' : '100%',
        duration: 0.6,
        ease: 'power2.in'
      })
      .to(content, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.35'); // Start content animation before overlay finishes
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
    >
      {/* Sliding overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-50 will-change-transform"
        style={{ 
          background: bgColor,
          transform: `translateX(${direction === 'right' ? '100%' : '-100%'})`
        }}
      />
      
      {/* Content */}
      <div
        ref={contentRef}
        className="relative w-full h-full will-change-transform"
      >
        {children}
      </div>
    </div>
  );
};

export default PageTransition;