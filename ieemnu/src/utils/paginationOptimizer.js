/**
 * Pagination Performance Optimization Utilities
 * Provides tools for optimizing paginated content performance
 */

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Throttle function to limit how often a function can be called
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Memory-efficient pagination cache
 * Caches pages to prevent unnecessary recalculations
 */
class PaginationCache {
  constructor(maxSize = 10) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  clear() {
    this.cache.clear();
  }

  has(key) {
    return this.cache.has(key);
  }
}

export const paginationCache = new PaginationCache();

/**
 * Calculate optimal page size based on screen size
 * @returns {number} Optimal items per page
 */
export const getOptimalPageSize = () => {
  const width = window.innerWidth;
  
  if (width < 640) return 3;      // Mobile
  if (width < 1024) return 6;     // Tablet
  if (width < 1280) return 9;     // Desktop
  return 12;                      // Large Desktop
};

/**
 * Smart image preloader for paginated content
 * Preloads current, next, and previous page images
 * @param {Array} currentItems - Current page items
 * @param {Array} nextItems - Next page items
 * @param {Array} previousItems - Previous page items
 * @param {Function} getImagePath - Function to get image path from item
 * @returns {Promise<void>}
 */
export const preloadPaginationImages = async (
  currentItems, 
  nextItems = [], 
  previousItems = [], 
  getImagePath
) => {
  const allItems = [...previousItems, ...currentItems, ...nextItems];
  const imagePromises = allItems.map(item => {
    const imagePath = getImagePath(item);
    if (imagePath) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Resolve even on error to not block
        img.src = imagePath;
      });
    }
    return Promise.resolve();
  });

  await Promise.all(imagePromises);
};

/**
 * Performance monitor for pagination
 */
export class PaginationPerformanceMonitor {
  constructor() {
    this.metrics = new Map();
  }

  startMeasure(operation) {
    if (typeof performance !== 'undefined') {
      this.metrics.set(operation, performance.now());
    }
  }

  endMeasure(operation) {
    if (typeof performance !== 'undefined' && this.metrics.has(operation)) {
      const startTime = this.metrics.get(operation);
      const duration = performance.now() - startTime;
      this.metrics.delete(operation);
      
      console.log(`[Pagination Performance] ${operation}: ${duration.toFixed(2)}ms`);
      return duration;
    }
    return 0;
  }

  measureAsync(operation, asyncFn) {
    this.startMeasure(operation);
    return asyncFn().finally(() => {
      this.endMeasure(operation);
    });
  }
}

export const paginationMonitor = new PaginationPerformanceMonitor();

/**
 * Virtual scrolling helper for very large datasets
 * @param {Array} data - All data items
 * @param {number} viewportHeight - Height of viewport
 * @param {number} itemHeight - Height of each item
 * @returns {Object} Virtual scrolling configuration
 */
export const calculateVirtualScroll = (data, viewportHeight, itemHeight = 300) => {
  const totalHeight = data.length * itemHeight;
  const visibleItems = Math.ceil(viewportHeight / itemHeight);
  const bufferItems = Math.ceil(visibleItems * 0.5); // 50% buffer
  
  return {
    totalHeight,
    visibleItems,
    bufferItems,
    startIndex: 0,
    endIndex: visibleItems + bufferItems,
  };
};

/**
 * Lazy loading configuration for pagination
 */
export const lazyLoadConfig = {
  rootMargin: '100px', // Start loading 100px before visible
  threshold: 0.1, // Trigger when 10% visible
};

/**
 * Pagination animation timing
 */
export const animationTiming = {
  pageChange: 300,
  itemEntrance: 400,
  staggerDelay: 50,
};

/**
 * Get pagination analytics
 * @param {Object} paginationState - Current pagination state
 * @returns {Object} Analytics data
 */
export const getPaginationAnalytics = (paginationState) => {
  const { currentPage, totalPages, itemsPerPage } = paginationState;
  
  return {
    currentPage,
    totalPages,
    totalItems: totalPages * itemsPerPage,
    progressPercentage: (currentPage / totalPages) * 100,
    itemsViewed: (currentPage - 1) * itemsPerPage,
    itemsRemaining: (totalPages - currentPage) * itemsPerPage,
    isNearStart: currentPage <= 2,
    isNearEnd: currentPage >= totalPages - 2,
    isInMiddle: currentPage > 2 && currentPage < totalPages - 2,
  };
};