'use client';

import { useState, useEffect } from 'react';
import { config } from '@/lib/config';

const FunLine = () => {
  const [currentLine, setCurrentLine] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  const funLines = config.desktop.funLines;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && funLines && funLines.length > 0) {
      setCurrentLine(funLines[Math.floor(Math.random() * funLines.length)]);

      const intervalId = setInterval(() => {
        setCurrentLine(funLines[Math.floor(Math.random() * funLines.length)]);
      }, 10000);

      return () => clearInterval(intervalId);
    }
  }, [isMounted, funLines]);

  if (!isMounted || !funLines || funLines.length === 0) return null;

  return (
    <div className="hidden md:block text-sm text-muted-foreground text-center flex-grow truncate px-4">
      {currentLine}
    </div>
  );
};

export default FunLine;
