/**
 * Web Vitals Performance Monitoring
 * Tracks Core Web Vitals (LCP, FID, CLS) and other performance metrics
 */

/**
 * Report Web Vitals to analytics or console
 * @param {Object} metric - Web Vitals metric object
 */
const reportWebVitals = (metric) => {
  // In production, send to analytics service
  if (import.meta.env.PROD) {
    // Example: Send to Google Analytics
    // gtag('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   metric_id: metric.id,
    //   metric_value: metric.value,
    //   metric_delta: metric.delta,
    // });
    
    console.log('Web Vital:', metric.name, metric.value);
  } else {
    // In development, log to console
    console.log('Web Vital:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }
};

/**
 * Initialize Web Vitals tracking
 * Uses dynamic import to avoid loading in development
 */
export const initWebVitals = async () => {
  if ('web-vital' in window || import.meta.env.DEV) {
    return; // Already initialized or in dev mode
  }

  try {
    // Polyfill for older browsers
    const { onCLS, onFID, onFCP, onLCP, onTTFB } = await import('web-vitals');
    
    // Track Core Web Vitals
    onCLS(reportWebVitals);  // Cumulative Layout Shift
    onFID(reportWebVitals);  // First Input Delay
    onLCP(reportWebVitals);  // Largest Contentful Paint
    
    // Track other metrics
    onFCP(reportWebVitals);  // First Contentful Paint
    onTTFB(reportWebVitals); // Time to First Byte
    
    window['web-vital'] = true;
  } catch (error) {
    console.warn('Web Vitals not available:', error);
  }
};

/**
 * Track custom performance marks
 * @param {string} name - Performance mark name
 */
export const markPerformance = (name) => {
  if ('performance' in window && 'mark' in performance) {
    performance.mark(name);
  }
};

/**
 * Measure performance between two marks
 * @param {string} name - Measure name
 * @param {string} startMark - Start mark name
 * @param {string} endMark - End mark name
 */
export const measurePerformance = (name, startMark, endMark) => {
  if ('performance' in window && 'measure' in performance) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      console.log(`Performance: ${name} took ${measure.duration.toFixed(2)}ms`);
      return measure.duration;
    } catch (error) {
      console.warn('Performance measure failed:', error);
    }
  }
  return null;
};

/**
 * Get navigation timing metrics
 * @returns {Object} Navigation timing metrics
 */
export const getNavigationMetrics = () => {
  if (!('performance' in window) || !performance.getEntriesByType) {
    return null;
  }

  const [navigation] = performance.getEntriesByType('navigation');
  if (!navigation) return null;

  return {
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    download: navigation.responseEnd - navigation.responseStart,
    domInteractive: navigation.domInteractive - navigation.fetchStart,
    domComplete: navigation.domComplete - navigation.fetchStart,
    loadComplete: navigation.loadEventEnd - navigation.fetchStart,
  };
};

/**
 * Monitor long tasks (tasks taking more than 50ms)
 */
export const monitorLongTasks = () => {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.warn('Long Task detected:', {
          duration: entry.duration,
          startTime: entry.startTime,
        });
      }
    });

    observer.observe({ entryTypes: ['longtask'] });
  } catch (error) {
    console.warn('Long task monitoring not supported:', error);
  }
};

export default {
  initWebVitals,
  markPerformance,
  measurePerformance,
  getNavigationMetrics,
  monitorLongTasks,
};
