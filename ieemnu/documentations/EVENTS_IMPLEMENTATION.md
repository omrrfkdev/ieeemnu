# Events Page - Complete Implementation Guide

## 📋 Overview

This document describes the fully optimized Events page implementation with dynamic image loading, performance optimizations, modern UI, and accessibility features.

## 🎯 Features Implemented

### ✅ Core Functionality
- **Dynamic Image Loading**: Images automatically loaded from event type folders (`/techtalk`, `/workshop`, `/competition`)
- **Smart Filtering**: Filter events by type (All, Tech Talk, Workshop, Competition)
- **Lazy Loading**: Images load only when visible using IntersectionObserver
- **Performance Optimized**: Preloading, debouncing, memoization, and requestAnimationFrame
- **Responsive Design**: Mobile-first with horizontal scrolling tabs on small screens
- **Accessibility**: Keyboard navigation, ARIA labels, prefers-reduced-motion support

### 🎨 UI/UX Enhancements
- **Modern Card Design**: Glass morphism effects, gradient overlays, rounded corners
- **Smooth Animations**: GSAP-powered entrance and hover animations
- **Interactive Tabs**: Gradient backgrounds, event counts, active indicators
- **Social Media Integration**: Facebook and Instagram buttons per event
- **Empty States**: Friendly messages when no events match filters

### ⚡ Performance Features
- **Image Preloading**: Critical images preloaded on mount
- **Lazy Loading**: Non-critical images load on scroll
- **Debounced Resize**: Prevents excessive re-renders
- **Memoization**: useMemo and useCallback for expensive operations
- **IntersectionObserver**: Efficient visibility detection
- **Reduced Motion**: Respects user accessibility preferences

## 📁 File Structure

```
src/
├── pages/
│   └── Events.jsx                 # Main events page (refactored)
├── components/
│   └── events/
│       └── EventCard.jsx          # Optimized event card component
├── utils/
│   └── imageLoader.js             # Image loading utilities
├── styles/
│   └── events.css                 # Custom CSS utilities
└── constants/
    └── index.js                   # Event data (updated structure)
```

## 🗂️ Event Data Structure

Each event object in `constants/index.js` follows this structure:

```javascript
{
  id: 1,                                    // Unique identifier
  title: 'AI in Healthcare',                // Event title
  date: '2024-02-15',                       // ISO date format
  time: '6:00 PM',                          // Display time
  location: 'Engineering Building, Room 301', // Venue
  description: 'Join us for...',            // Event description
  type: 'techtalk',                         // Event type: 'techtalk' | 'workshop' | 'competition'
  category: 'Tech Talk',                    // Display category
  imageName: '1.webp',                      // Image filename (loaded from /{type}/ folder)
  facebook: 'https://facebook.com/...',     // Facebook event link
  instagram: 'https://instagram.com/...',   // Instagram post link
}
```

## 📂 Image Organization

Images are organized by event type in the public folder:

```
public/
├── techtalk/
│   ├── 1.webp
│   ├── 2.webp
│   └── ...
├── workshop/
│   ├── 1.webp
│   ├── 2.webp
│   └── ...
└── competition/
    ├── 1.webp
    ├── 2.webp
    └── ...
```

**Image Requirements:**
- Format: WebP (recommended) or JPG/PNG
- Dimensions: 800x600px minimum
- File size: < 200KB for optimal loading
- Naming: Sequential numbers (1.webp, 2.webp, etc.)

## 🔧 How It Works

### 1. Dynamic Image Loading

The `imageLoader.js` utility automatically maps event types to folders:

```javascript
import { getEventImagePath } from '../utils/imageLoader';

// For event with type='techtalk' and imageName='1.webp'
const imagePath = getEventImagePath('techtalk', '1.webp');
// Returns: '/techtalk/1.webp'
```

### 2. Event Filtering

Events are filtered by type using memoized computation:

```javascript
const filteredEvents = useMemo(() => {
  if (selectedType === 'all') return UPCOMING_EVENTS;
  return UPCOMING_EVENTS.filter(event => event.type === selectedType);
}, [selectedType]);
```

### 3. Lazy Loading

EventCard component uses IntersectionObserver for lazy loading:

```javascript
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Load image when card enters viewport
        loadImage();
      }
    });
  }, { threshold: 0.1, rootMargin: '50px' });
  
  observer.observe(cardRef.current);
}, []);
```

### 4. GSAP Animations

Entrance animations with stagger effect:

```javascript
gsap.fromTo(cardRef.current, 
  { y: 50, opacity: 0, scale: 0.95 },
  { 
    y: 0, 
    opacity: 1, 
    scale: 1, 
    duration: 0.6,
    delay: index * 0.1,  // Stagger
    ease: 'power3.out'
  }
);
```

## 🎨 Styling

### Gradient Mappings

Each event type has a unique gradient:

- **Tech Talk**: Blue to Purple (`from-blue-500 to-purple-500`)
- **Workshop**: Green to Teal (`from-green-500 to-teal-500`)
- **Competition**: Orange to Red (`from-orange-500 to-red-500`)

### Responsive Breakpoints

- **Mobile**: < 640px (1 column, horizontal scroll tabs)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns)

## 🚀 Adding New Events

### Step 1: Add Event Data

Edit `src/constants/index.js`:

```javascript
export const UPCOMING_EVENTS = [
  // ... existing events
  {
    id: 7,
    title: 'New Workshop',
    date: '2024-04-01',
    time: '2:00 PM',
    location: 'Lab B',
    description: 'Learn something new!',
    type: 'workshop',  // techtalk | workshop | competition
    category: 'Workshop',
    imageName: '3.webp',
    facebook: 'https://facebook.com/event',
    instagram: 'https://instagram.com/post',
  },
];
```

### Step 2: Add Event Image

Place image in the appropriate folder:
- Tech Talk → `public/techtalk/3.webp`
- Workshop → `public/workshop/3.webp`
- Competition → `public/competition/3.webp`

### Step 3: Test

The event will automatically appear in the correct tab with proper styling and animations.

## 🔍 Performance Optimization Checklist

- ✅ Image preloading for above-the-fold content
- ✅ Lazy loading for below-the-fold images
- ✅ IntersectionObserver for efficient visibility detection
- ✅ Debounced resize events (150ms)
- ✅ Memoized filtered events
- ✅ useCallback for event handlers
- ✅ GSAP animations only when elements are visible
- ✅ Respects prefers-reduced-motion
- ✅ Passive event listeners
- ✅ will-change CSS for transform animations
- ✅ content-visibility for images

## ♿ Accessibility Features

- **Keyboard Navigation**: All tabs and buttons are keyboard accessible
- **ARIA Labels**: Proper aria-pressed and aria-label attributes
- **Reduced Motion**: Animations disabled when user prefers reduced motion
- **Semantic HTML**: Proper use of article, section, button elements
- **Alt Text**: All images have descriptive alt attributes
- **Focus Indicators**: Clear focus states for interactive elements

## 📱 Mobile Optimizations

- **Horizontal Scroll Tabs**: Tabs scroll horizontally on mobile
- **Touch-Friendly**: Large tap targets (min 44x44px)
- **Smooth Scrolling**: Native smooth scroll with -webkit-overflow-scrolling
- **Auto-Scroll**: Active tab scrolls into view on selection
- **Responsive Images**: Images scale properly on all screen sizes

## 🐛 Troubleshooting

### Images Not Loading

1. Check image paths match folder structure
2. Verify image names in constants match actual files
3. Ensure images are in `public/` folder (not `src/`)
4. Check browser console for 404 errors

### Animations Not Working

1. Verify GSAP is installed: `npm install gsap`
2. Check if user has prefers-reduced-motion enabled
3. Ensure elements have proper refs attached
4. Check browser console for GSAP errors

### Tabs Not Scrolling on Mobile

1. Verify `scrollbar-hide` class is applied
2. Check CSS file is imported in main app
3. Test on actual mobile device (not just browser resize)

## 🎯 Future Enhancements

Potential improvements for future iterations:

- [ ] Add event registration modal
- [ ] Implement event search functionality
- [ ] Add calendar view option
- [ ] Enable event sharing
- [ ] Add past events archive
- [ ] Implement infinite scroll for large event lists
- [ ] Add event reminders/notifications
- [ ] Support for recurring events

## 📊 Performance Metrics

Expected Lighthouse scores:

- **Performance**: 90-100
- **Accessibility**: 95-100
- **Best Practices**: 90-100
- **SEO**: 90-100

Key metrics:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 📝 Code Maintenance

### Best Practices

1. **Keep event data in constants**: Don't hardcode in components
2. **Use type field consistently**: Always use lowercase types
3. **Optimize images**: Use WebP format, compress before upload
4. **Test on multiple devices**: Verify responsive behavior
5. **Monitor performance**: Use Lighthouse regularly
6. **Update documentation**: Keep this file current with changes

### Common Patterns

```javascript
// ✅ Good: Use type field for filtering
const workshops = UPCOMING_EVENTS.filter(e => e.type === 'workshop');

// ❌ Bad: Don't use category for filtering
const workshops = UPCOMING_EVENTS.filter(e => e.category === 'Workshop');

// ✅ Good: Use utility function for image paths
const path = getEventImagePath(event.type, event.imageName);

// ❌ Bad: Don't hardcode paths
const path = `/events/${event.imageName}`;
```

## 🤝 Contributing

When adding features or fixing bugs:

1. Follow existing code patterns
2. Maintain performance optimizations
3. Test on mobile and desktop
4. Update this documentation
5. Verify accessibility features still work
6. Run Lighthouse audit before committing

## 📞 Support

For questions or issues:
- Check this documentation first
- Review code comments in source files
- Test in browser DevTools
- Check console for errors

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Author**: IEEE MNU Development Team
