import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter } from 'lucide-react';

const ScatteredPhotoGallery = ({ photos, settings, onPhotoClick }) => {
  const [filter, setFilter] = useState('all');
  const [showFilter, setShowFilter] = useState(false);

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(photos.map(p => p.category).filter(Boolean))];
    return cats;
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (filter === 'all') return photos;
    return photos.filter(p => p.category === filter);
  }, [filter, photos]);

  const scatteredPhotos = useMemo(() => {
    return filteredPhotos.map((photo, index) => {
      const isLarge = index % 4 === 0;
      const isMedium = index % 4 === 1 || index % 4 === 2;
      const isSmall = index % 4 === 3;

      const sizes = isLarge 
        ? { width: 'w-72 h-72 md:w-96 md:h-96', zIndex: 20 - (index % 5) }
        : isMedium
          ? { width: 'w-56 h-56 md:w-72 md:h-72', zIndex: 25 - (index % 5) }
          : { width: 'w-44 h-44 md:w-56 md:h-56', zIndex: 30 - (index % 5) };

      const rotations = [
        '-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 
        'rotate-1', '-rotate-4', 'rotate-4'
      ];
      const rotation = rotations[index % rotations.length];

      const positions = [
        'translate-x-0 translate-y-0',
        'translate-x-4 translate-y-2',
        '-translate-x-2 translate-y-4',
        'translate-x-2 -translate-y-2',
        '-translate-x-4 -translate-y-1',
        'translate-x-1 translate-y-3',
        '-translate-x-1 -translate-y-3',
        'translate-x-3 translate-y-1',
      ];
      const position = positions[index % positions.length];

      return {
        ...photo,
        ...sizes,
        rotation,
        position,
        delay: index * 0.1
      };
    });
  }, [filteredPhotos]);

  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Event Gallery
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Explore moments from our event
          </p>
        </motion.div>

        {categories.length > 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-ieee-blue hover:text-white dark:hover:bg-ieee-blue transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>

              <AnimatePresence>
                {showFilter && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-2 flex-wrap"
                  >
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        onClick={() => setFilter(category)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          filter === category
                            ? 'bg-ieee-blue text-white dark:bg-ieee-blue-light'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {category === 'all' ? 'All Photos' : category}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {scatteredPhotos.length > 0 ? (
              <div className="flex flex-wrap justify-center items-start gap-4 py-8 min-h-[500px]">
                {scatteredPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id || index}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.5, 
                      y: 50,
                      rotate: photo.rotation.includes('-') ? 10 : -10
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      rotate: 0
                    }}
                    transition={{ 
                      delay: photo.delay,
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: photo.rotation.includes('-') ? -3 : 3,
                      zIndex: 50
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative ${photo.width} ${photo.rotation} ${photo.position} cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-300`}
                    style={{ zIndex: photo.zIndex }}
                    onClick={() => onPhotoClick && onPhotoClick(photo)}
                  >
                    <img
                      src={photo.src || photo.url}
                      alt={photo.caption || photo.alt || `Photo ${index + 1}`}
                      className={`w-full h-full object-cover rounded-2xl border-4 border-white dark:border-gray-700`}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center"
                    >
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        className="text-white font-medium"
                      >
                        Click to view
                      </motion.span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No photos found in this category
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {settings?.enableLightbox && onPhotoClick && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm"
          >
            Click on any photo to view in full screen
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default ScatteredPhotoGallery;
