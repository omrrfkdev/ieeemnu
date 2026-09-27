/**
 * ScrollToTop Component
 * Automatically scrolls to top when navigating to new routes
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * Handles automatic scroll restoration on route changes
 *
 * @returns {null} This component doesn't render anything
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' for immediate scroll, or 'smooth' for animated
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
