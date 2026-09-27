import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import networkAwareLoader from '../../utils/networkAwareLoader';

const OptimizedImage = ({
  src,
  alt = '',
  className = '',
  width,
  height,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  blurDataURL = null,
  placeholder = 'blur',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  const generateBlurDataURL = useCallback(() => {
    if (blurDataURL) return blurDataURL;
    
    return `data:image/svg+xml;base64,${btoa(
      `<svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#e5e7eb"/>
        <rect width="100%" height="100%" fill="url(#pattern)" opacity="0.5"/>
        <defs>
          <pattern id="pattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <circle cx="10" cy="10" r="1" fill="#d1d5db"/>
          </pattern>
        </defs>
      </svg>`
    )}`;
  }, [blurDataURL, width, height]);

  const generateSrcSet = useCallback((baseSrc) => {
    const maxWidth = networkAwareLoader.getMaxImageWidth();
    const quality = networkAwareLoader.getImageQuality();
    const widths = [320, 640, 768, 1024, 1280, 1536].filter(w => w <= maxWidth);
    
    return widths.map(w => `${baseSrc}?w=${w}&q=${quality} ${w}w`).join(', ');
  }, []);

  useEffect(() => {
    if (priority || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.01
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-200 dark:bg-gray-800 ${className}`}
        style={{ width: width || '100%', height: height || 'auto' }}
        {...props}
      >
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || 'auto',
        aspectRatio: width && height ? `${width}/${height}` : undefined
      }}
      {...props}
    >
      {!isLoaded && placeholder === 'blur' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gray-200 dark:bg-gray-800"
          style={{
            backgroundImage: `url(${generateBlurDataURL()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
          }}
        >
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-gray-300/20 to-gray-400/20"
          />
        </motion.div>
      )}

      <motion.img
        src={isInView ? src : undefined}
        srcSet={isInView ? generateSrcSet(src) : undefined}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.05
        }}
        transition={{ 
          opacity: { duration: 0.5 },
          scale: { duration: 0.5 }
        }}
        className={`w-full h-full object-cover ${isLoaded ? '' : 'opacity-0'}`}
        style={{ display: isInView ? 'block' : 'none' }}
      />
    </div>
  );
};

export default OptimizedImage;
