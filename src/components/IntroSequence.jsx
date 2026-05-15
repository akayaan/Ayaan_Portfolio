import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store';
import { motion } from 'framer-motion';

export default function IntroSequence() {
  const { setGameState } = useGameStore();
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 1000);
    
    let currentProgress = 0;
    const loadInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 1;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(loadInterval);
        setTimeout(() => setGameState('playing'), 2000);
      }
    }, 150);

    return () => {
      clearTimeout(timer1);
      clearInterval(loadInterval);
    };
  }, [setGameState]);

  return (
    <div className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center crt-flicker">
      <div className="scanlines absolute inset-0"></div>
      
      {showLogo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-game font-black tracking-widest glitch-text mb-8" data-text="AYAAN KHAN">
            AYAAN KHAN
          </h1>
          <h2 className="text-xl md:text-2xl text-cyber-blue font-game tracking-widest opacity-80 mb-12">
            INITIALIZING GAME ENGINE
          </h2>
          
          <div className="w-64 md:w-96 h-2 bg-gray-900 border border-cyber-blue/30 relative mx-auto overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-cyber-pink"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
          <div className="text-cyber-yellow font-game mt-4 text-sm">
            {progress}% LOADED // {progress < 100 ? 'BUILDING WORLD' : 'ENTER SYSTEM'}
          </div>
        </motion.div>
      )}
    </div>
  );
}
