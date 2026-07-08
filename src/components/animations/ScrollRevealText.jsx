import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Character = ({ scrollYProgress, start, end, char }) => {
  // Map scroll percentage to letter opacity inside a proper subcomponent to follow Rules of Hooks
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className="inline"
    >
      {char}
    </motion.span>
  );
};

const ScrollRevealText = ({ text, className }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charCounter = 0;

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {wordChars.map((char, charIndex) => {
              const globalIndex = charCounter++;
              const charProgress = globalIndex / totalChars;
              const start = Math.max(0, charProgress - 0.1);
              const end = Math.min(1, charProgress + 0.05);

              return (
                <Character
                  key={charIndex}
                  scrollYProgress={scrollYProgress}
                  start={start}
                  end={end}
                  char={char}
                />
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline" key={`space-${wordIndex}`}>
                {charCounter++, '\u00A0'}
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
};

export default ScrollRevealText;
