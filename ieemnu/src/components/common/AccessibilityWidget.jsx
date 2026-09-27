import { useState, useEffect, useRef } from 'react';
import { Accessibility, X, Eye, Type, Link as LinkIcon, PauseCircle, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useFocusTrap } from '../../hooks/useFocusTrap';

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { preferences, togglePreference, resetPreferences } = useAccessibility();
  const [announcement, setAnnouncement] = useState('');
  const panelRef = useFocusTrap(isOpen);

  const features = [
    { id: 'highContrast', icon: Eye, label: 'High Contrast', description: 'Stark black and yellow colors for visual clarity.' },
    { id: 'largeText', icon: Type, label: 'Large Text', description: 'Increases global font size by 20%.' },
    { id: 'highlightLinks', icon: LinkIcon, label: 'Highlight Links', description: 'Underlines and highlights clickable elements.' },
    { id: 'stopAnimations', icon: PauseCircle, label: 'Stop Animations', description: 'Freezes all moving elements and transitions.' },
  ];

  const handleToggle = (id, label) => {
    const isActive = !preferences[id];
    togglePreference(id);
    setAnnouncement(`${label} ${isActive ? 'enabled' : 'disabled'}`);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <button
        onClick={handleOpen}
        className={`fixed bottom-6 left-6 z-[100] w-14 h-14 bg-ieee-blue hover:bg-ieee-blue-dark text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-ieee-blue/50 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Open Accessibility Menu (Alt+A)"
      >
        <Accessibility className="w-7 h-7" />
      </button>

      <div className="sr-only" aria-live="polite" role="status">{announcement}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-6 z-[110] w-[90vw] max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-panel-title"
          >
            <div ref={panelRef}>
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-ieee-blue/10 rounded-lg">
                    <Accessibility className="w-5 h-5 text-ieee-blue" aria-hidden="true" />
                  </div>
                  <h2 id="a11y-panel-title" className="font-bold text-gray-900 dark:text-white">Accessibility</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ieee-blue"
                  aria-label="Close Accessibility Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 max-h-[60vh] overflow-y-auto">
                {features.map(({ id, icon: Icon, label, description }) => {
                  const isActive = preferences[id];
                  return (
                    <button
                      key={id}
                      onClick={() => handleToggle(id, label)}
                      className={`w-full flex items-start gap-4 p-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ieee-blue text-left ${
                        isActive
                          ? 'bg-ieee-blue/10 dark:bg-ieee-blue/20 ring-1 ring-ieee-blue/30'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      role="switch"
                      aria-checked={isActive}
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${isActive ? 'bg-ieee-blue text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 dark:text-white mb-1 flex items-center justify-between gap-2">
                          <span>{label}</span>
                          <div className={`w-8 h-4 rounded-full transition-colors relative shrink-0 ${isActive ? 'bg-ieee-blue' : 'bg-gray-300 dark:bg-gray-600'}`}>
                            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${isActive ? 'left-[18px]' : 'left-0.5'}`} />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <button
                  onClick={() => { resetPreferences(); setAnnouncement('All settings reset'); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-ieee-blue"
                >
                  <RefreshCcw className="w-4 h-4" aria-hidden="true" />
                  Reset Settings
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityWidget;
