import { useState, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { generateBlurPlaceholder } from '../../utils/imageLoader';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  wrapperClassName = '',
  placeholderColor = 'bg-gray-200 dark:bg-gray-700',
  onLoad,
  width,
  height,
  sizes,
  priority = false, // For critical images (above fold)
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(false);
  
  // Generate blur placeholder
  const blurDataURL = useMemo(() => generateBlurPlaceholder(), []);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '100px', // Increased for smoother experience
    skip: priority, // Skip intersection observer for priority images
  });

  useEffect(() => {
    if ((inView || priority) && src) {
      setImageSrc(src);
    }
  }, [inView, src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Blur placeholder */}
      {!isLoaded && !error && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
          }}
        />
      )}
      
      {/* Loading shimmer */}
      {!isLoaded && !error && (
        <div className={`absolute inset-0 ${placeholderColor}`}>
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className={`absolute inset-0 ${placeholderColor} flex items-center justify-center`}>
          <span className="text-gray-400 text-sm">Failed to load</span>
        </div>
      )}
      
      {/* Actual image */}
      {imageSrc && !error && (
        <motion.img
          src={imageSrc}
          alt={alt}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width={width}
          height={height}
          sizes={sizes}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;
