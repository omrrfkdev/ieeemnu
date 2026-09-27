# Virtual Scrolling Guide - Handling 1000+ Images

## 🚀 Overview

Virtual scrolling is a technique that renders only the visible items in a large list or grid, dramatically improving performance when displaying thousands of images. Instead of rendering all 1000+ images at once, only the ~20-50 visible items are in the DOM at any time.

## 📊 Performance Comparison

| Scenario | Regular Grid | Virtual Grid |
|----------|-------------|--------------|
| 100 images | ✅ Fast | ✅ Fast |
| 500 images | ⚠️ Slow | ✅ Fast |
| 1000 images | ❌ Very Slow | ✅ Fast |
| 5000 images | ❌ Unusable | ✅ Fast |
| 10000+ images | ❌ Crashes | ✅ Fast |

**Memory Usage:**
- Regular: ~500MB for 1000 images
- Virtual: ~50MB for 1000 images (90% reduction!)

---

## 🎯 When to Use Virtual Scrolling

### ✅ Use Virtual Scrolling When:
- Displaying **500+ images**
- Loading images from an API in batches
- Building infinite scroll galleries
- Performance is critical
- Mobile users are primary audience
- Images are uniform size

### ❌ Use Regular Grid When:
- Less than **100 images**
- Images have variable heights (masonry layout)
- Need complex animations on each item
- SEO is critical (virtual items not in initial HTML)

---

## 📦 Components Available

### 1. VirtualPhotoGrid
**Best for:** Fixed column count, known total images

```jsx
import { VirtualPhotoGrid } from '../components/gallery';

<VirtualPhotoGrid
  images={images}
  columnCount={5}
  rowHeight={300}
  gap={16}
  aspectRatio={1}
  containerHeight={600}
  enableModal={true}
  showOverlay={true}
/>
```

**Props:**
- `images` (array): Array of image objects
- `columnCount` (number): Fixed number of columns
- `rowHeight` (number): Height of each row in pixels
- `gap` (number): Gap between items in pixels
- `aspectRatio` (number): Width/height ratio (1 = square, 1.5 = portrait)
- `containerHeight` (number): Height of scrollable container
- `enableModal` (boolean): Enable lightbox on click
- `showOverlay` (boolean): Show title/description overlay

---

### 2. AutoSizedVirtualGrid
**Best for:** Responsive layouts, automatic column calculation

```jsx
import { AutoSizedVirtualGrid } from '../components/gallery';

<AutoSizedVirtualGrid
  images={images}
  itemMinWidth={250}
  itemHeight={300}
  gap={16}
  aspectRatio={1}
  containerHeight="auto"
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
    xl: 5,
  }}
/>
```

**Features:**
- Automatically calculates columns based on container width
- Responsive breakpoints
- ResizeObserver for dynamic updates
- Auto-height calculation option

---

### 3. InfinitePhotoGrid
**Best for:** API-driven galleries, infinite scroll

```jsx
import { InfinitePhotoGrid } from '../components/gallery';

const [images, setImages] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);

const loadMore = async () => {
  setIsLoading(true);
  const newImages = await fetchImagesFromAPI();
  setImages(prev => [...prev, ...newImages]);
  setIsLoading(false);
  if (newImages.length === 0) setHasMore(false);
};

<InfinitePhotoGrid
  images={images}
  hasNextPage={hasMore}
  isNextPageLoading={isLoading}
  loadNextPage={loadMore}
  columnCount={5}
  itemHeight={300}
  gap={16}
  aspectRatio={1}
  containerHeight={600}
  enableModal={true}
/>
```

**Features:**
- Loads images in batches as user scrolls
- Shows loading indicators
- Prevents duplicate requests
- Configurable threshold for triggering load

---

## 💡 Real-World Examples

### Example 1: Partnership Gallery (1000+ logos)

```jsx
import { AutoSizedVirtualGrid } from '../components/gallery';
import { PARTNERSHIP_IMAGES } from '../constants';

// Generate 1000+ partnership images
const allPartnershipImages = Array.from({ length: 1200 }, (_, i) => ({
  id: i,
  src: `/partnershipImg/(${(i % 49) + 1}).webp`,
  alt: `Partnership ${i + 1}`
}));

<AutoSizedVirtualGrid
  images={allPartnershipImages}
  itemMinWidth={200}
  itemHeight={200}
  gap={16}
  aspectRatio={1}
  containerHeight={800}
  enableModal={true}
  showOverlay={false}
  columnsConfig={{
    default: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
  }}
/>
```

---

### Example 2: Event Photo Gallery with Infinite Scroll

```jsx
import { InfinitePhotoGrid } from '../components/gallery';

const EventGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMorePhotos = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(`/api/events/photos?page=${page}&limit=50`);
      const newPhotos = await response.json();
      
      setPhotos(prev => [...prev, ...newPhotos]);
      setPage(prev => prev + 1);
      
      if (newPhotos.length < 50) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load photos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InfinitePhotoGrid
      images={photos}
      hasNextPage={hasMore}
      isNextPageLoading={loading}
      loadNextPage={loadMorePhotos}
      columnCount={4}
      itemHeight={300}
      gap={16}
      containerHeight={700}
      enableModal={true}
      showOverlay={true}
    />
  );
};
```

---

### Example 3: Member Photo Archive (5000+ photos)

```jsx
import { VirtualPhotoGrid } from '../components/gallery';

// Load all member photos from multiple years
const allMemberPhotos = [
  ...BOARD_MEMBERS_2024,
  ...BOARD_MEMBERS_2023,
  ...BOARD_MEMBERS_2022,
  // ... more years
]; // Total: 5000+ photos

<VirtualPhotoGrid
  images={allMemberPhotos}
  columnCount={6}
  rowHeight={250}
  gap={12}
  aspectRatio={1}
  containerHeight={800}
  enableModal={true}
  showOverlay={true}
/>
```

---

## ⚡ Performance Tips

### 1. Image Optimization
```jsx
// Use optimized image sizes
const optimizedImages = images.map(img => ({
  ...img,
  src: img.src.replace('.jpg', '_thumb.jpg'), // Use thumbnails
  fullSrc: img.src, // Keep full size for modal
}));
```

### 2. Memoization
```jsx
import { useMemo } from 'react';

const VirtualGallery = ({ rawImages }) => {
  // Memoize image processing
  const processedImages = useMemo(() => {
    return rawImages.map(img => ({
      id: img.id,
      src: img.thumbnail || img.src,
      alt: img.title,
      title: img.title,
      description: img.description,
    }));
  }, [rawImages]);

  return <VirtualPhotoGrid images={processedImages} />;
};
```

### 3. Overscan Configuration
```jsx
// Render extra rows above/below viewport for smoother scrolling
<Grid
  overscanRowCount={2} // Render 2 extra rows
  // ... other props
/>
```

### 4. Lazy Loading Integration
```jsx
// Combine virtual scrolling with lazy loading
<VirtualPhotoGrid
  images={images}
  // Virtual scrolling handles rendering
  // LazyImage handles image loading
/>
```

---

## 🎨 Styling Virtual Grids

### Custom Scrollbar
```css
/* Add to your global CSS */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

### Loading States
```jsx
const LoadingPlaceholder = () => (
  <div className="w-full h-full rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-ieee-blue border-t-transparent rounded-full animate-spin" />
  </div>
);

<InfinitePhotoGrid
  loadingPlaceholder={<LoadingPlaceholder />}
  // ... other props
/>
```

---

## 🐛 Troubleshooting

### Issue: Grid not rendering
**Solution:** Ensure container has explicit width
```jsx
<div style={{ width: '100%' }}>
  <VirtualPhotoGrid />
</div>
```

### Issue: Images not loading
**Solution:** Check image paths and lazy loading
```jsx
// Verify image URLs
console.log(images[0].src);

// Ensure LazyImage is used in PhotoCard
```

### Issue: Scroll performance issues
**Solution:** Reduce overscan and optimize images
```jsx
<Grid
  overscanRowCount={1} // Reduce from 2 to 1
  // Use smaller thumbnails
/>
```

### Issue: Modal not working
**Solution:** Ensure enableModal is true
```jsx
<VirtualPhotoGrid
  enableModal={true} // Must be true
  images={images}
/>
```

---

## 📱 Mobile Optimization

```jsx
import { useIsMobile } from '../hooks/useIsMobile';

const ResponsiveVirtualGallery = ({ images }) => {
  const isMobile = useIsMobile();

  return (
    <AutoSizedVirtualGrid
      images={images}
      itemMinWidth={isMobile ? 150 : 250}
      itemHeight={isMobile ? 150 : 300}
      gap={isMobile ? 8 : 16}
      containerHeight={isMobile ? 500 : 800}
      columnsConfig={{
        default: 2,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
    />
  );
};
```

---

## 🔮 Future Enhancements

- [ ] Variable height items (masonry layout)
- [ ] Horizontal virtual scrolling
- [ ] Drag and drop support
- [ ] Multi-select functionality
- [ ] Zoom and pan in modal
- [ ] Keyboard shortcuts for navigation
- [ ] Touch gestures for mobile
- [ ] Server-side rendering support

---

## 📚 Additional Resources

- [react-window Documentation](https://react-window.vercel.app/)
- [react-window-infinite-loader](https://github.com/bvaughn/react-window-infinite-loader)
- [Virtual Scrolling Best Practices](https://web.dev/virtualize-long-lists-react-window/)

---

## 🎯 Quick Start Checklist

- [x] Install dependencies (`react-window`, `react-window-infinite-loader`)
- [x] Choose appropriate component (Virtual/AutoSized/Infinite)
- [x] Prepare image data array
- [x] Set container height
- [x] Configure columns and aspect ratio
- [x] Test with large dataset (1000+ images)
- [x] Optimize images (use thumbnails)
- [x] Add loading states
- [x] Test on mobile devices
- [x] Monitor performance with DevTools

---

**Ready to handle millions of images with ease! 🚀**
