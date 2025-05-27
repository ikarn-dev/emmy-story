'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import Timeline, { Chapter } from './Timeline';
import Footer from './Footer';
import PageTransition from './PageTransition';

const Challenges = () => {
  const router = useRouter();
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  // ... (keep the rest of the existing state and refs)

  const handleBack = () => {
    setDirection('left');
    setTimeout(() => {
      router.push('/ascent');
    }, 500);
  };

  const handleNextChapter = () => {
    setDirection('right');
    setTimeout(() => {
      router.push('/strategy');
    }, 500);
  };

  // ... (keep the rest of the existing code)

  return (
    <PageTransition 
      direction={direction} 
      bgColor="rgba(79, 70, 229, 0.95)"
    >
      <section className="h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* ... (keep the rest of the existing JSX) ... */}
      </section>
    </PageTransition>
  );
};

export default Challenges; 