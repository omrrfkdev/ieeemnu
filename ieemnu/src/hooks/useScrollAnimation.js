/**
 * useScrollAnimation Hook
 * Custom hook for GSAP scroll-triggered animations
 * Handles animation setup and cleanup with accessibility support
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to animate elements on scroll
 * 
 * @param {Object} options - Animation configuration options
 * @param {string} options.trigger - CSS selector or ref for scroll trigger element
 * @param {Object} options.animation - GSAP animation properties
 * @param {Object} options.scrollTrigger - ScrollTrigger configuration
 * @returns {React.RefObject} Ref to attach to the element to animate
 * 
 * @example
 * const ref = useScrollAnimation({
 *   animation: { y: 0, opacity: 1, duration: 1 },
 *   scrollTrigger: { start: 'top 80%' }
 * });
 * return <div ref={ref}>Animated content</div>
 */
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || !elementRef.current) {
      return;
    }

    const {
      animation = { y: 50, opacity: 0 },
      scrollTrigger = {},
      from = true,
    } = options;

    // Default scroll trigger configuration
    const defaultScrollTrigger = {
      trigger: elementRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...scrollTrigger,
    };

    // Create animation
    const ctx = gsap.context(() => {
      if (from) {
        gsap.from(elementRef.current, {
          ...animation,
          scrollTrigger: defaultScrollTrigger,
        });
      } else {
        gsap.to(elementRef.current, {
          ...animation,
          scrollTrigger: defaultScrollTrigger,
        });
      }
    });

    // Cleanup
    return () => {
      ctx.revert();
    };
  }, [options]);

  return elementRef;
};

/**
 * Hook to animate multiple child elements with stagger effect
 * 
 * @param {Object} options - Animation configuration options
 * @param {string} options.selector - CSS selector for child elements to animate
 * @param {Object} options.animation - GSAP animation properties
 * @param {number} options.stagger - Stagger delay between animations
 * @param {Object} options.scrollTrigger - ScrollTrigger configuration
 * @returns {React.RefObject} Ref to attach to the parent container
 * 
 * @example
 * const ref = useStaggerAnimation({
 *   selector: '.card',
 *   animation: { y: 0, opacity: 1 },
 *   stagger: 0.2
 * });
 * return <div ref={ref}><div className="card">1</div><div className="card">2</div></div>
 */
export const useStaggerAnimation = (options = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !containerRef.current) {
      // Ensure elements are visible if animations are disabled
      const elements = containerRef.current?.querySelectorAll(options.selector || '.animate-item');
      gsap.set(elements, { opacity: 1, y: 0 });
      return;
    }

    const {
      selector = '.animate-item',
      animation = { y: 50, opacity: 0 },
      stagger = 0.1,
      scrollTrigger = {},
    } = options;

    const defaultScrollTrigger = {
      trigger: containerRef.current,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...scrollTrigger,
    };

    const ctx = gsap.context(() => {
      const elements = containerRef.current.querySelectorAll(selector);

      if (elements.length > 0) {
        // Set initial state explicitly
        gsap.set(elements, animation);

        // Create the animation
        gsap.to(elements, {
          y: 0,
          opacity: 1,
          duration: animation.duration || 0.8,
          stagger,
          ease: 'power2.out',
          scrollTrigger: defaultScrollTrigger,
          // Ensure animation completes to visible state
          onComplete: () => {
            gsap.set(elements, { opacity: 1, y: 0 });
          }
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, [options]);

  return containerRef;
};

/**
 * Hook for parallax scroll effect
 * 
 * @param {Object} options - Parallax configuration
 * @param {number} options.speed - Parallax speed multiplier (default: 0.5)
 * @param {string} options.direction - Direction of parallax ('y' or 'x')
 * @returns {React.RefObject} Ref to attach to the element
 */
export const useParallax = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || !elementRef.current) {
      return;
    }

    const { speed = 0.5, direction = 'y' } = options;

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        [direction]: (i, target) => {
          const rect = target.getBoundingClientRect();
          return -(rect.top * speed);
        },
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [options]);

  return elementRef;
};
