'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Determine if it's the first visit in the session
    const isFirstVisit = !sessionStorage.getItem('hasLoaded');
    if (isFirstVisit) {
      sessionStorage.setItem('hasLoaded', 'true');
      const timer = setTimeout(() => setIsLoading(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-[#1a1a1a] z-[200] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-4 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-12 w-12"
            >
              <path d="M12 2l-2.5 5L2 9.5l4.5 3L8 18l4-2.5 4 2.5 1.5-5.5L22 9.5l-7.5-2.5L12 2z" />
              <path d="M12 12l-4 8h8l-4-8z" />
            </svg>
            <span className="text-2xl font-headline">Wisam OS</span>
          </motion.div>
          <div className="absolute bottom-16 flex flex-col items-center gap-2">
            <div className="w-20 h-1 bg-gray-600 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
