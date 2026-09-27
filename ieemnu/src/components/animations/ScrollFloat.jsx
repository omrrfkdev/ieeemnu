/**
 * ScrollFloat Component
 * Applies floating/staggered animations to text or elements on scroll
 */

import { Children, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ensure ScrollTrigger is registered once
if (!gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ScrollFloat component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} props.animationDuration - Duration of the animation in seconds
 * @param {string} props.ease - GSAP ease value
 * @param {string} props.scrollStart - ScrollTrigger start value
 * @param {string} props.scrollEnd - ScrollTrigger end value
 * @param {number} props.stagger - Delay between each item animation
 * @param {Object} props.fromVars - Starting animation values
 * @param {Object} props.toVars - Ending animation values
 * @param {boolean} props.split - Whether to split text into characters
 * @param {React.ElementType} props.as - Wrapper element/component
 * @param {string} props.className - Additional classes for wrapper
 * @param {boolean} props.disabled - Disable animation entirely
 * @returns {JSX.Element} ScrollFloat wrapper
 */
const ScrollFloat = ({
  children,
  animationDuration = 1,
  ease = 'power3.out',
  scrollStart = 'top 85%',
  scrollEnd = 'bottom 20%',
  stagger = 0.04,
  fromVars = { y: 30, opacity: 0 },
  toVars = { y: 0, opacity: 1 },
  split = true,
  as: Component = 'span',
  className = '',
  disabled = false,
  ...rest
}) => {
  const containerRef = useRef(null);

  const prefersReducedMotion = useMemo(
    () => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false),
    []
  );

  useEffect(() => {
    if (disabled || prefersReducedMotion || !containerRef.current) {
      // Ensure elements are visible if animation is disabled
      const targets = containerRef.current.querySelectorAll('.scroll-float-item');
      gsap.set(targets, { opacity: 1, y: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const targets = containerRef.current.querySelectorAll('.scroll-float-item');
      if (!targets.length) return;

      // Set initial state explicitly
      gsap.set(targets, fromVars);

      gsap.to(
        targets,
        {
          ...toVars,
          duration: animationDuration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start: scrollStart,
            end: scrollEnd,
            scrub: false,
            toggleActions: 'play none none reverse',
            // Ensure animation completes even if user scrolls quickly
            fastScrollEnd: true,
          },
          // Force final state to be visible
          onComplete: () => {
            gsap.set(targets, toVars);
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger, fromVars, toVars, disabled, prefersReducedMotion]);

  const renderContent = () => {
    if (typeof children === 'string' && split) {
      return children.split('').map((char, index) => (
        <span
          key={`char-${index}`}
          className="scroll-float-item inline-block will-change-transform"
          style={{ opacity: 1 }} // Ensure initial visibility
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }

    return Children.map(children, (child, index) => (
      <span
        key={`child-${index}`}
        className="scroll-float-item inline-block will-change-transform"
        style={{ opacity: 1 }} // Ensure initial visibility
      >
        {child}
      </span>
    ));
  };

  return (
    <Component
      ref={containerRef}
      className={`inline-flex flex-wrap gap-y-1 ${className}`.trim()}
      {...rest}
    >
      {renderContent()}
    </Component>
  );
};

export default ScrollFloat;
