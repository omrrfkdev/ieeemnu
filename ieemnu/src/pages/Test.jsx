/**
 * Events Page - Fully Optimized
 * Features:
 * - Dynamic image loading from event type folders (techtalk, workshop, competition)
 * - Lazy loading with IntersectionObserver
 * - GSAP animations with performance optimizations
 * - Modern UI with glass effects and gradients
 * - Responsive tabs with horizontal scroll on mobile
 * - Accessibility support with prefers-reduced-motion
 * - High Lighthouse score optimization
 */

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Calendar } from 'lucide-react';
import DomeGallery from '../components/animations/DomeGallery';
import EventCard from '../components/events/EventCard';
import { PhotoGrid } from '../components/gallery';
import { UPCOMING_EVENTS, EVENT_GALLERY_IMAGES, PARTNERSHIP_IMAGES } from '../constants';
import PageLoader from '../components/common/PageLoader';
import { preloadImages, getEventImagePath } from '../utils/imageLoader';

// Custom hook to detect screen size with debouncing
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    let timeoutId;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150); // Debounce resize events
    };
    
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return isMobile;
};

// Event types for filtering
const EVENT_TYPES = [
  { id: 'all', label: 'All', gradient: 'from-ieee-blue to-accent-purple' },
  { id: 'techtalk', label: 'Tech Talk', gradient: 'from-blue-500 to-purple-500' },
  { id: 'workshop', label: 'Workshop', gradient: 'from-green-500 to-teal-500' },
  { id: 'competition', label: 'Competition', gradient: 'from-orange-500 to-red-500' },
  { id: 'events', label: 'Events', gradient: 'from-pink-500 to-rose-500' },
  { id: 'awards', label: 'Awards', gradient: 'from-yellow-500 to-amber-600' },
  { id: 'partnership', label: 'Partnership', gradient: 'from-indigo-500 to-purple-600' },
];


/**
 * Events page component - Fully optimized
 * @returns {JSX.Element} Events page
 */
const Events = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const isMobile = useIsMobile();
  const tabsRef = useRef(null);
  
  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Memoized filtered events based on selected type, sorted by date (newest first)
  const filteredEvents = useMemo(() => {
    const events = selectedType === 'all' 
      ? [...UPCOMING_EVENTS]
      : UPCOMING_EVENTS.filter(event => event.type === selectedType);
    
    // Sort by date in descending order (newest first)
    return events.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA; // Descending order
    });
  }, [selectedType]);

  // Preload critical images on mount
  useEffect(() => {
    const imagesToPreload = UPCOMING_EVENTS.slice(0, 6).map(event => 
      getEventImagePath(event.type, event.imageName)
    );
    
    preloadImages(imagesToPreload)
      .then(() => {
        setImagesPreloaded(true);
        setTimeout(() => setIsLoading(false), 300);
      })
      .catch(() => {
        setImagesPreloaded(true);
        setIsLoading(false);
      });
  }, []);

  // Handle tab change with smooth scroll on mobile
  const handleTabChange = useCallback((type) => {
    setSelectedType(type);
    
    // Scroll active tab into view on mobile
    if (isMobile && tabsRef.current) {
      const activeTab = tabsRef.current.querySelector(`[data-type="${type}"]`);
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [isMobile]);

  // Get count for each event type
  const getTypeCount = useCallback((type) => {
    if (type === 'all') return UPCOMING_EVENTS.length;
    if (type === 'partnership') return PARTNERSHIP_IMAGES.length;
    return UPCOMING_EVENTS.filter(event => event.type === type).length;
  }, []);

  return (
    <div className="events-page">
      {/* Hero Section with Dome Gallery */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] w-full overflow-hidden">
        {/* DomeGallery Background - Full Width with responsive settings */}
        <div className="absolute inset-0 w-full h-full">
          <DomeGallery
            images={EVENT_GALLERY_IMAGES}
            overlayBlurColor="#1a1a2e"
            grayscale={false}
            imageBorderRadius={isMobile ? "10px" : "16px"}
            openedImageBorderRadius={isMobile ? "12px" : "20px"}
            openedImageWidth={isMobile ? "280px" : "500px"}
            openedImageHeight={isMobile ? "220px" : "400px"}
            fit={isMobile ? 1.2 : 0.8}
            minRadius={isMobile ? 250 : 500}
            maxRadius={isMobile ? 600 : 1200}
            segments={isMobile ? 20 : 35}
            padFactor={isMobile ? 0.05 : 0.1}
            dragSensitivity={isMobile ? 15 : 20}
          />
        </div>
        
        {/* Overlay Content with Glassmorphism - Responsive */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
          <div className="text-center w-full max-w-xl">
            {/* Glassmorphism Card for Text - Responsive padding */}
            <div className="bg-black/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl px-4 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 shadow-2xl border border-white/10 mx-2 sm:mx-0">
              <button
                onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 bg-ieee-blue/80 backdrop-blur-sm rounded-full mb-4 sm:mb-6 text-white transition-all duration-300 hover:bg-ieee-blue hover:scale-105 hover:shadow-lg hover:shadow-ieee-blue/50 cursor-pointer group"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-sm sm:text-base md:text-lg font-medium text-white">Discover Our Events</span>
              </button>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-4 text-white">
                Events
              </h1>
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-200 max-w-2xl mx-auto px-2">
                Join us for competitions, seminars, and networking events
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section with Tabs */}
      <section id="events" className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Last Events
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our latest tech talks, workshops, and competitions
            </p>
          </div>

          {/* Event Type Tabs - Responsive with horizontal scroll on mobile */}
          <div className="mb-8 sm:mb-12">
            <div 
              ref={tabsRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 sm:justify-center"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {EVENT_TYPES.map((type) => {
                const count = getTypeCount(type.id);
                const isActive = selectedType === type.id;
                
                return (
                  <button
                    key={type.id}
                    data-type={type.id}
                    onClick={() => handleTabChange(type.id)}
                    className={`
                      relative flex-shrink-0 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base
                      transition-all duration-300 transform
                      ${
                        isActive
                          ? `bg-gradient-to-r ${type.gradient} text-white shadow-lg scale-105`
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md hover:scale-102'
                      }
                    `}
                    aria-pressed={isActive}
                    aria-label={`Filter by ${type.label}`}
                  >
                    <span className="flex items-center gap-2">
                      {type.label}
                      <span className={`
                        inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold
                        ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }
                      `}>
                        {count}
                      </span>
                    </span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Partnership Images Gallery */}
          {selectedType === 'partnership' ? (
            <PhotoGrid
              images={PARTNERSHIP_IMAGES}
              columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
              gap="gap-4 md:gap-6"
              aspectRatio="aspect-square"
              enableModal={true}
              showOverlay={false}
            />
          ) : (
            <>
              {/* Events Grid - Optimized with lazy loading */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </div>

              {/* Empty State */}
              {filteredEvents.length === 0 && (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                    <Calendar className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Events Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Check back soon for upcoming {selectedType !== 'all' ? EVENT_TYPES.find(t => t.id === selectedType)?.label.toLowerCase() : 'events'}!
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

    </div>
  );
};

export default Events;
