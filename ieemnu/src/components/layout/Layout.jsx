import { useOutlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import SkipToContent from '../common/SkipToContent';
import CookieBanner from '../common/CookieBanner';
import AccessibilityWidget from '../common/AccessibilityWidget';
import Breadcrumb from '../common/Breadcrumb';
import { SkeletonPage } from '../common/Skeleton';
import { NAV_ITEMS } from '../../constants';
import { useAnalytics } from '../../hooks/useAnalytics';

// 1. Helper to determine navigation direction (forward/backward)
const getPathIndex = (pathname) => {
  const index = NAV_ITEMS.findIndex(item => item.path === pathname);
  if (index !== -1) return index;
  const baseMatch = NAV_ITEMS.findIndex(item => item.path !== '/' && pathname.startsWith(item.path));
  return baseMatch !== -1 ? baseMatch : 0;
};

// 2. Pixel-based subtle slide and fade animation variants
const pageVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 80 : -80, // Pixel-based slide
    opacity: 0
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.46, 0.45, 0.94] // Premium cinematic ease
    }
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  })
};

const Layout = () => {
  const location = useLocation();
  const element = useOutlet();
  
  useAnalytics(location.pathname);

  const prevPathRef = useRef(location.pathname);
  const directionRef = useRef(1);

  // Calculate direction whenever path changes
  if (prevPathRef.current !== location.pathname) {
    const prevIndex = getPathIndex(prevPathRef.current);
    const currentIndex = getPathIndex(location.pathname);
    
    if (currentIndex > prevIndex) {
      directionRef.current = 1; 
    } else if (currentIndex < prevIndex) {
      directionRef.current = -1;
    }
    
    prevPathRef.current = location.pathname;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#060b14] transition-colors duration-300 overflow-hidden">
      <SkipToContent />
      <Header />
      
      {/* 3. Reusable Page Wrapper built directly into Layout */}
      <main id="main-content" className="flex-1 pt-16 md:pt-20 bg-transparent relative" tabIndex={-1}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb />
        </div>
        <AnimatePresence mode="wait" custom={directionRef.current}>
          <motion.div
            key={location.pathname}
            custom={directionRef.current}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
            onAnimationComplete={() => window.scrollTo(0, 0)}
          >
            <Suspense fallback={<SkeletonPage />}>
              {element}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <CookieBanner />
      <AccessibilityWidget />
    </div>
  );
};

export default Layout;
