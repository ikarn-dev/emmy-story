'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import Timeline, { Chapter } from './Timeline';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import Footer from './Footer';
import PageTransition from './PageTransition';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const chapters: Chapter[] = [
  { id: 1, title: "Hero", active: false, path: "/" },
  { id: 2, title: "The Ascent", active: false, path: "/ascent" },
  { id: 3, title: "Challenges", active: false, path: "/challenges" },
  { id: 4, title: "Strategy", active: true, path: "/strategy" },
  { id: 5, title: "Leaderboard", active: false, path: "/leaderboard" },
  { id: 6, title: "Final Push", active: false, path: "/final" }
];

interface StakingMetric {
  label: string;
  value: number;
  change: number;
  icon: string;
  description: string;
}

const StakingStrategy = () => {
  const router = useRouter();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const titleRef = useRef(null);
  const emmyTextRef = useRef(null);
  const emmyText2Ref = useRef(null);
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [metrics, setMetrics] = useState<StakingMetric[]>([
    { 
      label: "Total Staked", 
      value: 0, 
      change: 12.5, 
      icon: "💎",
      description: "Total ME tokens staked in the pool"
    },
    { 
      label: "APY Rate", 
      value: 0, 
      change: 2.3, 
      icon: "📈",
      description: "Current Annual Percentage Yield"
    },
    { 
      label: "Rewards Earned", 
      value: 0, 
      change: 8.7, 
      icon: "🎁",
      description: "Total rewards accumulated"
    },
    { 
      label: "Portfolio Value", 
      value: 0, 
      change: 15.2, 
      icon: "💰",
      description: "Current value of staked tokens"
    }
  ]);

  // Portfolio distribution data
  const portfolioData = {
    labels: ['Staked $ME', 'Available $ME', 'Rewards'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)', // Purple
          'rgba(236, 72, 153, 0.8)', // Pink
          'rgba(234, 179, 8, 0.8)',  // Yellow
        ],
        borderColor: [
          'rgba(147, 51, 234, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(234, 179, 8, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            family: 'Plus Jakarta Sans',
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: 'Plus Jakarta Sans',
          size: 14
        },
        bodyFont: {
          family: 'Plus Jakarta Sans',
          size: 12
        },
        padding: 12,
        cornerRadius: 8
      }
    }
  };

  const handleBack = () => {
    setDirection('left');
    setTimeout(() => {
      router.push('/challenges');
    }, 500);
  };

  const handleNextChapter = () => {
    setDirection('right');
    setTimeout(() => {
      router.push('/leaderboard');
    }, 500);
  };

  // GSAP text animations
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate title with typewriter effect
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0 });
      tl.to(titleRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }

    // Animate Emmy&apos;s text with stagger effect
    if (emmyTextRef.current) {
      gsap.set(emmyTextRef.current, { opacity: 0, y: 20 });
      tl.to(emmyTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3");
    }

    if (emmyText2Ref.current) {
      gsap.set(emmyText2Ref.current, { opacity: 0, y: 20 });
      tl.to(emmyText2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");
    }

    // Animate metrics with stagger
    metricsRef.current.forEach((metric, index) => {
      if (metric) {
        gsap.set(metric, { opacity: 0, y: 30, scale: 0.8 });
        tl.to(metric, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, `-=${0.4 - index * 0.1}`);
      }
    });

  }, []);

  // Animate metrics values
  useEffect(() => {
    const finalValues = [12500, 18.5, 8750, 25000];
    
    // GSAP animation for metric values
    finalValues.forEach((finalValue, index) => {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: finalValue,
        duration: 2,
        ease: "power2.out",
        delay: index * 0.2,
        onUpdate: () => {
          setMetrics(prev => prev.map((metric, i) => 
            i === index ? { ...metric, value: obj.value } : metric
          ));
        }
      });
    });
  }, []);

  return (
    <PageTransition 
      direction={direction} 
      bgColor="rgba(79, 70, 229, 0.95)" // Indigo color from the gradient
      transitionKey="strategy"
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
          className="fixed bottom-6 left-6 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        >
          ← Back
        </motion.button>

        {/* Main Dashboard Container */}
        <div className="container mx-auto px-4 h-[calc(100vh-180px)] flex items-center mt-25 mb-15">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            {/* Left Column - Emmy Guide */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1 relative"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 h-full flex flex-col">
                <div className="relative w-40 h-40 mx-auto mb-5">
                  <Image
                    src="/png-nobg/strategy.png"
                    alt="Strategy"
                    width={160}
                    height={160}
                    className="w-full h-auto animate-emmy-float"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  Emmy&apos;s Staking Guide
                </h3>
                <div className="space-y-4 flex-grow">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p ref={emmyTextRef} className="text-white/90 text-sm font-normal">
                      &quot;Watch how I maximize my staking rewards through strategic timing and portfolio diversification!&quot;
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p ref={emmyText2Ref} className="text-white/90 text-sm font-normal">
                      &quot;Notice how I balance risk and reward to maintain a steady growth in my portfolio.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 h-full flex flex-col">
                {/* Title */}
                <div className="flex items-center gap-3 mb-5">
                  <Image
                    src="/png-nobg/me-coin.png"
                    alt="ME Coin"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <h2 ref={titleRef} className="text-xl font-bold text-white">ME Token Staking Strategy</h2>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  {metrics.map((metric, index) => (
                    <div
                      key={metric.label}
                      ref={(el) => { metricsRef.current[index] = el }}
                      className="bg-white/5 rounded-xl p-4 relative group hover:bg-white/10 transition-all duration-300"
                      onMouseEnter={() => setActiveTooltip(metric.label)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm font-normal">{metric.label}</span>
                        <span className="text-lg">{metric.icon}</span>
                      </div>
                      <div className="text-xl font-bold text-white mb-1">
                        {metric.label === "APY Rate" 
                          ? `${metric.value.toFixed(1)}%`
                          : `$${metric.value.toLocaleString()}`}
                      </div>
                      <div className="text-green-400 text-sm font-normal">
                        +{metric.change}% from last month
                      </div>
                      {activeTooltip === metric.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full left-0 mb-2 p-2 bg-black/80 rounded text-white text-xs whitespace-nowrap z-10"
                        >
                          {metric.description}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Portfolio Distribution */}
                <div className="bg-white/5 rounded-xl p-5 flex-grow flex flex-col">
                  <h4 className="text-white font-semibold mb-4">Portfolio Distribution</h4>
                  <div className="flex-grow flex items-center justify-center">
                    <div className="w-full h-full max-h-[200px]">
                      <Pie data={portfolioData} options={chartOptions} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <Footer />

        <style jsx global>{`
          @keyframes emmy-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-emmy-float {
            animation: emmy-float 4s ease-in-out infinite;
          }
        `}</style>
      </section>
    </PageTransition>
  );
};

export default StakingStrategy;