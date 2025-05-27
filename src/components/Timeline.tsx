'use client';

import { motion } from 'framer-motion';

export interface Chapter {
  id: number;
  title: string;
  active: boolean;
  path: string;
}

interface TimelineProps {
  chapters: Chapter[];
  onNextChapter: () => void;
  showNextButton?: boolean;
  className?: string;
  nextButtonText?: string;
}

const Timeline = ({ 
  chapters, 
  onNextChapter, 
  showNextButton = true,
  className = "",
  nextButtonText = "Next Chapter"
}: TimelineProps) => {
  // Filter out the Hero chapter
  const filteredChapters = chapters.filter(chapter => chapter.title !== "Hero");

  return (
    <>
      {/* Timeline */}
      <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            {filteredChapters.map((chapter, index) => (
              <div key={chapter.id} className="flex items-center">
                <div
                  className={`text-sm font-medium transition-all duration-300 ${
                    chapter.active
                      ? 'text-white scale-110'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {chapter.title}
                </div>
                {index < filteredChapters.length - 1 && (
                  <div className="w-8 h-[1px] bg-white/30 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Chapter Button */}
      {showNextButton && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNextChapter}
          className="fixed bottom-8 right-8 px-8 py-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        >
          {nextButtonText} →
        </motion.button>
      )}
    </>
  );
};

export default Timeline; 