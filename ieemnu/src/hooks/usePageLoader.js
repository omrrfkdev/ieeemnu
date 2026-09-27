/**
 * usePageLoader Hook
 * Handles image preloading and loading state for pages
 * Ensures all critical images are loaded before showing content
 */

import { useState, useEffect, useCallback } from 'react';

const usePageLoader = (imageSources = [], minLoadTime = 300) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [error, setError] = useState(null);

  const preloadImages = useCallback(async () => {
    if (imageSources.length === 0) {
      // No images to preload, just wait minimum time
      setTimeout(() => setIsLoading(false), minLoadTime);
      return;
    }

    let loaded = 0;
    const total = imageSources.length;

    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          setLoadedCount(loaded);
          resolve({ src, status: 'loaded' });
        };
        img.onerror = () => {
          loaded++;
          setLoadedCount(loaded);
          resolve({ src, status: 'error' });
        };
        img.src = src;
      });
    };

    try {
      await Promise.all(imageSources.map(loadImage));
      // Small delay for smooth transition
      setTimeout(() => setIsLoading(false), minLoadTime);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, [imageSources, minLoadTime]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  return {
    isLoading,
    loadedCount,
    totalImages: imageSources.length,
    progress: imageSources.length > 0 ? (loadedCount / imageSources.length) * 100 : 100,
    error,
  };
};

export default usePageLoader;
