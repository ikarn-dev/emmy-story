'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Timeline, { Chapter } from './Timeline';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from './Footer';
import PageTransition from './PageTransition';

const chapters: Chapter[] = [
  { id: 1, title: "Hero", active: false, path: "/" },
  { id: 2, title: "The Ascent", active: true, path: "/ascent" },
  { id: 3, title: "Challenges", active: false, path: "/challenges" },
  { id: 4, title: "Strategy", active: false, path: "/strategy" },
  { id: 5, title: "Leaderboard", active: false, path: "/leaderboard" },
  { id: 6, title: "Final Push", active: false, path: "/final" }
];

const TheAscent = () => {
  const router = useRouter();
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set('.word-span', { 
        opacity: 0, 
        y: 100, 
        rotationX: 90,
        transformOrigin: 'center bottom'
      });
      
      gsap.set('.subtitle-span', { 
        opacity: 0, 
        y: 30,
        scale: 0.8
      });

      gsap.set('.content-item', {
        opacity: 0,
        y: 50
      });

      // Create timeline
      const tl = gsap.timeline();

      // Animate title words
      tl.to('.word-span', {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.4,
        stagger: {
          amount: 0.3,
          ease: "power2.out"
        },
        ease: "back.out(1.7)"
      })
      // Animate subtitle with faster stagger
      .to('.subtitle-span', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out"
      }, "-=0.2")
      // Animate content items
      .to('.content-item', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.2");

    }, textRef);

    return () => ctx.revert();
  }, []);

  const handleBack = () => {
    setTimeout(() => {
      router.push('/');
    }, 150);
  };

  const handleNextChapter = () => {
    setTimeout(() => {
      router.push('/challenges');
    }, 150);
  };

  return (
    <PageTransition 
      bgColor="rgba(79, 70, 229, 0.95)"
      transitionKey="ascent"
    >
      <section className="h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <Timeline 
          chapters={chapters}
          onNextChapter={handleNextChapter}
          showNextButton={true}
        />

        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className="fixed bottom-8 left-8 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 z-50 cursor-hover"
        >
          ← Back
        </motion.button>

        {/* Main Content */}
        <div className="container mx-auto px-4 h-screen flex items-center justify-center relative z-10">
          <div className="max-w-6xl w-full">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              
              {/* Left Column - Main Text */}
              <div ref={textRef} className="space-y-4 text-center lg:text-left">
                {/* Animated Title */}
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold leading-tight">
                    <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center lg:justify-start">
                      <span className="word-span text-white">Emmy&apos;s</span>
                      <span className="word-span bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Leaderboard</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 justify-center lg:justify-start">
                      <span className="word-span text-white/90">Climb</span>
                      <span className="word-span text-pink-400 italic font-serif text-4xl md:text-5xl">begins</span>
                    </div>
                  </div>
                </div>

                {/* Animated Subtitle */}
                <div ref={subtitleRef} className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  <span className="subtitle-span inline-block">Magic</span>{' '}
                  <span className="subtitle-span inline-block">Eden&apos;s</span>{' '}
                  <span className="subtitle-span inline-block text-purple-400 font-semibold">official</span>{' '}
                  <span className="subtitle-span inline-block text-purple-400 font-semibold">avatar</span>{' '}
                  <span className="subtitle-span inline-block">is</span>{' '}
                  <span className="subtitle-span inline-block">on</span>{' '}
                  <span className="subtitle-span inline-block">a</span>{' '}
                  <span className="subtitle-span inline-block text-yellow-400 font-semibold">mission</span>{' '}
                  <span className="subtitle-span inline-block">—</span>{' '}
                  <span className="subtitle-span inline-block">scaling</span>{' '}
                  <span className="subtitle-span inline-block">towers</span>{' '}
                  <span className="subtitle-span inline-block">of</span>{' '}
                  <span className="subtitle-span inline-block">wallets</span>{' '}
                  <span className="subtitle-span inline-block">and</span>{' '}
                  <span className="subtitle-span inline-block">chasing</span>{' '}
                  <span className="subtitle-span inline-block text-pink-400 font-semibold">staking</span>{' '}
                  <span className="subtitle-span inline-block text-pink-400 font-semibold">glory</span>
                </div>

                {/* Animated Stats/Features */}
                <div ref={contentRef} className="space-y-4 pt-2">
                  {/* Removed the text elements as requested */}
                </div>

                {/* Floating Cards - Moved below text */}
                <div className="content-item mt-4">
                  {/* Floating Cards */}
                  <div className="relative space-y-3 max-w-md mx-auto lg:mx-0">
                    <motion.div 
                      className="bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 shadow-2xl"
                      animate={{
                        y: [0, -8, 0],
                        rotate: [0, 1, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">🚀</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-sm">Leaderboard Position</h3>
                          <p className="text-white/70 text-xs">Climbing higher</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 shadow-2xl ml-4"
                      animate={{
                        y: [0, 8, 0],
                        rotate: [0, -1, 0]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">⭐</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-sm">$ME Tokens</h3>
                          <p className="text-white/70 text-xs">Staking rewards</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 shadow-2xl"
                      animate={{
                        y: [0, -4, 0],
                        rotate: [0, 0.5, 0]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">👑</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-sm">Top 1% Goal</h3>
                          <p className="text-white/70 text-xs">The ultimate climb</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Right Column - Space for Image */}
              <div className="relative h-[500px] flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full relative"
                >
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-full h-full"
                  >
                    <Image
                      src="/png-nobg/theascent.png"
                      alt="The Ascent"
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </motion.div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />

        <style jsx global>{`
          @keyframes subtle-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-subtle-float {
            animation: subtle-float 4s ease-in-out infinite;
          }
        `}</style>
      </section>
    </PageTransition>
  );
};

export default TheAscent;