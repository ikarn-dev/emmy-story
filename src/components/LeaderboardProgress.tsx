'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import Timeline, { Chapter } from './Timeline';
import Footer from './Footer';
import PageTransition from './PageTransition';

const chapters: Chapter[] = [
  { id: 1, title: "Hero", active: false, path: "/" },
  { id: 2, title: "The Ascent", active: false, path: "/ascent" },
  { id: 3, title: "Challenges", active: false, path: "/challenges" },
  { id: 4, title: "Strategy", active: false, path: "/strategy" },
  { id: 5, title: "Leaderboard", active: true, path: "/leaderboard" },
  { id: 6, title: "Final Push", active: false, path: "/final" }
];

interface LeaderboardEntry {
  id: string;
  rank: number;
  address: string;
  name: string;
  staked: number;
  isEmmy: boolean;
}

const generateRandomAddress = () => {
  return '0x' + Math.random().toString(16).slice(2, 10) + '...' + Math.random().toString(16).slice(2, 6);
};

const generateRandomStake = () => {
  return Math.floor(Math.random() * 100000) + 10000;
};

const LeaderboardProgress = () => {
  const router = useRouter();
  const [currentRank, setCurrentRank] = useState(847);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const emmyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const handleBack = () => {
    setTimeout(() => {
      router.push('/strategy');
    }, 150);
  };

  const handleNextChapter = () => {
    setTimeout(() => {
      router.push('/final');
    }, 150);
  };

  // Initialize leaderboard
  useEffect(() => {
    const initialLeaderboard: LeaderboardEntry[] = Array.from({ length: 10 }, (_, i) => ({
      id: `entry-${i}`,
      rank: i + 1,
      address: generateRandomAddress(),
      name: i === 9 ? 'Emmy' : `Trader ${i + 1}`,
      staked: generateRandomStake(),
      isEmmy: i === 9
    }));

    setLeaderboard(initialLeaderboard);
  }, []);

  // Animate Emmy's climb
  useEffect(() => {
    const ranks = [10, 7, 5, 3, 2, 1];
    const delays = [0, 2000, 4000, 6000, 8000, 10000];
    const milestones = [5, 3, 2, 1];

    const animateClimb = () => {
      ranks.forEach((rank, index) => {
        setTimeout(() => {
          setCurrentRank(rank);
          
          // Check for milestones
          if (milestones.includes(rank)) {
            // Add achievement
            setAchievements(prev => [
              ...prev,
              `Reached Top ${rank}!`
            ]);
          }

          // Update leaderboard
          setLeaderboard(prev => {
            const newLeaderboard = [...prev];
            const emmyIndex = newLeaderboard.findIndex(entry => entry.isEmmy);
            const targetIndex = rank - 1;
            
            if (emmyIndex !== -1) {
              // Remove Emmy from current position
              const emmyEntry = newLeaderboard[emmyIndex];
              newLeaderboard.splice(emmyIndex, 1);

              // Insert Emmy at new position
              newLeaderboard.splice(targetIndex, 0, {
                ...emmyEntry,
                rank,
                staked: emmyEntry.staked + Math.floor(Math.random() * 50000)
              });

              // Update ranks for all entries
              newLeaderboard.forEach((entry, index) => {
                entry.rank = index + 1;
              });
            }
            
            return newLeaderboard;
          });
        }, delays[index]);
      });
    };

    // Initial animation
    animateClimb();

    // Set up interval for looping
    const interval = setInterval(() => {
      // Reset leaderboard to initial state
      const initialLeaderboard: LeaderboardEntry[] = Array.from({ length: 10 }, (_, i) => ({
        id: `entry-${i}`,
        rank: i + 1,
        address: generateRandomAddress(),
        name: i === 9 ? 'Emmy' : `Trader ${i + 1}`,
        staked: generateRandomStake(),
        isEmmy: i === 9
      }));
      setLeaderboard(initialLeaderboard);
      setCurrentRank(10);
      setAchievements([]);
      
      // Start animation again
      animateClimb();
    }, 12000); // Total duration of one cycle

    return () => clearInterval(interval);
  }, []);

  // Add GSAP animations
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate title
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    // Animate subtitle
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");
    }

    // Animate stats
    if (statsRef.current) {
      gsap.set(statsRef.current, { opacity: 0, y: 20 });
      tl.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");
    }
  }, []);

  return (
    <PageTransition 
      bgColor="rgba(79, 70, 229, 0.95)"
      transitionKey="leaderboard"
    >
      <section className="h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
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

        {/* Main Content */}
        <div className="container mx-auto px-4 h-[calc(100vh-180px)] flex items-center mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full max-w-7xl mx-auto">
            {/* Left Column - Title, Rank and Emmy */}
            <div className="text-left space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Emmy&apos;s Rise to Glory
                </h2>
              </div>

              <p ref={subtitleRef} className="text-lg md:text-2xl text-white/90 font-normal">
                Watch as Emmy climbs the ranks to become a staking legend
              </p>

              <p ref={statsRef} className="text-base text-white/80 font-normal">
                Starting from rank #847, Emmy&apos;s strategic staking moves and perfect timing have propelled her through the ranks. Each milestone brings new achievements and rewards, showcasing the power of smart staking decisions.
              </p>

              {/* Current Rank Display and Emmy Image Container */}
              <div className="flex items-center gap-6">
                {/* Current Rank Display */}
                <motion.div
                  key={currentRank}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    #{currentRank}
                  </div>
                  <div className="text-sm text-white/80 font-normal">
                    Current Rank
                  </div>
                </motion.div>

                {/* Emmy Image */}
                <div className="relative">
                  <div className="w-96 h-96 relative">
                    <Image
                      src="/png-nobg/emmy-rank-one.png"
                      alt="Emmy"
                      width={384}
                      height={384}
                      className="w-full h-auto"
                      priority
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/png-nobg/emmy.png'; // Fallback to regular emmy image
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Leaderboard */}
            <div 
              ref={containerRef}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="grid grid-cols-4 gap-4 mb-4 text-white/70 text-xs font-normal">
                <div>Rank</div>
                <div>Name</div>
                <div>Address</div>
                <div className="text-right">Staked</div>
              </div>

              <div className="space-y-2">
                {leaderboard.map((entry) => (
                  <motion.div
                    key={entry.id}
                    ref={entry.isEmmy ? emmyRef : null}
                    initial={entry.isEmmy ? { x: -100, opacity: 0 } : false}
                    animate={entry.isEmmy ? { x: 0, opacity: 1 } : false}
                    className={`grid grid-cols-4 gap-4 p-3 rounded-lg ${
                      entry.isEmmy 
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="font-medium text-white text-xs flex items-center">
                      #{entry.rank}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`${entry.isEmmy ? 'text-purple-300 font-bold' : 'text-white'} text-sm`}>
                        {entry.name}
                      </span>
                    </div>
                    <div className="text-white/70 font-mono text-xs flex items-center">
                      {entry.address}
                    </div>
                    <div className="text-right text-green-400 font-medium text-sm flex items-center justify-end">
                      {entry.staked.toLocaleString()} $ME
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <AnimatePresence>
            {achievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed bottom-24 right-8 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
              >
                <h3 className="text-white font-bold mb-2">Achievements Unlocked!</h3>
                <ul className="space-y-1">
                  {achievements.map((achievement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-white/90 text-sm"
                    >
                      🏆 {achievement}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <Footer />

        <style jsx global>{`
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.5); }
            50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
          }
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
        `}</style>
      </section>
    </PageTransition>
  );
};

export default LeaderboardProgress; 