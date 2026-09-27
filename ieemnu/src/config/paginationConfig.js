/**
 * Pagination Configuration
 * Centralized settings for pagination across the application
 */

export const PAGINATION_CONFIG = {
  // Default items per page
  EVENTS: {
    DEFAULT: 6,
    MOBILE: 3,
    TABLET: 6,
    DESKTOP: 9,
    LARGE_DESKTOP: 12,
  },
  
  PROJECTS: {
    DEFAULT: 6,
    MOBILE: 2,
    TABLET: 4,
    DESKTOP: 6,
    LARGE_DESKTOP: 8,
  },
  
  TEAM: {
    DEFAULT: 8,
    MOBILE: 4,
    TABLET: 6,
    DESKTOP: 8,
    LARGE_DESKTOP: 12,
  },
  
  GALLERY: {
    DEFAULT: 12,
    MOBILE: 6,
    TABLET: 9,
    DESKTOP: 12,
    LARGE_DESKTOP: 18,
  },
};

// Breakpoints for responsive pagination
export const PAGINATION_BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 1024,
  DESKTOP: 1280,
  LARGE_DESKTOP: 1536,
};

/**
 * Get responsive items per page based on screen size
 * @param {Object} config - Configuration object with sizes
 * @returns {number} Items per page
 */
export const getResponsiveItemsPerPage = (config = PAGINATION_CONFIG.EVENTS) => {
  const width = window.innerWidth;
  
  if (width < PAGINATION_BREAKPOINTS.MOBILE) return config.MOBILE;
  if (width < PAGINATION_BREAKPOINTS.TABLET) return config.TABLET;
  if (width < PAGINATION_BREAKPOINTS.DESKTOP) return config.DESKTOP;
  return config.LARGE_DESKTOP;
};

/**
 * Get current breakpoint name
 * @returns {string} Breakpoint name
 */
export const getCurrentBreakpoint = () => {
  const width = window.innerWidth;
  
  if (width < PAGINATION_BREAKPOINTS.MOBILE) return 'MOBILE';
  if (width < PAGINATION_BREAKPOINTS.TABLET) return 'TABLET';
  if (width < PAGINATION_BREAKPOINTS.DESKTOP) return 'DESKTOP';
  return 'LARGE_DESKTOP';
};

/**
 * Pagination behavior settings
 */
export const PAGINATION_BEHAVIOR = {
  // Auto-scroll to top on page change
  AUTO_SCROLL_TO_TOP: true,
  
  // Smooth scroll duration in ms
  SCROLL_DURATION: 500,
  
  // Preload next/previous pages
  PRELOAD_PAGES: true,
  
  // Number of pages to preload ahead
  PRELOAD_AHEAD: 1,
  
  // Show pagination when items exceed threshold
  SHOW_PAGINATION_THRESHOLD: 6,
  
  // Max page buttons to show
  MAX_PAGE_BUTTONS: 7,
  
  // Show first/last buttons
  SHOW_FIRST_LAST_BUTTONS: true,
  
  // Show ellipsis for many pages
  SHOW_ELLIPSIS: true,
};

/**
 * Performance settings
 */
export const PAGINATION_PERFORMANCE = {
  // Enable page caching
  ENABLE_CACHE: true,
  
  // Cache size (number of pages)
  CACHE_SIZE: 10,
  
  // Enable virtual scrolling for large datasets
  ENABLE_VIRTUAL_SCROLL: false,
  
  // Virtual scroll threshold (items)
  VIRTUAL_SCROLL_THRESHOLD: 100,
  
  // Debounce resize events
  DEBOUNCE_RESIZE: 150,
  
  // Throttle scroll events
  THROTTLE_SCROLL: 100,
  
  // Enable lazy loading images
  ENABLE_LAZY_LOADING: true,
  
  // Lazy load root margin
  LAZY_LOAD_ROOT_MARGIN: '100px',
  
  // Lazy load threshold
  LAZY_LOAD_THRESHOLD: 0.1,
};

/**
 * Animation settings
 */
export const PAGINATION_ANIMATION = {
  // Enable page change animations
  ENABLE_ANIMATIONS: true,
  
  // Page change duration in ms
  PAGE_CHANGE_DURATION: 300,
  
  // Item entrance duration in ms
  ITEM_ENTRANCE_DURATION: 400,
  
  // Stagger delay between items in ms
  STAGGER_DELAY: 50,
  
  // Easing function
  EASING: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Respect reduced motion preference
  RESPECT_REDUCED_MOTION: true,
};

/**
 * Accessibility settings
 */
export const PAGINATION_ACCESSIBILITY = {
  // ARIA labels
  FIRST_PAGE_LABEL: 'First page',
  PREVIOUS_PAGE_LABEL: 'Previous page',
  NEXT_PAGE_LABEL: 'Next page',
  LAST_PAGE_LABEL: 'Last page',
  PAGE_LABEL: 'Page',
  
  // Keyboard navigation
  ENABLE_KEYBOARD_NAVIGATION: true,
  
  // Focus management
  MANAGE_FOCUS: true,
  
  // Screen reader announcements
  ANNOUNCE_PAGE_CHANGES: true,
};

/**
 * Get pagination config for a specific content type
 * @param {string} type - Content type (events, projects, team, gallery)
 * @returns {Object} Pagination configuration
 */
export const getPaginationConfig = (type = 'EVENTS') => {
  const upperType = type.toUpperCase();
  return PAGINATION_CONFIG[upperType] || PAGINATION_CONFIG.EVENTS;
};

/**
 * Check if pagination should be shown
 * @param {number} totalItems - Total number of items
 * @param {number} itemsPerPage - Items per page
 * @returns {boolean} Should show pagination
 */
export const shouldShowPagination = (totalItems, itemsPerPage) => {
  return totalItems > PAGINATION_BEHAVIOR.SHOW_PAGINATION_THRESHOLD;
};

/**
 * Calculate optimal pagination settings
 * @param {Object} options - Options object
 * @returns {Object} Optimized settings
 */
export const calculateOptimalPagination = (options = {}) => {
  const {
    totalItems = 0,
    type = 'EVENTS',
    customItemsPerPage = null,
  } = options;

  const config = getPaginationConfig(type);
  const itemsPerPage = customItemsPerPage || getResponsiveItemsPerPage(config);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const showPagination = shouldShowPagination(totalItems, itemsPerPage);

  return {
    itemsPerPage,
    totalPages,
    showPagination,
    totalItems,
    breakpoint: getCurrentBreakpoint(),
  };
};