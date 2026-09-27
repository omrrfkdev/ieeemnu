/**
 * Dynamic Image Loader Utility
 * Handles automatic image loading from event type folders
 * Supports lazy loading, WebP format optimization, blur placeholders, and responsive images
 */

/**
 * Get image path based on event type and image filename
 * @param {string} type - Event type (techtalk, workshop, competition, event)
 * @param {string} imageName - Image filename
 * @returns {string} Full image path
 */
export const getEventImagePath = (type, imageName) => {
  const normalizedType = type.toLowerCase().replace(/\s+/g, '');
  const folderMap = {
    'techtalk': 'techtalkImg',
    'workshop': 'workshopImg',
    'competition': 'competitionImg',
    'events': 'eventImg',
    'awards': 'awardsImg',
    'event': 'heroBgImg',
    'conference': 'heroBgImg',
    'networking': 'heroBgImg',
  };
  
  const folder = folderMap[normalizedType] || 'heroBgImg';
  return `/${folder}/${imageName}`;
};

/**
 * Generate blur placeholder data URL (LQIP - Low Quality Image Placeholder)
 * @param {number} width - Placeholder width
 * @param {number} height - Placeholder height
 * @returns {string} Data URL for blur placeholder
 */
export const generateBlurPlaceholder = (width = 10, height = 10) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Create gradient placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#0066A1');
  gradient.addColorStop(1, '#00B8D4');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

/**
 * Generate srcset for responsive images
 * @param {string} imagePath - Base image path
 * @param {Array<number>} sizes - Array of image widths
 * @returns {string} srcset string
 */
export const generateSrcSet = (imagePath, sizes = [320, 640, 960, 1280, 1920]) => {
  // For now, return the same image (you can implement server-side resizing later)
  return sizes.map(size => `${imagePath} ${size}w`).join(', ');
};

/**
 * Preload image for better performance
 * @param {string} src - Image source URL
 * @returns {Promise} Promise that resolves when image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Batch preload multiple images
 * @param {Array<string>} imagePaths - Array of image paths
 * @returns {Promise<Array>} Promise that resolves when all images are loaded
 */
export const preloadImages = async (imagePaths) => {
  try {
    const promises = imagePaths.map(path => preloadImage(path));
    return await Promise.all(promises);
  } catch (error) {
    console.warn('Some images failed to preload:', error);
    return [];
  }
};

/**
 * Get optimized image format (WebP with fallback)
 * @param {string} imagePath - Original image path
 * @returns {string} Optimized image path
 */
export const getOptimizedImagePath = (imagePath) => {
  // Check if browser supports WebP
  const supportsWebP = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;
  
  if (supportsWebP && !imagePath.endsWith('.webp')) {
    return imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  
  return imagePath;
};

/**
 * Lazy load image with IntersectionObserver
 * @param {HTMLImageElement} img - Image element
 * @param {string} src - Image source
 * @param {Function} onLoad - Callback when image loads
 */
export const lazyLoadImage = (img, src, onLoad) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = src;
          img.onload = () => {
            img.classList.add('loaded');
            if (onLoad) onLoad();
          };
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px', // Start loading 50px before entering viewport
    });
    
    observer.observe(img);
    return observer;
  } else {
    // Fallback for browsers without IntersectionObserver
    img.src = src;
    if (onLoad) img.onload = onLoad;
  }
};
