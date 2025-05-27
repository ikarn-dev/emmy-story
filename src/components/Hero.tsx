'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomCursor from './CustomCursor';
import Footer from './Footer';
import PageTransition from './PageTransition';

const Hero = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [skipIntro, setSkipIntro] = useState(searchParams.get('skipIntro') === 'true');
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const coinsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [showFloatingCoins, setShowFloatingCoins] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    if (skipIntro) {
      setSkipIntro(false);
    }
  }, [skipIntro]);

  useEffect(() => {
    // Set initial states immediately to prevent flash
    if (textRef.current && imageRef.current) {
      gsap.set(textRef.current, { opacity: 0 });
      gsap.set(imageRef.current, { opacity: 0 });
    }

    // Hide coins initially
    coinsRef.current.forEach((coin) => {
      if (coin) {
        gsap.set(coin, { 
          y: -200, 
          opacity: 0, 
          rotation: 0,
          scale: 0.5 
        });
      }
    });

    // Simulate loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && textRef.current && imageRef.current) {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      // Animate hero text and image with new transitions
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out"
      })
      .to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out"
      }, "-=0.8")
      // Then animate coins dropping after hero content loads
      .to(coinsRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 360,
        duration: 0.8,
        ease: "bounce.out",
        stagger: {
          amount: 0.4,
          from: "random"
        },
        onComplete: () => {
          coinsRef.current.forEach((coin, index) => {
            if (coin) {
              const floatClass = index % 3 === 0 ? 'animate-float' : 
                               index % 3 === 1 ? 'animate-float-delayed' : 
                               'animate-float-slow';
              coin.classList.add(floatClass);
            }
          });
        }
      }, "+=0.2");
    }
  }, [isLoading]);

  const handleNextChapter = () => {
    setDirection('right');
    setTimeout(() => {
      router.push('/ascent');
    }, 500);
  };

  return (
    <PageTransition 
      direction={direction} 
      bgColor="rgba(79, 70, 229, 0.95)"
      transitionKey="hero"
    >
      <section className="h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <CustomCursor />
        {/* Background Coins */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Text Area Background Coins */}
          <div 
            ref={(el) => { coinsRef.current[0] = el }}
            className="absolute top-1/4 left-1/4 w-32 h-32"
          >
            <Image
              src="/png-nobg/me-coin.png"
              alt="ME Coin"
              width={128}
              height={128}
            />
          </div>
          <div 
            ref={(el) => { coinsRef.current[1] = el }}
            className="absolute top-1/3 right-1/3 w-24 h-24"
          >
            <Image
              src="/png-nobg/me-coin.png"
              alt="ME Coin"
              width={96}
              height={96}
            />
          </div>
          <div 
            ref={(el) => { coinsRef.current[2] = el }}
            className="absolute bottom-1/4 left-1/3 w-20 h-20"
          >
            <Image
              src="/png-nobg/me-coin.png"
              alt="ME Coin"
              width={80}
              height={80}
            />
          </div>

          {/* Image Area Background Coins */}
          <div 
            ref={(el) => { coinsRef.current[3] = el }}
            className="absolute top-1/2 right-1/4 w-28 h-28"
          >
            <Image
              src="/png-nobg/me-coin.png"
              alt="ME Coin"
              width={112}
              height={112}
            />
          </div>
          <div 
            ref={(el) => { coinsRef.current[4] = el }}
            className="absolute bottom-1/3 right-1/3 w-24 h-24"
          >
            <Image
              src="/png-nobg/me-coin.png"
              alt="ME Coin"
              width={96}
              height={96}
            />
          </div>
          <div 
            ref={(el) => { coinsRef.current[5] = el }}
            className="absolute top-2/3 right-1/4 w-20 h-20"
          >
            <Image
              src="/png-nobg/me-coin.png"
              alt="ME Coin"
              width={80}
              height={80}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div 
            ref={containerRef}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
          >
            {/* Text Content */}
            <motion.div
              ref={textRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-center md:text-left space-y-6 max-w-xl mx-auto md:mx-0 relative z-20"
            >
              <div className="relative">
                {isLoading ? (
                  <div className="h-16 md:h-20 bg-white/10 rounded-lg animate-pulse" />
                ) : (
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg">
                    <span className="line block text-start w-full">
                      <span className="word inline-block">Welcome</span>{' '}
                      <span className="word inline-block">to</span>{' '}
                      <span className="word inline-block">Emmy's</span>{' '}
                      <span className="word inline-block">World</span>
                    </span>
                  </h1>
                )}
              </div>
              
              <div className="relative">
                {isLoading ? (
                  <div className="h-8 md:h-10 bg-white/10 rounded-lg animate-pulse" />
                ) : (
                  <p className="text-lg sm:text-xl md:text-2xl text-white/90 drop-shadow-md font-normal">
                    <span className="line block text-start w-full">
                      <span className="word inline-block">Join</span>{' '}
                      <span className="word inline-block">Emmy</span>{' '}
                      <span className="word inline-block">on</span>{' '}
                      <span className="word inline-block">her</span>{' '}
                      <span className="word inline-block">quest</span>{' '}
                      <span className="word inline-block">to</span>{' '}
                      <span className="word inline-block">become</span>{' '}
                      <span className="word inline-block">the</span>{' '}
                      <span className="word inline-block">ultimate</span>{' '}
                      <span className="word inline-block">staking</span>{' '}
                      <span className="word inline-block">champion.</span>
                    </span>
                  </p>
                )}
              </div>

              {/* Start Journey Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextChapter}
                className="mt-8 px-8 py-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Begin Emmy's Journey →
              </motion.button>
            </motion.div>

            {/* Emmy Image */}
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full md:w-1/2 max-w-md lg:max-w-lg mx-auto md:mx-0 z-20"
            >
              <div className="animate-emmy-float">
                <Image
                  src="/png-nobg/emmy.png"
                  alt="Emmy"
                  width={500}
                  height={500}
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Coins */}
        <AnimatePresence>
          {showFloatingCoins && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -100, x: Math.random() * 100 - 50 }}
                  animate={{
                    opacity: [0, 0.8, 0.8, 0],
                    y: [0, 800],
                    x: [0, Math.random() * 100 - 50],
                    rotate: [0, 180]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "easeInOut"
                  }}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: 0,
                    width: `${Math.random() * 30 + 30}px`,
                    height: `${Math.random() * 30 + 30}px`
                  }}
                >
                  <Image
                    src="/png-nobg/me-coin.png"
                    alt="ME Coin"
                    width={60}
                    height={60}
                    className="w-full h-full"
                  />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </section>

      {/* Footer */}
      <Footer />

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-10deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes emmy-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-emmy-float {
          animation: emmy-float 4s ease-in-out infinite;
        }

        .u-title-0 {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .word {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.5s forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line .word:nth-child(1) { animation-delay: 0.1s; }
        .line .word:nth-child(2) { animation-delay: 0.2s; }
        .line .word:nth-child(3) { animation-delay: 0.3s; }
        .line .word:nth-child(4) { animation-delay: 0.4s; }
        .line .word:nth-child(5) { animation-delay: 0.5s; }
        .line .word:nth-child(6) { animation-delay: 0.6s; }
        .line .word:nth-child(7) { animation-delay: 0.7s; }
        .line .word:nth-child(8) { animation-delay: 0.8s; }
        .line .word:nth-child(9) { animation-delay: 0.9s; }
        .line .word:nth-child(10) { animation-delay: 1s; }
        .line .word:nth-child(11) { animation-delay: 1.1s; }
        .line .word:nth-child(12) { animation-delay: 1.2s; }
        .line .word:nth-child(13) { animation-delay: 1.3s; }
        .line .word:nth-child(14) { animation-delay: 1.4s; }
        .line .word:nth-child(15) { animation-delay: 1.5s; }
        .line .word:nth-child(16) { animation-delay: 1.6s; }
        .line .word:nth-child(17) { animation-delay: 1.7s; }
        .line .word:nth-child(18) { animation-delay: 1.8s; }
        .line .word:nth-child(19) { animation-delay: 1.9s; }
        .line .word:nth-child(20) { animation-delay: 2s; }
        .line .word:nth-child(21) { animation-delay: 2.1s; }
        .line .word:nth-child(22) { animation-delay: 2.2s; }
        .line .word:nth-child(23) { animation-delay: 2.3s; }
        .line .word:nth-child(24) { animation-delay: 2.4s; }
        .line .word:nth-child(25) { animation-delay: 2.5s; }
        .line .word:nth-child(26) { animation-delay: 2.6s; }
        .line .word:nth-child(27) { animation-delay: 2.7s; }
        .line .word:nth-child(28) { animation-delay: 2.8s; }
        .line .word:nth-child(29) { animation-delay: 2.9s; }
        .line .word:nth-child(30) { animation-delay: 3s; }
      `}</style>
    </PageTransition>
  );
};

export default Hero;