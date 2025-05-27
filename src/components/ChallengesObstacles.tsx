'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Timeline, { Chapter } from './Timeline';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { animateText, animateParagraph } from '@/utils/textAnimation';
import Footer from './Footer';

interface Obstacle {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const obstacles: Obstacle[] = [
  {
    id: 1,
    title: "Market Volatility",
    description: "Navigating through unpredictable market movements",
    icon: "📈",
    color: "from-red-500 to-red-700"
  },
  {
    id: 2,
    title: "Competitors",
    description: "Facing fierce competition in the leaderboard",
    icon: "👥",
    color: "from-blue-500 to-blue-700"
  },
  {
    id: 3,
    title: "Staking Risks",
    description: "Managing risks while climbing the ranks",
    icon: "⚠️",
    color: "from-yellow-500 to-yellow-700"
  }
];

const chapters: Chapter[] = [
  { id: 1, title: "Hero", active: false, path: "/" },
  { id: 2, title: "The Ascent", active: false, path: "/ascent" },
  { id: 3, title: "Challenges", active: true, path: "/challenges" },
  { id: 4, title: "Strategy", active: false, path: "/strategy" },
  { id: 5, title: "Leaderboard", active: false, path: "/leaderboard" },
  { id: 6, title: "Final Push", active: false, path: "/final" }
];

const ChallengesObstacles = () => {
  const router = useRouter();
  const [activeObstacle, setActiveObstacle] = useState(0);
  const [showThought, setShowThought] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  const handleBack = () => {
    router.push('/ascent');
  };

  const handleNextChapter = () => {
    router.push('/strategy');
  };

  useEffect(() => {
    const container = document.getElementById('particles-container');
    if (container) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-white/20 rounded-full';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${5 + Math.random() * 5}s linear infinite`;
        container.appendChild(particle);
      }
    }

    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveObstacle((prev) => (prev + 1) % obstacles.length);
      setShowThought(true);
      setTimeout(() => setShowThought(false), 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // GSAP text animation on mount
  useEffect(() => {
    if (textRef.current) {
      animateParagraph(textRef.current);
    }
  }, []);

  // GSAP title animation
  useEffect(() => {
    if (titleRef.current) {
      animateText(titleRef.current);
    }
  }, []);

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden flex items-center">
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

      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/20" />
      </div>

      {/* Centered Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 min-h-[400px]">
          {/* Left Side Image */}
          <div className="w-full lg:w-1/2 h-[500px] flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-blue-500/20 blur-3xl rounded-full animate-pulse" />
              
              {/* Floating Image */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full h-full"
              >
                <Image
                  src="/png-nobg/challenge.png"
                  alt="Emmy's Challenge"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left min-h-[300px]">
            {/* Animated Text */}
            <div
              className="flex flex-col justify-center space-y-4"
              ref={textRef}
            >
              <div className="space-y-2" ref={titleRef}>
                <div className="text-3xl md:text-4xl font-bold leading-tight">
                  <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center lg:justify-start">
                    <span className="word-span text-white title">Emmy's</span>
                    <span className="word-span bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent title">Challenges</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 justify-center lg:justify-start">
                    <span className="word-span text-white/90 title">Facing</span>
                    <span className="word-span text-red-400 italic font-serif text-4xl md:text-5xl title">obstacles</span>
                  </div>
                </div>
              </div>

              <div className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <span className="subtitle-span inline-block">Navigating</span>{' '}
                <span className="subtitle-span inline-block text-red-400 font-semibold">through</span>{' '}
                <span className="subtitle-span inline-block text-red-400 font-semibold">unpredictable</span>{' '}
                <span className="subtitle-span inline-block">market</span>{' '}
                <span className="subtitle-span inline-block text-yellow-400 font-semibold">movements</span>{' '}
                <span className="subtitle-span inline-block">while</span>{' '}
                <span className="subtitle-span inline-block">facing</span>{' '}
                <span className="subtitle-span inline-block text-yellow-400 font-semibold">fierce</span>{' '}
                <span className="subtitle-span inline-block">competition</span>{' '}
                <span className="subtitle-span inline-block">in</span>{' '}
                <span className="subtitle-span inline-block">the</span>{' '}
                <span className="subtitle-span inline-block text-blue-400 font-semibold">leaderboard</span>{' '}
                <span className="subtitle-span inline-block">and</span>{' '}
                <span className="subtitle-span inline-block text-blue-400 font-semibold">managing</span>{' '}
                <span className="subtitle-span inline-block text-blue-400 font-semibold">staking</span>{' '}
                <span className="subtitle-span inline-block text-blue-400 font-semibold">risks</span>
              </div>

              {/* Obstacle Cards */}
              <div className="content-item mt-4">
                <div className="relative space-y-3 max-w-md mx-auto lg:mx-0">
                  {obstacles.map((obstacle, index) => (
                    <motion.div
                      key={obstacle.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="relative"
                    >
                      <motion.div
                        className="bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 shadow-2xl"
                        animate={{
                          y: [0, index % 2 === 0 ? -8 : 8, 0],
                          rotate: [0, index % 2 === 0 ? 1 : -1, 0]
                        }}
                        transition={{
                          duration: 4 + index,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-gradient-to-r ${obstacle.color} rounded-full flex items-center justify-center`}>
                            <span className="text-white font-bold text-sm">{obstacle.icon}</span>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-sm">{obstacle.title}</h3>
                            <p className="text-white/70 text-xs">{obstacle.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      {/* Footer */}
      <Footer />
    </section>
  );
};

export default ChallengesObstacles;
