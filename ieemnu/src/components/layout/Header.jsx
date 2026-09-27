/**
 * Header Component
 * Main navigation header with responsive mobile menu and theme toggle
 */

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { NAV_ITEMS } from '../../constants';

/**
 * Header component with navigation and theme toggle
 * Features:
 * - Responsive mobile menu with slide animation
 * - Smooth scroll behavior
 * - Active link highlighting with animated underline
 * - Theme toggle (light/dark mode) with rotation animation
 * - Sticky header on scroll with glassmorphism effect
 * 
 * @returns {JSX.Element} Header component
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const location = useLocation();
  const navRef = useRef(null);
  const navItemRefs = useRef({});

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  /**
   * Check if current route is active
   */
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Update indicator position when route changes
  useLayoutEffect(() => {
    const activeItem = navItemRefs.current[location.pathname];
    const navContainer = navRef.current;

    if (activeItem && navContainer) {
      const navRect = navContainer.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
    }
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg shadow-black/5 dark:shadow-black/20'
        : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo Section - Multiple Logos */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 md:gap-4 group"
            aria-label="IEEE Home"
          >
            {/* Main IEEE Logo */}
            <img
              src="/logoImg/logo.png?v=2"
              alt="IEEE MNU Logo"
              className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))' }}
            />

            {/* Divider - Hidden on mobile */}
            <div className="hidden sm:block h-12 md:h-14 lg:h-16 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

            {/* MNU Logo */}
            <img
              src="/logoImg/mnu.png"
              alt="Mansoura National University"
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md hidden sm:block"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))' }}
            />

            {/* IEEE SAC Egypt Logo */}
            <img
              src="/logoImg/IEEE SAC Egypt logo.png"
              alt="IEEE SAC Egypt"
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md hidden lg:block"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div
              ref={navRef}
              className="relative flex items-center bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1.5 shadow-inner"
            >
              {/* Animated Sliding Indicator */}
              <div
                className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-ieee-blue to-ieee-blue-dark rounded-full shadow-lg shadow-ieee-blue/30 transition-all duration-300 ease-out"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
              />

              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  ref={(el) => (navItemRefs.current[item.path] = el)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${isActive(item.path)
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-ieee-blue dark:hover:text-ieee-blue-light'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 overflow-hidden"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </div>
            </button>
          </div>
        </div>

      </nav>

      {/* Mobile Navigation Menu - Slide from right with backdrop (outside nav for proper z-index) */}
      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Menu Panel */}
      <div
        className={`md:hidden fixed top-0 right-0 h-screen w-80 max-w-[85vw] z-[101] bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Menu Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Logos Grid */}
          <div className="flex flex-wrap items-center justify-center gap-2 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <img
              src="/logoImg/logo.png?v=2"
              alt="IEEE MNU Logo"
              className="h-11 w-auto object-contain drop-shadow-md"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))' }}
            />
            <div className="h-9 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
            <img
              src="/logoImg/mnu.png"
              alt="Mansoura National University"
              className="h-9 w-auto object-contain drop-shadow-md"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))' }}
            />
            <div className="h-9 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
            <img
              src="/logoImg/IEEE SAC Egypt logo.png"
              alt="IEEE SAC Egypt"
              className="h-9 w-auto object-contain drop-shadow-md"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))' }}
            />
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-all duration-300 group ${isActive(item.path)
                ? 'bg-gradient-to-r from-ieee-blue to-ieee-blue-dark text-white shadow-lg shadow-ieee-blue/20'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              <span>{item.label}</span>
              <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:translate-x-1'
                }`} />
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
