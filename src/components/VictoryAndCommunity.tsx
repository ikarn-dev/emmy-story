'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Timeline, { Chapter } from './Timeline';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { animateText } from '@/utils/textAnimation';
import Footer from './Footer';

const VictoryAndCommunity = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showConfetti, setShowConfetti] = useState(true);
  const textRef = useRef<HTMLDivElement>(null);

  // Dynamic chapters based on current path
  const chapters: Chapter[] = [
    { id: 1, title: "Hero", active: false, path: "/" },
    { id: 2, title: "The Ascent", active: false, path: "/ascent" },
    { id: 3, title: "Challenges", active: false, path: "/challenges" },
    { id: 4, title: "Strategy", active: false, path: "/strategy" },
    { id: 5, title: "Leaderboard", active: false, path: "/leaderboard" },
    { id: 6, title: "Final Push", active: false, path: "/final" },
    { id: 7, title: "Victory", active: true, path: "/victory" }
  ].map(chapter => ({
    ...chapter,
    active: chapter.path === pathname
  }));

  const handleBack = () => {
    router.push('/final');
  };

  const handleHome = () => {
    router.push('/?skipIntro=true');
  };

  // GSAP Text Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        animateText(textRef.current);
      }
    }, textRef);

    return () => ctx.revert();
  }, []);

  // Trigger confetti on mount
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        setShowConfetti(false);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <Timeline 
        chapters={chapters}
        onNextChapter={handleHome}
        showNextButton={false}
        className="max-w-3xl mx-auto"
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

      {/* Home Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleHome}
        className="fixed bottom-8 right-8 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        🏠 Home
      </motion.button>

      {/* Main Content */}
      <div className="container mx-auto px-4 h-[calc(100vh-6rem)] flex items-center justify-center mt-24 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-7xl">
          {/* Left Column - Emmy's Victory */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
              ref={textRef}
            >
              <div className="text-4xl md:text-5xl font-bold mb-4">
                <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
                  <span className="word-span text-white title">Welcome</span>
                  <span className="word-span text-white title">to</span>
                  <span className="word-span bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent title">the</span>
                  <span className="word-span bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent title">Top</span>
                  <span className="word-span text-white title">1%</span>
                </div>
              </div>

              {/* Stats Dashboard */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-white mb-1">#1</div>
                  <div className="text-white/70 text-sm font-medium">Final Rank</div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-white mb-1">500K</div>
                  <div className="text-white/70 text-sm font-medium">$ME Staked</div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-white mb-1">30d</div>
                  <div className="text-white/70 text-sm font-medium">Journey Time</div>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://magiceden.io/rewards', '_blank')}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:from-purple-600 hover:to-pink-600"
                >
                  Start Your Journey
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://x.com/MagicEden', '_blank')}
                  className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/30"
                >
                  Join Community
                </motion.button>
              </div>

              <div className="relative w-[350px] h-[350px] mx-auto">
                <div className="relative">
                  <Image
                    src="/png-nobg/happy-emmy-unscreen.gif"
                    alt="Happy Emmy"
                    width={350}
                    height={350}
                    className="w-full h-full object-contain mix-blend-screen"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Community Showcase */}
          <div className="relative pt-16">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-3 title">Community Celebration</h3>
              
              {/* Community Stats */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-white/90">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-xs paragraph">Emmy Followers</div>
                </div>
                <div className="text-white/80 text-xs font-medium px-3 py-1.5 bg-white/10 rounded-lg">
                  Powered by ME
                </div>
              </div>

              {/* Community Wall - Fixed Content */}
              <div className="space-y-2">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    <div>
                      <div className="text-white font-medium text-sm title">Emmy&apos;s Community</div>
                      <div className="text-white/70 text-xs paragraph">
                        Join our growing community of staking enthusiasts! 🎉
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    <div>
                      <div className="text-white font-medium text-sm title">Season 2 is Live!</div>
                      <div className="text-white/70 text-xs paragraph">
                        Airdrop coming soon! Don&apos;t miss out! 🚀
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mt-3">
              <h3 className="text-xl font-bold text-white mb-2 title">Achievements Unlocked</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🏆</span>
                  <span className="text-white/90 text-sm paragraph">Reached Top 1%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎯</span>
                  <span className="text-white/90 text-sm paragraph">Qualified for Season 2 Airdrop</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  <span className="text-white/90 text-sm paragraph">Staking Master</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Confetti Container */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .word-span {
          display: inline-block;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default VictoryAndCommunity; 