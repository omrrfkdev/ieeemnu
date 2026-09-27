import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import * as ReactWindow from 'react-window';
import * as ReactWindowInfiniteLoader from 'react-window-infinite-loader';
import { motion } from 'framer-motion';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';

const { FixedSizeGrid } = ReactWindow;
const InfiniteLoader = ReactWindowInfiniteLoader.default || ReactWindowInfiniteLoader;

/**
 * InfinitePhotoGrid - Virtual grid with infinite scroll loading
 * Perfect for loading images from API in batches
 */
const InfinitePhotoGrid = ({
  images = [],
  hasNextPage = false,
  isNextPageLoading = false,
  loadNextPage = () => {},
  columnCount = 5,
  itemHeight = 300,
  gap = 16,
  aspectRatio = 1,
  enableModal = true,
  showOverlay = true,
  className = '',
  containerHeight = 800,
  loadingPlaceholder = null,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Calculate dimensions
  const columnWidth = useMemo(() => {
    if (containerWidth === 0) return itemHeight / aspectRatio;
    return Math.floor((containerWidth - gap * (columnCount + 1)) / columnCount);
  }, [containerWidth, columnCount, gap, itemHeight, aspectRatio]);

  const rowHeight = useMemo(() => {
    return Math.floor(columnWidth * aspectRatio);
  }, [columnWidth, aspectRatio]);

  const rowCount = useMemo(() => {
    return Math.ceil(images.length / columnCount) + (hasNextPage ? 1 : 0);
  }, [images.length, columnCount, hasNextPage]);

  // Update container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

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

  // Check if item is loaded
  const isItemLoaded = useCallback((index) => {
    return !hasNextPage || index < images.length;
  }, [hasNextPage, images.length]);

  // Cell renderer
  const Cell = useCallback(({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    
    // Loading placeholder
    if (index >= images.length) {
      if (loadingPlaceholder) {
        return (
          <div style={{ ...style, padding: gap / 2 }}>
            {loadingPlaceholder}
          </div>
        );
      }
      return (
        <div style={{ ...style, padding: gap / 2 }}>
          <div className="w-full h-full rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
      );
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
  }, [images, columnCount, gap, aspectRatio, showOverlay, handleImageClick, loadingPlaceholder]);

  // Item count for infinite loader
  const itemCount = hasNextPage ? images.length + columnCount : images.length;

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
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={isNextPageLoading ? () => {} : loadNextPage}
            threshold={5}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeGrid
                ref={ref}
                columnCount={columnCount}
                columnWidth={columnWidth + gap}
                height={containerHeight}
                rowCount={rowCount}
                rowHeight={rowHeight + gap}
                width={containerWidth}
                onItemsRendered={(gridData) => {
                  const startIndex = gridData.visibleRowStartIndex * columnCount;
                  const stopIndex = gridData.visibleRowStopIndex * columnCount + columnCount - 1;
                  onItemsRendered({
                    visibleStartIndex: startIndex,
                    visibleStopIndex: stopIndex,
                  });
                }}
                className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
                style={{
                  overflowX: 'hidden',
                }}
                overscanRowCount={2}
              >
                {Cell}
              </FixedSizeGrid>
            )}
          </InfiniteLoader>
        )}

        {/* Stats and loading indicator */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            {images.length.toLocaleString()} images loaded
            {hasNextPage && ' • Scroll for more'}
          </span>
          {isNextPageLoading && (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-ieee-blue border-t-transparent rounded-full animate-spin" />
              Loading more...
            </span>
          )}
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

export default InfinitePhotoGrid;
