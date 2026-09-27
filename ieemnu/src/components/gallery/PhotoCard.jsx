import { motion } from 'framer-motion';
import LazyImage from './LazyImage';

const PhotoCard = ({ 
  image, 
  onClick, 
  index = 0,
  className = '',
  aspectRatio = 'aspect-square',
  hoverEffect = true,
  showOverlay = true 
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.05,
        ease: 'easeOut'
      }
    }
  };

  const hoverVariants = hoverEffect ? {
    scale: 1.05,
    y: -8,
    transition: { duration: 0.3, ease: 'easeOut' }
  } : {};

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={hoverVariants}
      className={`group relative ${aspectRatio} overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <LazyImage
        src={image.src || image}
        alt={image.alt || 'Photo'}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        wrapperClassName="w-full h-full"
      />
      
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {image.title && (
              <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">
                {image.title}
              </h3>
            )}
            {image.description && (
              <p className="text-gray-200 text-sm line-clamp-2">
                {image.description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Subtle glow effect on hover */}
      {hoverEffect && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-ieee-blue/20 via-transparent to-purple-500/20" />
        </div>
      )}
    </motion.div>
  );
};

export default PhotoCard;
