import { useState, useCallback, useMemo } from 'react';
import * as ReactWindow from 'react-window';
import { motion } from 'framer-motion';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';

const { FixedSizeGrid } = ReactWindow;

/**
 * VirtualPhotoGrid - High-performance grid for 1000+ images
 * Uses react-window for virtualization to render only visible items
 */
const VirtualPhotoGrid = ({
  images = [],
  columnCount = 5,
  rowHeight = 300,
  gap = 16,
  aspectRatio = 1, // 1 for square, 1.5 for portrait, 0.75 for landscape
  enableModal = true,
  showOverlay = true,
  className = '',
  containerHeight = 800, // Height of the scrollable container
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Calculate dimensions
  const columnWidth = useMemo(() => {
    return rowHeight / aspectRatio;
  }, [rowHeight, aspectRatio]);

  const rowCount = useMemo(() => {
    return Math.ceil(images.length / columnCount);
  }, [images.length, columnCount]);

  // Handle image click
  const handleImageClick = useCallback((image, index) => {
    if (enableModal) {
      setSelectedImage(image);
      setSelectedIndex(index);
    }
  }, [enableModal]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (selectedIndex < images.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      setSelectedImage(images[newIndex]);
    }
  }, [selectedIndex, images]);

  const handlePrevious = useCallback(() => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      setSelectedImage(images[newIndex]);
    }
  }, [selectedIndex, images]);

  // Cell renderer for react-window
  const Cell = useCallback(({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    
    if (index >= images.length) {
      return null;
    }

    const image = images[index];

    return (
      <div
        style={{
          ...style,
          padding: gap / 2,
        }}
      >
        <PhotoCard
          image={image}
          index={index}
          onClick={() => handleImageClick(image, index)}
          aspectRatio={`aspect-[${aspectRatio}]`}
          showOverlay={showOverlay}
          hoverEffect={true}
          className="h-full"
        />
      </div>
    );
  }, [images, columnCount, gap, aspectRatio, showOverlay, handleImageClick]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={className}
      >
        <FixedSizeGrid
          columnCount={columnCount}
          columnWidth={columnWidth + gap}
          height={containerHeight}
          rowCount={rowCount}
          rowHeight={rowHeight + gap}
          width="100%"
          className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
          style={{
            overflowX: 'hidden',
          }}
        >
          {Cell}
        </FixedSizeGrid>

        {/* Image counter */}
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Showing {images.length} images (Virtual scrolling enabled)
        </div>
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

export default VirtualPhotoGrid;
