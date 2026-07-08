import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WordsPullUp = ({ text, className, showAsterisk = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;
        return (
          <span
            key={index}
            className="relative inline-block mr-[0.25em] whitespace-nowrap overflow-hidden"
          >
            <motion.span
              variants={wordVariants}
              className="inline-block"
            >
              {word}
              {isLastWord && showAsterisk && (
                <span className="absolute top-[0.1em] -right-[0.3em] text-[0.31em] font-normal text-primary pointer-events-none">
                  *
                </span>
              )}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
};

export default WordsPullUp;
