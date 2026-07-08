import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WordsPullUpMultiStyle = ({ segments, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Map segments to a flat array of words with their corresponding styles
  const allWords = [];
  segments.forEach((segment) => {
    const words = segment.text.split(' ');
    words.forEach((word) => {
      if (word) {
        allWords.push({
          text: word,
          className: segment.className
        });
      }
    });
  });

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
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-wrap justify-center ${className}`}
    >
      {allWords.map((word, index) => (
        <span
          key={index}
          className="inline-block mr-[0.25em] whitespace-nowrap overflow-hidden"
        >
          <motion.span
            variants={wordVariants}
            className={`inline-block ${word.className || ''}`}
          >
            {word.text}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export default WordsPullUpMultiStyle;
