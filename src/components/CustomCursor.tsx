'use client';

import { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const updateMousePosition = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      // Also update state for initial positioning
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      // Smooth interpolation with faster response
      currentX += (targetX - currentX) * 0.3;
      currentY += (targetY - currentY) * 0.3;

      if (cursorRef.current) {
        const scale = isHovering ? 1.3 : 1;
        const clickScale = isClicking ? 0.8 : 1;
        // FIXED: Use translate(-50%, -50%) to center the cursor properly
        // and separate the positioning from scaling
        cursorRef.current.style.left = `${currentX}px`;
        cursorRef.current.style.top = `${currentY}px`;
        cursorRef.current.style.transform = `translate(-50%, -50%) scale(${scale * clickScale})`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = Boolean(
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' ||
        target.classList.contains('cursor-hover') ||
        target.closest('button, a, input, [role="button"]')
      );
      setIsHovering(isInteractive);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Update position immediately on click
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleMouseUp = () => setIsClicking(false);

    // FIXED: Initialize current position to avoid starting at 0,0
    const initializePosition = (e: MouseEvent) => {
      currentX = e.clientX;
      currentY = e.clientY;
      targetX = e.clientX;
      targetY = e.clientY;
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Add one-time initialization
    const handleInitialMove = (e: MouseEvent) => {
      initializePosition(e);
      document.removeEventListener('mousemove', handleInitialMove);
    };

    document.addEventListener('mousemove', handleInitialMove, { once: true });
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Start animation
    animate();

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovering, isClicking]); // FIXED: Removed dependencies that cause re-initialization

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            opacity: 0.6; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.9; 
            transform: scale(1.05);
          }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: rotate(0deg) scale(0); }
          50% { opacity: 1; transform: rotate(180deg) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <div 
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          // FIXED: Remove inline transform that conflicts with the animated one
          left: 0,
          top: 0,
        }}
      >
        {/* Main cursor circle */}
        <div 
          className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 ${
            isHovering 
              ? 'border-amber-400 bg-gradient-to-r from-amber-400/20 via-purple-500/10 to-transparent' 
              : 'border-amber-500/60 bg-gradient-to-r from-amber-500/10 via-purple-600/5 to-transparent'
          }`}
          style={{
            animation: 'pulseGlow 2s infinite ease-in-out',
            background: isHovering 
              ? 'radial-gradient(circle at center, rgba(251, 191, 36, 0.15) 0%, rgba(147, 51, 234, 0.08) 40%, transparent 70%)'
              : 'radial-gradient(circle at center, rgba(217, 119, 6, 0.1) 0%, rgba(126, 34, 206, 0.05) 40%, transparent 70%)'
          }}
        >
          {/* Inner mystical core */}
          <div 
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'radial-gradient(circle, #d97706 0%, #fbbf24 50%, transparent 100%)',
              animation: 'float 1.5s infinite ease-in-out'
            }}
          />
          
          {/* Rotating outer ring */}
          <div 
            className="absolute inset-0 rounded-full border border-amber-400/30"
            style={{
              animation: 'rotate 8s linear infinite',
              borderStyle: 'dashed'
            }}
          />
          
          {/* Magical sparkles */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-amber-300 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 90}deg) translateY(-12px)`,
                animation: `sparkle 2s infinite ease-in-out ${i * 0.5}s`
              }}
            />
          ))}
        </div>
        
        {/* Hover state enhancement */}
        {isHovering && (
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.1) 0%, transparent 60%)',
              animation: 'pulseGlow 1s infinite ease-in-out'
            }}
          />
        )}
        
        {/* Click ripple effect */}
        {isClicking && (
          <div 
            className="absolute inset-0 rounded-full border-2 border-amber-400/40"
            style={{
              animation: 'pulseGlow 0.3s ease-out'
            }}
          />
        )}
      </div>
    </>
  );
};

export default CustomCursor;