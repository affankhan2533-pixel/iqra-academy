import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GSAPMagnetic = ({ children, strength = 0.25 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Use gsap.quickTo for high-performance updates on mousemove
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      // Pull toward cursor based on strength coefficient
      xTo(distanceX * strength);
      yTo(distanceY * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return React.cloneElement(React.Children.only(children), { ref: elementRef });
};

export default GSAPMagnetic;
