import { useState } from 'react';
import { motion } from 'framer-motion';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';

const PhotoGrid = ({ 
  images = [], 
  columns = { sm: 2, md: 3, lg: 4, xl: 5 },
  gap = 'gap-4 md:gap-6',
  aspectRatio = 'aspect-square',
  enableModal = true,
  showOverlay = true,
  className = ''
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (image, index) => {
    if (enableModal) {
      setSelectedImage(image);
      setSelectedIndex(index);
    }
  };

  const handleNext = () => {
    if (selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setSelectedImage(images[selectedIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setSelectedImage(images[selectedIndex - 1]);
    }
  };

  const getGridColumns = () => {
    const { sm = 2, md = 3, lg = 4, xl = 5 } = columns;
    return `grid-cols-${sm} sm:grid-cols-${md} md:grid-cols-${lg} lg:grid-cols-${xl}`;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`grid ${getGridColumns()} ${gap} ${className}`}
      >
        {images.map((image, index) => (
          <PhotoCard
            key={image.id || index}
            image={image}
            index={index}
            onClick={() => handleImageClick(image, index)}
            aspectRatio={aspectRatio}
            showOverlay={showOverlay}
          />
        ))}
      </motion.div>

      {enableModal && (
        <PhotoModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          image={selectedImage}
          onNext={handleNext}
          onPrevious={handlePrevious}
          hasNext={selectedIndex < images.length - 1}
          hasPrevious={selectedIndex > 0}
        />
      )}
    </>
  );
};

export default PhotoGrid;
