'use client';

import { useEffect, useRef, Suspense } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Loader } from '@react-three/drei';
import { Emmy3D } from './Emmy3D';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface IntroScreenProps {
  onComplete: () => void;
}

// Replace any with a proper type
type AnimationRef = {
  current: gsap.core.Timeline | null;
};

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const introRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationRef>({ current: null });

  useEffect(() => {
    // Reset scroll position and hide overflow
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    // Split text for animation
    const titleText = new SplitType('.title-text', { types: 'chars' });
    const subtitleText = new SplitType('.subtitle-text', { types: 'words' });

    // Initial animations for content
    const tl = gsap.timeline({ delay: 0.2 });
    
    // Welcome text animation
    tl.from('.welcome-text', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    })
    // Title characters animation
    .from(titleText.chars, {
      opacity: 0,
      scale: 0,
      y: 80,
      duration: 0.8,
      stagger: {
        each: 0.06,
        from: "random"
      },
      ease: "back.out(1.7)",
    })
    // Subtitle words animation
    .from(subtitleText.words, {
      opacity: 0,
      x: -30,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=0.4")
    // Scroll indicator fade in
    .to(scrollIndicatorRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    });

    // Scroll indicator pulse animation
    const pulseAnimation = gsap.to(scrollIndicatorRef.current, {
      y: 10,
      opacity: 0.6,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Handle scroll to trigger transition
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        window.removeEventListener('wheel', handleScroll);
        pulseAnimation.kill();
        tl.kill();

        gsap.to(contentRef.current, {
          y: '-100vh',
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(contentRef.current, { display: 'none' });
          }
        });

        gsap.to(introRef.current, {
          yPercent: -100,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            document.body.style.overflow = 'auto';
            onComplete();
          }
        });
      }
    };

    window.addEventListener('wheel', handleScroll);
    animationRef.current.current = tl;

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleScroll);
      if (animationRef.current.current) {
        animationRef.current.current.kill();
      }
      gsap.killTweensOf([contentRef.current, introRef.current]);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  return (
    <div
      ref={introRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#FF7F50] text-white min-h-screen w-full"
      style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
    >
      {/* 3D Models Container */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} />
            <Emmy3D position={[-6, 0, 0]} rotation={Math.PI / 6} />
            <Emmy3D position={[6, 0, 0]} rotation={-Math.PI / 6} />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </div>

      <div 
        ref={contentRef} 
        className="relative z-20 max-w-5xl"
        style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
      >
        <div className="text-center px-4">
          <div className="space-y-6">
            {/* Welcome Text */}
            <div 
              className="welcome-text font-light tracking-[0.25em] text-2xl md:text-3xl uppercase text-white title" 
            >
              Welcome to
            </div>

            {/* Main Title */}
            <div ref={titleRef} className="title-text leading-none relative">
              <div className="flex items-center justify-center space-x-6">
                <span 
                  className="text-6xl md:text-8xl font-bold tracking-tight text-white title"
                >
                  Emmy's
                </span>
                <span 
                  className="text-6xl md:text-8xl font-bold tracking-tight text-white title"
                >
                  ASCENT
                </span>
              </div>
              {/* Decorative Line */}
              <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent top-1/2 -z-10 opacity-30" />
            </div>

            {/* Subtitle */}
            <div 
              className="subtitle-text text-xl md:text-2xl font-light tracking-[0.15em] uppercase text-white title"
            >
              <span className="opacity-90">The Race to</span>
              <br />
              <span className="font-medium">Staking Glory</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute left-1/2 transform -translate-x-1/2 mt-24 text-center"
          style={{ opacity: 0, willChange: 'transform' }}
        >
          <div 
            className="text-sm mb-2 font-light tracking-[0.2em] uppercase text-white"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Scroll to begin
          </div>
          <div className="w-6 h-10 border-2 border-white rounded-full mx-auto relative">
            <div className="w-1 h-2 bg-white rounded-full absolute top-2 left-1/2 transform -translate-x-1/2" />
          </div>
        </div>
      </div>

      {/* Loader for 3D model */}
      <Loader />

      {/* Footer */}
      <Footer />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap');

        .title-text {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .title-text > div > span {
          display: inline-block;
          will-change: transform;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          text-shadow: 0 0 40px rgba(0,0,0,0.1);
        }

        .title-text .char {
          display: inline-block;
          will-change: transform;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .subtitle-text .word {
          display: inline-block;
          margin: 0 4px;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;
