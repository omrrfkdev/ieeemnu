/**
 * Virtual Scrolling Examples
 * Demonstrates usage of virtual scrolling components for large image collections
 */

import { useState, useCallback } from 'react';
import { VirtualPhotoGrid, AutoSizedVirtualGrid, InfinitePhotoGrid } from './index';

// Generate mock data for testing
const generateMockImages = (count, startIndex = 0) => {
  return Array.from({ length: count }, (_, i) => ({
    id: startIndex + i,
    src: `https://picsum.photos/400/400?random=${startIndex + i}`,
    alt: `Image ${startIndex + i + 1}`,
    title: `Photo ${startIndex + i + 1}`,
    description: `This is a sample description for photo ${startIndex + i + 1}`,
  }));
};

// Example 1: Basic Virtual Grid (Fixed columns)
export const BasicVirtualGridExample = () => {
  const images = generateMockImages(1000);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Basic Virtual Grid</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Fixed 5-column grid with 1000 images. Only visible items are rendered.
      </p>
      
      <VirtualPhotoGrid
        images={images}
        columnCount={5}
        rowHeight={250}
        gap={16}
        aspectRatio={1}
        containerHeight={600}
        enableModal={true}
        showOverlay={true}
      />
    </div>
  );
};

// Example 2: Auto-Sized Responsive Virtual Grid
export const ResponsiveVirtualGridExample = () => {
  const images = generateMockImages(2000);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Responsive Auto-Sized Virtual Grid</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Automatically adjusts columns based on screen width. 2000 images with responsive breakpoints.
      </p>
      
      <AutoSizedVirtualGrid
        images={images}
        itemMinWidth={200}
        itemHeight={250}
        gap={16}
        aspectRatio={1}
        containerHeight={700}
        enableModal={true}
        showOverlay={true}
        breakpoints={{
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
        }}
        columnsConfig={{
          default: 2,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 6,
        }}
      />
    </div>
  );
};

// Example 3: Infinite Scroll Virtual Grid
export const InfiniteScrollExample = () => {
  const [images, setImages] = useState(generateMockImages(50));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newImages = generateMockImages(50, images.length);
    setImages(prev => [...prev, ...newImages]);
    setIsLoading(false);
    
    // Stop loading after 500 images for demo
    if (images.length >= 500) {
      setHasMore(false);
    }
  }, [images.length, isLoading]);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Infinite Scroll Virtual Grid</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Loads images in batches as you scroll. Perfect for API-driven galleries.
      </p>
      
      <InfinitePhotoGrid
        images={images}
        hasNextPage={hasMore}
        isNextPageLoading={isLoading}
        loadNextPage={loadMore}
        columnCount={5}
        itemHeight={250}
        gap={16}
        aspectRatio={1}
        containerHeight={600}
        enableModal={true}
        showOverlay={true}
      />
    </div>
  );
};

// Example 4: Portrait Images (Different Aspect Ratio)
export const PortraitVirtualGridExample = () => {
  const images = generateMockImages(500);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Portrait Virtual Grid</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        500 portrait-oriented images with 2:3 aspect ratio.
      </p>
      
      <AutoSizedVirtualGrid
        images={images}
        itemMinWidth={200}
        itemHeight={300}
        gap={12}
        aspectRatio={1.5} // Portrait ratio
        containerHeight={800}
        enableModal={true}
        showOverlay={true}
        columnsConfig={{
          default: 2,
          sm: 3,
          md: 4,
          lg: 5,
          xl: 6,
        }}
      />
    </div>
  );
};

// Example 5: Masonry-style (Variable Heights) - Coming Soon
export const MasonryStyleExample = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Masonry Style Grid</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Coming soon: Variable height items in a masonry layout with virtual scrolling.
      </p>
      
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Masonry layout with virtual scrolling requires react-window-masonry or custom implementation.
          <br />
          Use VariableSizeGrid for variable heights.
        </p>
      </div>
    </div>
  );
};

// Main Demo Component
const VirtualScrollingExamples = () => {
  const [activeExample, setActiveExample] = useState('basic');

  const examples = {
    basic: <BasicVirtualGridExample />,
    responsive: <ResponsiveVirtualGridExample />,
    infinite: <InfiniteScrollExample />,
    portrait: <PortraitVirtualGridExample />,
    masonry: <MasonryStyleExample />,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">Virtual Scrolling Examples</h1>
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'basic', label: 'Basic Grid' },
              { id: 'responsive', label: 'Responsive' },
              { id: 'infinite', label: 'Infinite Scroll' },
              { id: 'portrait', label: 'Portrait' },
              { id: 'masonry', label: 'Masonry (Soon)' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveExample(id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeExample === id
                    ? 'bg-ieee-blue text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Example Content */}
      <div className="container mx-auto">
        {examples[activeExample]}
      </div>
    </div>
  );
};

export default VirtualScrollingExamples;
