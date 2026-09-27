# Gallery Components Documentation

## Overview
A comprehensive set of optimized, performant gallery components for displaying photos with lazy loading, smooth animations, and modal lightbox functionality.

## Components

### 1. LazyImage
Lazy-loaded image component with intersection observer and fade-in animation.

**Features:**
- Lazy loading with IntersectionObserver
- Smooth fade-in animation on load
- Placeholder with pulse animation
- Configurable threshold and root margin
- GPU-accelerated animations with Framer Motion

**Usage:**
```jsx
import { LazyImage } from '../components/gallery';

<LazyImage
  src="/path/to/image.jpg"
  alt="Description"
  className="w-full h-full object-cover"
  wrapperClassName="aspect-square"
  placeholderColor="bg-gray-200 dark:bg-gray-700"
  onLoad={() => console.log('Image loaded')}
/>
```

**Props:**
- `src` (string, required): Image source URL
- `alt` (string, required): Alt text for accessibility
- `className` (string): CSS classes for the image element
- `wrapperClassName` (string): CSS classes for the wrapper div
- `placeholderColor` (string): Tailwind classes for placeholder background
- `onLoad` (function): Callback when image loads

---

### 2. PhotoCard
Animated photo card with hover effects and overlay information.

**Features:**
- Smooth scale and lift animation on hover
- Gradient overlay with title and description
- Staggered entrance animations
- Subtle glow effect
- Configurable aspect ratio
- Click handler for modal integration

**Usage:**
```jsx
import { PhotoCard } from '../components/gallery';

<PhotoCard
  image={{
    src: '/path/to/image.jpg',
    alt: 'Photo description',
    title: 'Photo Title',
    description: 'Photo description text'
  }}
  onClick={() => handleClick()}
  index={0}
  aspectRatio="aspect-square"
  hoverEffect={true}
  showOverlay={true}
/>
```

**Props:**
- `image` (object, required): Image data object
  - `src` (string): Image URL
  - `alt` (string): Alt text
  - `title` (string, optional): Title shown on hover
  - `description` (string, optional): Description shown on hover
- `onClick` (function): Click handler
- `index` (number): Index for staggered animations
- `className` (string): Additional CSS classes
- `aspectRatio` (string): Tailwind aspect ratio class
- `hoverEffect` (boolean): Enable hover animations
- `showOverlay` (boolean): Show overlay on hover

---

### 3. PhotoModal
Full-screen modal lightbox with keyboard navigation.

**Features:**
- Full-screen overlay with backdrop blur
- Keyboard navigation (ESC, Arrow keys)
- Smooth entrance/exit animations
- Image info display (title, description, link)
- Navigation buttons for galleries
- Click outside to close
- Body scroll lock when open

**Usage:**
```jsx
import { PhotoModal } from '../components/gallery';

<PhotoModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  image={{
    src: '/path/to/image.jpg',
    alt: 'Full size image',
    title: 'Image Title',
    description: 'Image description',
    link: 'https://example.com'
  }}
  onNext={() => goToNext()}
  onPrevious={() => goToPrevious()}
  hasNext={true}
  hasPrevious={true}
  showNavigation={true}
/>
```

**Props:**
- `isOpen` (boolean, required): Modal open state
- `onClose` (function, required): Close handler
- `image` (object, required): Image data
- `onNext` (function): Next image handler
- `onPrevious` (function): Previous image handler
- `hasNext` (boolean): Show next button
- `hasPrevious` (boolean): Show previous button
- `showNavigation` (boolean): Show navigation buttons

**Keyboard Shortcuts:**
- `ESC`: Close modal
- `←`: Previous image
- `→`: Next image

---

### 4. PhotoGrid
Responsive grid layout with integrated modal functionality.

**Features:**
- Responsive column configuration
- Automatic modal integration
- Configurable gap and aspect ratio
- Staggered entrance animations
- Keyboard navigation support
- Optimized for large collections

**Usage:**
```jsx
import { PhotoGrid } from '../components/gallery';

const images = [
  { id: 1, src: '/image1.jpg', alt: 'Image 1', title: 'Title 1' },
  { id: 2, src: '/image2.jpg', alt: 'Image 2', title: 'Title 2' },
  // ... more images
];

<PhotoGrid
  images={images}
  columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
  gap="gap-4 md:gap-6"
  aspectRatio="aspect-square"
  enableModal={true}
  showOverlay={true}
  className="my-8"
/>
```

**Props:**
- `images` (array, required): Array of image objects
- `columns` (object): Responsive column configuration
  - `sm` (number): Columns on small screens
  - `md` (number): Columns on medium screens
  - `lg` (number): Columns on large screens
  - `xl` (number): Columns on extra-large screens
- `gap` (string): Tailwind gap classes
- `aspectRatio` (string): Tailwind aspect ratio class
- `enableModal` (boolean): Enable modal on click
- `showOverlay` (boolean): Show overlay on hover
- `className` (string): Additional CSS classes

---

## Performance Optimizations

### Lazy Loading
- Uses IntersectionObserver API
- 50px root margin for preloading
- Triggers once per image
- Reduces initial page load

### Animations
- GPU-accelerated with `transform` and `opacity`
- Framer Motion for smooth animations
- Staggered entrance animations
- Optimized hover effects

### Image Loading
- Progressive loading with placeholders
- Fade-in animation on load
- Error handling with fallbacks
- Responsive srcset support (future)

### Modal Performance
- Body scroll lock
- Keyboard event cleanup
- AnimatePresence for exit animations
- Click outside detection

---

## Integration Examples

### Events Page - Partnership Gallery
```jsx
import { PhotoGrid } from '../components/gallery';
import { PARTNERSHIP_IMAGES } from '../constants';

<PhotoGrid
  images={PARTNERSHIP_IMAGES}
  columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
  gap="gap-4 md:gap-6"
  aspectRatio="aspect-square"
  enableModal={true}
  showOverlay={false}
/>
```

### Committees Page - Committee Images
```jsx
import { LazyImage } from '../components/gallery';

<LazyImage
  src={committee.image}
  alt={committee.name}
  className="relative z-10 w-full h-auto object-contain p-8"
  wrapperClassName="relative z-10"
/>
```

### Board Page - Member Photos
```jsx
import { LazyImage } from '../components/gallery';

<LazyImage
  src={member.image}
  alt={member.name}
  className="w-full h-full object-cover"
  wrapperClassName="w-full h-full"
/>
```

---

## Browser Support
- Modern browsers with IntersectionObserver support
- Fallback for older browsers (loads all images)
- Tested on Chrome, Firefox, Safari, Edge

---

## Dependencies
- `framer-motion`: Smooth animations
- `react-intersection-observer`: Lazy loading
- `lucide-react`: Icons for modal navigation

---

## Best Practices

1. **Always provide alt text** for accessibility
2. **Use appropriate aspect ratios** to prevent layout shift
3. **Optimize image sizes** before uploading
4. **Use WebP format** when possible for better compression
5. **Provide fallback images** for error handling
6. **Test on mobile devices** for responsive behavior
7. **Monitor performance** with Lighthouse and DevTools

---

## Future Enhancements
- [ ] Virtual scrolling for very large galleries
- [ ] WebP/AVIF format detection and serving
- [ ] Responsive srcset support
- [ ] Image zoom functionality
- [ ] Swipe gestures for mobile
- [ ] Infinite scroll integration
- [ ] Image preloading strategies
- [ ] Progressive image loading (blur-up)
