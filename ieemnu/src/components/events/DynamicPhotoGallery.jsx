import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import OptimizedImage from '../common/OptimizedImage';
import performanceMonitor from '../../utils/performanceMonitor';

const DynamicPhotoGallery = ({ photos, settings, onPhotoClick }) => {
  const [filter, setFilter] = useState('all');
  const [showFilter, setShowFilter] = useState(false);
  const [randomPositions, setRandomPositions] = useState([]);

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(photos.map(p => p.category).filter(Boolean))];
    return cats;
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (filter === 'all') return photos;
    return photos.filter(p => p.category === filter);
  }, [filter, photos]);

  const generateRandomPositions = (photoList) => {
    const positions = [];
    const gridSize = Math.ceil(Math.sqrt(photoList.length));
    const cellWidth = 100 / gridSize;
    const cellHeight = 100 / gridSize;

    photoList.forEach((photo, index) => {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      
      const randomX = (col * cellWidth) + (Math.random() * cellWidth * 0.6);
      const randomY = (row * cellHeight) + (Math.random() * cellHeight * 0.6);
      const randomRotation = (Math.random() - 0.5) * 15;
      const randomScale = 0.8 + Math.random() * 0.4;
      const randomZIndex = Math.floor(Math.random() * 50) + 10;

      positions.push({
        x: randomX,
        y: randomY,
        rotation: randomRotation,
        scale: randomScale,
        zIndex: randomZIndex,
        delay: index * 0.1
      });
    });

    return positions;
  };

  useEffect(() => {
    setRandomPositions(generateRandomPositions(filteredPhotos));
  }, [filteredPhotos]);

  useEffect(() => {
    performanceMonitor.startRecording();
    return () => {
      performanceMonitor.stopRecording();
    };
  }, []);

  useEffect(() => {
    const criticalImages = filteredPhotos.slice(0, 3);
    criticalImages.forEach((photo) => {
      const img = new Image();
      img.src = photo.src;
      performanceMonitor.observeImageLoad(photo.src, (data) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`Image loaded: ${photo.src.substring(0, 50)}... (${data.loadTime.toFixed(0)}ms)`);
        }
      });
    });
  }, [filteredPhotos]);

  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
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
            Explore moments from our event through this photo gallery
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 flex-wrap">
            {categories.length > 2 && (
              <>
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
              </>
            )}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredPhotos.length > 0 ? (
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-[600px] md:h-[800px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            >
              <AnimatePresence>
                {filteredPhotos.map((photo, index) => {
                  const pos = randomPositions[index];
                  if (!pos) return null;

                  return (
                    <motion.div
                      key={`${filter}-${photo.id}-${index}`}
                      initial={{ 
                        opacity: 0, 
                        scale: 0,
                        x: pos.x,
                        y: pos.y
                      }}
                      animate={{ 
                        opacity: 1, 
                        scale: pos.scale,
                        x: pos.x,
                        y: pos.y,
                        rotate: pos.rotation
                      }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0,
                        x: pos.x,
                        y: pos.y
                      }}
                      transition={{ 
                        delay: pos.delay,
                        duration: 0.5,
                        ease: "backOut"
                      }}
                      style={{
                        position: 'absolute',
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        transform: `translate(-50%, -50%)`,
                        zIndex: pos.zIndex
                      }}
                      className="cursor-pointer"
                      onClick={() => onPhotoClick && onPhotoClick(photo)}
                      whileHover={{ 
                        scale: pos.scale * 1.1, 
                        rotate: 0,
                        zIndex: 100 
                      }}
                      whileTap={{ scale: pos.scale * 0.95 }}
                    >
                      <div className="relative w-48 md:w-64 h-32 md:h-44 rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 bg-white dark:bg-gray-800">
                        <OptimizedImage
                          src={photo.src}
                          alt="Gallery photo"
                          width={256}
                          height={176}
                          sizes="(max-width: 768px) 192px, 256px"
                          className="w-full h-full"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
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

export default DynamicPhotoGallery;
