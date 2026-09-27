import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import * as ReactWindow from 'react-window';
import { motion } from 'framer-motion';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';

const { FixedSizeGrid } = ReactWindow;

/**
 * AutoSizedVirtualGrid - Responsive virtual grid that adapts to container width
 * Automatically calculates column count based on container width and breakpoints
 */
const AutoSizedVirtualGrid = ({
  images = [],
  itemMinWidth = 250, // Minimum width per item
  itemHeight = 300,
  gap = 16,
  aspectRatio = 1,
  enableModal = true,
  showOverlay = true,
  className = '',
  containerHeight = 'auto', // 'auto' or specific height
  breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  columnsConfig = {
    default: 2,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
}) => {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [calculatedHeight, setCalculatedHeight] = useState(800);

  // Calculate column count based on container width
  const columnCount = useMemo(() => {
    if (containerWidth === 0) return columnsConfig.default;

    if (containerWidth >= breakpoints.xl) return columnsConfig.xl;
    if (containerWidth >= breakpoints.lg) return columnsConfig.lg;
    if (containerWidth >= breakpoints.md) return columnsConfig.md;
    if (containerWidth >= breakpoints.sm) return columnsConfig.sm;
    return columnsConfig.default;
  }, [containerWidth, breakpoints, columnsConfig]);

  // Calculate column width based on container width and column count
  const columnWidth = useMemo(() => {
    if (containerWidth === 0) return itemMinWidth;
    return Math.floor((containerWidth - gap * (columnCount + 1)) / columnCount);
  }, [containerWidth, columnCount, gap, itemMinWidth]);

  // Calculate row height based on aspect ratio
  const rowHeight = useMemo(() => {
    return Math.floor(columnWidth * aspectRatio);
  }, [columnWidth, aspectRatio]);

  // Calculate row count
  const rowCount = useMemo(() => {
    return Math.ceil(images.length / columnCount);
  }, [images.length, columnCount]);

  // Update container width on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);

        // Calculate height if auto
        if (containerHeight === 'auto') {
          const viewportHeight = window.innerHeight;
          const calculatedRows = Math.ceil(images.length / columnCount);
          const totalHeight = Math.min(
            calculatedRows * (rowHeight + gap),
            viewportHeight * 0.8 // Max 80% of viewport
          );
          setCalculatedHeight(totalHeight);
        }
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerHeight, images.length, columnCount, rowHeight, gap]);

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

  // Cell renderer
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
          left: style.left + gap / 2,
          top: style.top + gap / 2,
          width: style.width - gap,
          height: style.height - gap,
        }}
      >
        <PhotoCard
          image={image}
          index={index}
          onClick={() => handleImageClick(image, index)}
          aspectRatio="aspect-auto"
          showOverlay={showOverlay}
          hoverEffect={true}
          className="w-full h-full"
        />
      </div>
    );
  }, [images, columnCount, gap, showOverlay, handleImageClick]);

  const gridHeight = containerHeight === 'auto' ? calculatedHeight : containerHeight;

  return (
    <>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full ${className}`}
      >
        {containerWidth > 0 && (
          <FixedSizeGrid
            columnCount={columnCount}
            columnWidth={columnWidth + gap}
            height={gridHeight}
            rowCount={rowCount}
            rowHeight={rowHeight + gap}
            width={containerWidth}
            className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
            style={{
              overflowX: 'hidden',
            }}
            overscanRowCount={2}
          >
            {Cell}
          </FixedSizeGrid>
        )}

        {/* Stats */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            {images.length.toLocaleString()} images • {columnCount} columns • Virtual scrolling
          </span>
          <span className="text-xs">
            Only rendering visible items for optimal performance
          </span>
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

export default AutoSizedVirtualGrid;
