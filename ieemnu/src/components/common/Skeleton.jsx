/**
 * Skeleton Component
 * Reusable skeleton loader for various content types
 * Provides smooth loading states with shimmer animation
 */

import { motion } from 'framer-motion';

/**
 * Base Skeleton component
 */
export const Skeleton = ({ 
  className = '', 
  variant = 'rectangular',
  width,
  height,
  animate = true,
  ...props 
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700 overflow-hidden relative';
  
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4',
    card: 'rounded-xl',
  };

  const Component = animate ? motion.div : 'div';
  const animationProps = animate ? {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  } : {};

  return (
    <Component
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        width,
        height,
        backgroundImage: animate 
          ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
          : undefined,
        backgroundSize: '200% 100%',
      }}
      {...animationProps}
      {...props}
    />
  );
};

/**
 * Card Skeleton
 */
export const SkeletonCard = ({ className = '' }) => (
  <div className={`p-4 border border-gray-200 dark:border-gray-700 rounded-xl ${className}`}>
    <Skeleton variant="rectangular" height={200} className="mb-4" />
    <Skeleton variant="text" className="mb-2" width="80%" />
    <Skeleton variant="text" className="mb-2" width="60%" />
    <Skeleton variant="text" width="40%" />
  </div>
);

/**
 * Event Card Skeleton
 */
export const SkeletonEventCard = ({ className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg ${className}`}>
    <Skeleton variant="rectangular" height={250} />
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1">
          <Skeleton variant="text" width="70%" className="mb-2" />
          <Skeleton variant="text" width="50%" />
        </div>
      </div>
      <Skeleton variant="text" className="mb-2" />
      <Skeleton variant="text" className="mb-2" width="90%" />
      <Skeleton variant="text" width="60%" />
    </div>
  </div>
);

/**
 * Board Member Card Skeleton
 */
export const SkeletonMemberCard = ({ className = '' }) => (
  <div className={`text-center ${className}`}>
    <Skeleton variant="circular" width={200} height={200} className="mx-auto mb-4" />
    <Skeleton variant="text" width={150} height={24} className="mx-auto mb-2" />
    <Skeleton variant="text" width={120} className="mx-auto mb-2" />
    <Skeleton variant="text" width={100} className="mx-auto" />
  </div>
);

/**
 * Grid Skeleton
 */
export const SkeletonGrid = ({ 
  count = 6, 
  columns = 3,
  gap = 4,
  CardComponent = SkeletonCard,
  className = '' 
}) => (
  <div 
    className={`grid gap-${gap} ${className}`}
    style={{
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <CardComponent key={i} />
    ))}
  </div>
);

/**
 * Page Skeleton
 */
export const SkeletonPage = ({ className = '' }) => (
  <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
    {/* Hero Section */}
    <div className="relative h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 h-full flex items-center justify-center">
        <div className="text-center max-w-3xl">
          <Skeleton variant="text" height={48} className="mb-4 mx-auto" width="80%" />
          <Skeleton variant="text" height={24} className="mb-6 mx-auto" width="60%" />
          <Skeleton variant="rectangular" height={48} width={200} className="mx-auto" />
        </div>
      </div>
    </div>

    {/* Content Section */}
    <div className="container mx-auto px-4 py-16">
      <Skeleton variant="text" height={32} width={300} className="mb-8" />
      <SkeletonGrid count={6} columns={3} />
    </div>
  </div>
);

export default Skeleton;
