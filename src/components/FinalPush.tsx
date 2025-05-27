'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
import Timeline, { Chapter } from './Timeline';
import { animateText } from '@/utils/textAnimation';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const chapters: Chapter[] = [
  { id: 1, title: "Hero", active: false, path: "/" },
  { id: 2, title: "The Ascent", active: false, path: "/ascent" },
  { id: 3, title: "Challenges", active: false, path: "/challenges" },
  { id: 4, title: "Strategy", active: false, path: "/strategy" },
  { id: 5, title: "Leaderboard", active: false, path: "/leaderboard" },
  { id: 6, title: "Final Push", active: true, path: "/final" }
];

const FinalPush = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const emmyRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleBack = () => {
    router.push('/leaderboard');
  };

  const handleNextChapter = () => {
    router.push('/victory');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Emmy image animation - entrance and subtle floating
      gsap.fromTo(emmyRef.current, 
        {
          opacity: 0,
          scale: 0.95
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          onComplete: () => {
            // Add subtle floating animation
            gsap.to(emmyRef.current, {
              y: -10,
              duration: 2,
              ease: "power1.inOut",
              yoyo: true,
              repeat: -1
            });
          }
        }
      );

      // Animate text content
      if (textRef.current) {
        animateText(textRef.current);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden flex flex-col">
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
        className="fixed bottom-8 left-8 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        ← Back
      </motion.button>

      {/* Main Content Container */}
      <div className="flex-1 flex items-center justify-between px-12 py-8 max-w-7xl mx-auto w-full gap-16">
        {/* Text Content - Left Side */}
        <div ref={textRef} className="w-1/2">
          <div className="text-animate bg-white/10 backdrop-blur-md rounded-2xl p-10 shadow-2xl border border-white/20">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold leading-tight">
                <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center lg:justify-start">
                  <span ref={(el) => { wordRefs.current[0] = el }} className="word-span text-white title">
                    Emmy&apos;s
                  </span>
                  <span ref={(el) => { wordRefs.current[1] = el }} className="word-span bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent title">
                    Final
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 justify-center lg:justify-start">
                  <span ref={(el) => { wordRefs.current[2] = el }} className="word-span text-white/90 title">
                    Push
                  </span>
                  <span ref={(el) => { wordRefs.current[3] = el }} className="word-span text-pink-400 italic font-serif text-4xl md:text-5xl title">
                    begins
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-white/80 font-normal mt-8 paragraph">
              <span className="subtitle-span">Emmy stands at the threshold of greatness, ready to make her final push to the top. Through careful planning and perfect timing, she has mastered the art of staking. The top 1% awaits, and with determination and skill, Emmy claims her place among the elite stakers of the ecosystem.</span>
            </p>
          </div>
        </div>

        {/* Emmy Image - Right Side */}
        <div className="w-1/2 flex justify-end">
          <div ref={emmyRef} className="relative w-[450px] h-[450px]">
            <Image
              src="/png-nobg/top-emmy.png"
              alt="Emmy"
              width={450}
              height={450}
              className="w-full h-full object-contain filter drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Footer */}
      <Footer />
    </section>
  );
};

export default FinalPush;