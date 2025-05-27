'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroScreen from '@/components/IntroScreen';
import Hero from '@/components/Hero';

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = introComplete ? 'auto' : 'hidden';
    
    if (introComplete) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 100);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [introComplete]);

  return (
    <main 
      className="relative min-h-screen bg-white overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <AnimatePresence mode="wait">
        {!introComplete && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <IntroScreen onComplete={() => setIntroComplete(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
            style={{ 
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
            }}
          >
            <Hero />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        * {
          backface-visibility: hidden;
        }
      `}</style>
    </main>
  );
}
