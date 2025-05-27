'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.closest('[role="button"]') !== null;

      setIsHovering(isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className={`fixed pointer-events-none z-50 mix-blend-difference ${
        isHovering ? 'scale-150' : 'scale-100'
      } transition-transform duration-200`}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div
        className={`w-4 h-4 rounded-full border-2 transition-colors duration-200 ${
          isHovering
            ? 'border-amber-400 bg-gradient-to-r from-amber-400/20 via-purple-500/10 to-transparent'
            : 'border-amber-500/60 bg-gradient-to-r from-amber-500/10 via-purple-600/5 to-transparent'
        }`}
      />
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-200 ${
          isClicking ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: isHovering
            ? 'radial-gradient(circle at center, rgba(251, 191, 36, 0.15) 0%, rgba(147, 51, 234, 0.08) 40%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(217, 119, 6, 0.1) 0%, rgba(126, 34, 206, 0.05) 40%, transparent 70%)',
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;