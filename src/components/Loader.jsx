import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.5, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        setIsVisible(false);
        document.body.style.overflow = 'unset';
      }}
      className="fixed inset-0 bg-brand-primary z-50 flex flex-col items-center justify-center"
      style={{ overflow: 'hidden' }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.8, rotate: -20, opacity: 0 }}
          animate={{ scale: [0.8, 1.1, 1], rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-brand-secondary border border-brand-accent/30 shadow-[0_0_50px_rgba(0,212,255,0.3)] glow-cyan"
        >
          <GraduationCap className="w-12 h-12 text-brand-accent animate-pulse" />
        </motion.div>

        <div className="flex flex-col items-center gap-1">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display font-extrabold text-3xl tracking-tight bg-gradient-to-r from-white via-brand-accent-light to-brand-accent bg-clip-text text-transparent"
          >
            IQRA ACADEMY
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.6 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xs text-brand-accent uppercase tracking-widest font-semibold"
          >
            Shaping Your Future
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
