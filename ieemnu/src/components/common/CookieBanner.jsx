import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFocusTrap } from '../../hooks/useFocusTrap';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useFocusTrap(isVisible);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('ieee_cookie_consent');
    if (!cookieConsent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ieee_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('ieee_cookie_consent', 'declined');
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible) return;
    const handler = (e) => {
      if (e.key === 'Escape') setIsVisible(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6"
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
        >
          <div
            ref={bannerRef}
            className="max-w-7xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative"
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-ieee-blue rounded-lg"
              aria-label="Close cookie banner"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 pr-8 sm:pr-0">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                We value your privacy
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
                IEEE websites place cookies on your device to give you the best user experience. By using our websites, you agree to the placement of these cookies. To learn more, read our{' '}
                <Link to="/privacy" className="text-ieee-blue dark:text-ieee-blue-light hover:underline font-medium">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            <div className="flex flex-row gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ieee-blue dark:focus:ring-offset-gray-900 text-sm"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-ieee-blue hover:bg-ieee-blue-dark text-white font-medium transition-colors shadow-lg shadow-ieee-blue/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ieee-blue dark:focus:ring-offset-gray-900 text-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
