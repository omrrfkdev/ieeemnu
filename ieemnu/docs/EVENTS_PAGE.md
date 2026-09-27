# 📅 Events Page Documentation

> **File:** `src/pages/Events.jsx`
> **What it does:** Shows upcoming and past events with a stunning 3D dome gallery!

---

## 🎬 The Big Picture

The Events page is like a **virtual event hall** 🎪:
- 3D interactive dome gallery in the hero
- Tabs to switch between upcoming and past events
- Category filtering
- Event cards with all the details

---

## 🧩 Components Breakdown

### 1. DomeGallery - The 3D Interactive Gallery 🌐

```jsx
<DomeGallery
  images={EVENT_GALLERY_IMAGES}
  overlayBlurColor="#1a1a2e"
  grayscale={false}
  imageBorderRadius={isMobile ? "10px" : "16px"}
  openedImageWidth={isMobile ? "280px" : "500px"}
  fit={isMobile ? 1.2 : 0.8}
  minRadius={isMobile ? 250 : 500}
  maxRadius={isMobile ? 600 : 1200}
  segments={isMobile ? 20 : 35}
  dragSensitivity={isMobile ? 15 : 20}
/>
```

**Props Explained (Like a Control Panel 🎛️):**

| Prop | What it does | Mobile | Desktop |
|------|-------------|--------|---------|
| `imageBorderRadius` | Rounded corners | 10px | 16px |
| `openedImageWidth` | Size when clicked | 280px | 500px |
| `fit` | How zoomed in | 1.2 | 0.8 |
| `minRadius` | Inner circle size | 250 | 500 |
| `maxRadius` | Outer circle size | 600 | 1200 |
| `segments` | Number of image slots | 20 | 35 |
| `dragSensitivity` | How fast it rotates | 15 | 20 |

**How it works:**
1. Images are arranged in a 3D dome shape
2. User can drag to rotate the dome
3. Click an image to open it larger
4. Uses `@use-gesture/react` for drag handling

---

### 2. useIsMobile - Custom Hook for Responsive Logic

```jsx
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();  // Check on mount
    window.addEventListener('resize', checkMobile);  // Check on resize
    
    return () => window.removeEventListener('resize', checkMobile);  // Cleanup!
  }, []);
  
  return isMobile;
};
```

**The Pattern Explained:**

```
Component mounts
      ↓
checkMobile() runs → sets isMobile based on screen width
      ↓
Event listener added for 'resize'
      ↓
User resizes window
      ↓
checkMobile() runs again → updates isMobile
      ↓
Component re-renders with new value
      ↓
Component unmounts
      ↓
Event listener removed (cleanup!)
```

**Why create a custom hook?**
- Reusable across components
- Encapsulates the resize logic
- Clean component code

---

### 3. Tab System - Upcoming vs Past Events

```jsx
const [activeTab, setActiveTab] = useState('upcoming');

<button
  onClick={() => setActiveTab('upcoming')}
  className={activeTab === 'upcoming' 
    ? 'bg-ieee-blue text-white'  // Active
    : 'bg-gray-200 text-gray-700'  // Inactive
  }
>
  Upcoming Events
</button>
```

**Conditional Rendering:**
```jsx
{activeTab === 'upcoming' && (
  <div>
    {filteredEvents.map(event => <EventCard key={event.id} event={event} />)}
  </div>
)}

{activeTab === 'past' && (
  <div>
    {PAST_EVENTS.map(event => <EventCard key={event.id} event={event} />)}
  </div>
)}
```

**The `&&` operator trick:**
- If left side is `true`, render right side
- If left side is `false`, render nothing
- Cleaner than `if/else` for simple cases

---

### 4. Category Filtering

```jsx
const [selectedCategory, setSelectedCategory] = useState('all');

// Get unique categories from events
const categories = ['all', ...new Set(UPCOMING_EVENTS.map(e => e.category))];

// Filter events
const filteredEvents = selectedCategory === 'all'
  ? UPCOMING_EVENTS
  : UPCOMING_EVENTS.filter(e => e.category === selectedCategory);
```

**Breaking it down:**

```jsx
// Step 1: Extract all categories
UPCOMING_EVENTS.map(e => e.category)
// Result: ['Workshop', 'Hackathon', 'Workshop', 'Seminar']

// Step 2: Remove duplicates with Set
new Set(['Workshop', 'Hackathon', 'Workshop', 'Seminar'])
// Result: Set {'Workshop', 'Hackathon', 'Seminar'}

// Step 3: Spread into array with 'all' first
['all', ...Set]
// Result: ['all', 'Workshop', 'Hackathon', 'Seminar']
```

**The Filter Logic:**
```jsx
selectedCategory === 'all'
  ? UPCOMING_EVENTS                                    // Show all
  : UPCOMING_EVENTS.filter(e => e.category === selectedCategory)  // Show matching
```

This is a **ternary operator** - like a one-line if/else!

---

### 5. Date Formatting

```jsx
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Input: "2024-03-15"
// Output: "Friday, March 15, 2024"
```

**The `toLocaleDateString` options:**

| Option | Example Output |
|--------|---------------|
| `weekday: 'long'` | "Friday" |
| `month: 'long'` | "March" |
| `month: 'short'` | "Mar" |
| `day: 'numeric'` | "15" |
| `day: '2-digit'` | "15" |

---

## 🎨 The Event Card Component

```jsx
<Card className="event-card">
  <CardBody>
    {/* Category Badge */}
    <span className="px-3 py-1 bg-ieee-blue/10 text-ieee-blue rounded-full text-sm">
      {event.category}
    </span>
    
    {/* Title */}
    <h3 className="text-xl font-bold">{event.title}</h3>
    
    {/* Details with Icons */}
    <div className="flex items-center gap-2 text-gray-600">
      <Calendar className="w-4 h-4" />
      <span>{formatDate(event.date)}</span>
    </div>
    
    <div className="flex items-center gap-2 text-gray-600">
      <MapPin className="w-4 h-4" />
      <span>{event.location}</span>
    </div>
    
    {/* Register Button */}
    <Button variant="primary">
      Register Now
      <ArrowRight className="w-4 h-4" />
    </Button>
  </CardBody>
</Card>
```

**Icon + Text Pattern:**
```jsx
<div className="flex items-center gap-2">
  <Calendar className="w-4 h-4" />
  <span>March 15, 2024</span>
</div>
```

- `flex` = Horizontal layout
- `items-center` = Vertically centered
- `gap-2` = 8px space between icon and text

---

## 🚀 Performance Optimizations

### 1. Image Preloading

```jsx
const ALL_EVENT_IMAGES = EVENT_GALLERY_IMAGES.map(img => img.src);

const Events = () => {
  const { isLoading } = usePageLoader(ALL_EVENT_IMAGES, 300);

  if (isLoading) {
    return <PageLoader title="Loading Events" color="purple" />;
  }
  // ...
};
```

**Why preload gallery images?**
- DomeGallery needs all images ready
- Prevents flickering during 3D rotation
- Smooth user experience

### 2. Responsive Props

```jsx
imageBorderRadius={isMobile ? "10px" : "16px"}
segments={isMobile ? 20 : 35}
```

**Why fewer segments on mobile?**
- Less GPU work = better performance
- Smaller screen doesn't need as many images
- Faster rendering

### 3. useStaggerAnimation

```jsx
const upcomingRef = useStaggerAnimation({
  selector: '.event-card',
  animation: { y: 0, opacity: 1, duration: 0.8 },
  stagger: 0.15,
});
```

**What happens:**
1. All `.event-card` elements start invisible and below
2. They animate in one by one (0.15s apart)
3. Creates a cascading reveal effect

---

## 📱 Responsive Considerations

### Hero Section Height

```jsx
className="h-[60vh] sm:h-[70vh] md:h-[80vh] min-h-[400px] sm:min-h-[500px] md:min-h-[600px]"
```

| Screen | Height | Min Height |
|--------|--------|------------|
| Mobile | 60vh | 400px |
| Small | 70vh | 500px |
| Medium+ | 80vh | 600px |

**Why both `h-[]` and `min-h-[]`?**
- `h-[60vh]` = 60% of viewport height
- `min-h-[400px]` = But never smaller than 400px
- Prevents squishing on very short screens

### Grid Layout

```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

| Screen | Columns |
|--------|---------|
| Mobile | 1 |
| Medium | 2 |
| Large | 3 |

---

## 🔄 Data Flow

```
EVENT_GALLERY_IMAGES (constant)
        ↓
usePageLoader preloads all images
        ↓
isLoading = false
        ↓
DomeGallery renders with cached images
        ↓
User interacts (drag, click)
        ↓
@use-gesture/react handles gestures
        ↓
3D transforms update
        ↓
Smooth 60fps animation!
```

---

## 🎓 Key Concepts

### 1. Controlled vs Uncontrolled Components

**Controlled (React manages state):**
```jsx
const [activeTab, setActiveTab] = useState('upcoming');
<button onClick={() => setActiveTab('upcoming')}>
```

**Uncontrolled (DOM manages state):**
```jsx
<input type="text" defaultValue="hello" />
```

Our tabs are CONTROLLED - React knows the state at all times.

### 2. Derived Data

```jsx
// Don't store this in state!
const filteredEvents = selectedCategory === 'all'
  ? UPCOMING_EVENTS
  : UPCOMING_EVENTS.filter(e => e.category === selectedCategory);
```

**Rule:** If you can calculate it from existing state, don't store it as state!

### 3. Event Handler Naming

```jsx
onClick={() => setActiveTab('upcoming')}
onClick={() => setSelectedCategory(category)}
```

**Convention:** 
- `handle*` for handler functions: `handleClick`, `handleSubmit`
- Inline arrows for simple state updates

---

## 🤔 Common Questions

**Q: Why use a custom hook for mobile detection?**
A: It's reusable! Any component can use `useIsMobile()` without duplicating code.

**Q: Why preload images if DomeGallery handles its own loading?**
A: We want the ENTIRE page ready before showing. No partial loading = no jank.

**Q: What's the difference between `vh` and `px` units?**
A:
- `vh` = Percentage of viewport height (responsive)
- `px` = Fixed pixels (absolute)
- We use both for flexibility with safety nets!

---

## 📊 Event Data Structure

```jsx
const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'AI Workshop',
    category: 'Workshop',
    date: '2024-03-15',
    time: '2:00 PM',
    location: 'Engineering Building, Room 101',
    description: 'Learn about machine learning...',
    capacity: 50,
    registered: 32,
  },
  // ... more events
];
```

**Each event has:**
- Unique `id` for React keys
- `category` for filtering
- `date` for sorting and display
- `capacity` and `registered` for progress bars

---

Happy coding! 🚀
