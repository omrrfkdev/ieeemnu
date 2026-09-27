/**
 * ScrollReveal Component
 * Applies reveal animations with opacity, blur, and rotation effects on scroll
 */

import { Children, useEffect, useMemo, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ensure ScrollTrigger is registered once
if (!gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ScrollReveal component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} props.baseOpacity - Starting opacity value (0-1)
 * @param {boolean} props.enableBlur - Whether to apply blur effect
 * @param {number} props.baseRotation - Starting rotation in degrees
 * @param {number} props.blurStrength - Blur strength in pixels
 * @param {number} props.animationDuration - Duration of the animation in seconds
 * @param {string} props.ease - GSAP ease value
 * @param {string} props.scrollStart - ScrollTrigger start value
 * @param {string} props.scrollEnd - ScrollTrigger end value
 * @param {number} props.stagger - Delay between each item animation
 * @param {boolean} props.split - Whether to split text into words
 * @param {React.ElementType} props.as - Wrapper element/component
 * @param {string} props.className - Additional classes for wrapper
 * @param {boolean} props.disabled - Disable animation entirely
 * @returns {JSX.Element} ScrollReveal wrapper
 */
const ScrollReveal = ({
  children,
  baseOpacity = 0,
  enableBlur = true,
  baseRotation = 5,
  blurStrength = 10,
  animationDuration = 1,
  ease = 'power3.out',
  scrollStart = 'top 85%',
  scrollEnd = 'bottom 20%',
  stagger = 0.03,
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
      if (containerRef.current) {
        const targets = containerRef.current.querySelectorAll('.scroll-reveal-item');
        gsap.set(targets, { opacity: 1, rotateX: 0, filter: 'blur(0px)' });
      }
      return undefined;
    }

    const ctx = gsap.context(() => {
      const targets = containerRef.current.querySelectorAll('.scroll-reveal-item');
      if (!targets.length) return;

      // Build initial state
      const fromVars = {
        opacity: baseOpacity,
        rotateX: baseRotation,
      };

      // Add blur if enabled
      if (enableBlur) {
        fromVars.filter = `blur(${blurStrength}px)`;
      }

      // Build final state
      const toVars = {
        opacity: 1,
        rotateX: 0,
        duration: animationDuration,
        ease,
        stagger,
      };

      // Add blur removal if enabled
      if (enableBlur) {
        toVars.filter = 'blur(0px)';
      }

      // Set initial state explicitly
      gsap.set(targets, fromVars);

      gsap.to(targets, {
        ...toVars,
        scrollTrigger: {
          trigger: containerRef.current,
          start: scrollStart,
          end: scrollEnd,
          scrub: false,
          toggleActions: 'play none none reverse',
          fastScrollEnd: true,
        },
        // Force final state to be visible
        onComplete: () => {
          gsap.set(targets, { opacity: 1, rotateX: 0, filter: 'blur(0px)' });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger, baseOpacity, enableBlur, baseRotation, blurStrength, disabled, prefersReducedMotion]);

  const renderContent = () => {
    if (typeof children === 'string' && split) {
      // Split by words instead of characters for better readability
      return children.split(' ').map((word, index) => (
        <span
          key={`word-${index}`}
          className="scroll-reveal-item inline-block will-change-transform mr-1"
          style={{ opacity: 1 }}
        >
          {word}
        </span>
      ));
    }

    return Children.map(children, (child, index) => (
      <span
        key={`child-${index}`}
        className="scroll-reveal-item inline-block will-change-transform"
        style={{ opacity: 1 }}
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

export default memo(ScrollReveal);
