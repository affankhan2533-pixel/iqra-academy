import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GSAPEntrance = ({
  children,
  duration = 0.8,
  delay = 0,
  y = 40,
  x = 0,
  scale = 0.95,
  stagger = 0.15,
  triggerHook = 'top 85%',
  className = ''
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const childrenToAnimate = Array.from(el.children);
    if (childrenToAnimate.length === 0) return;

    // Set initial values
    gsap.set(childrenToAnimate, {
      opacity: 0,
      y: y,
      x: x,
      scale: scale,
    });

    const anim = gsap.to(childrenToAnimate, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: duration,
      delay: delay,
      stagger: stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: triggerHook,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [duration, delay, y, x, scale, stagger, triggerHook]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default GSAPEntrance;
