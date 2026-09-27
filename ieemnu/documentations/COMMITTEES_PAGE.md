# 🏛️ Committees Page Documentation

> **File:** `src/pages/Committees.jsx`
> **What it does:** Showcases all IEEE committees with beautiful alternating layouts and animations!

---

## 🎬 The Big Picture

The Committees page is like a **museum exhibit** 🖼️:
- Each committee gets its own section
- Alternating left/right layouts keep it interesting
- Floating animations and hover effects
- Gradient colors unique to each committee

---

## 🧩 Components Breakdown

### 1. Committee Data Structure

```jsx
const COMMITTEES = [
  {
    id: 1,
    name: 'Marketing Committee',
    image: '/committees/Marketing.webp',
    icon: Megaphone,
    color: 'from-purple-500 to-pink-500',
    shadowColor: 'shadow-purple-500/30',
    description: 'The Marketing Committee is responsible for...',
    responsibilities: ['Social media management', 'Event promotion', ...],
  },
  // ... more committees
];
```

**Each committee has:**
| Property | Purpose | Example |
|----------|---------|---------|
| `id` | Unique identifier | `1` |
| `name` | Display name | `'Marketing Committee'` |
| `image` | Committee logo/image | `'/committees/Marketing.webp'` |
| `icon` | Lucide icon component | `Megaphone` |
| `color` | Tailwind gradient | `'from-purple-500 to-pink-500'` |
| `shadowColor` | Colored shadow | `'shadow-purple-500/30'` |
| `responsibilities` | Array of tasks | `['Social media', ...]` |

---

### 2. Image Preloading

```jsx
const COMMITTEE_IMAGES = COMMITTEES.map(c => c.image);

const Committees = () => {
  const { isLoading } = usePageLoader(COMMITTEE_IMAGES, 300);

  if (isLoading) {
    return <PageLoader title="Loading Committees" color="blue" />;
  }
  // ...
};
```

**The Flow:**
```
Page loads
    ↓
usePageLoader starts preloading 6 images
    ↓
Shows PageLoader with spinner
    ↓
All images cached
    ↓
300ms delay (smooth transition)
    ↓
isLoading = false
    ↓
Main content renders!
```

---

### 3. FloatingShape - Decorative Background Blobs

```jsx
const FloatingShape = ({ className, delay = 0 }) => (
  <div
    className={`absolute rounded-full opacity-20 blur-3xl animate-pulse ${className}`}
    style={{ animationDelay: `${delay}s`, animationDuration: '4s' }}
  />
);
```

**What makes it "floating":**
- `animate-pulse` = Fades in and out
- `blur-3xl` = Very blurry (like a glow)
- `opacity-20` = Subtle, not distracting
- Different `animationDelay` = Out of sync with each other

**Usage:**
```jsx
<FloatingShape
  className="w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 -left-48 top-0"
  delay={0.5}
/>
```

---

### 4. CommitteeSection - The Alternating Layout Magic

```jsx
const CommitteeSection = ({ committee, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      {/* Image on left or right based on isEven */}
      <div className="w-full lg:w-1/2">
        <img src={committee.image} />
      </div>
      
      {/* Content on the other side */}
      <div className="w-full lg:w-1/2">
        <h2>{committee.name}</h2>
        <p>{committee.description}</p>
      </div>
    </div>
  );
};
```

**The Alternating Pattern:**
```
Index 0 (even): Image LEFT  | Content RIGHT
Index 1 (odd):  Content LEFT | Image RIGHT
Index 2 (even): Image LEFT  | Content RIGHT
Index 3 (odd):  Content LEFT | Image RIGHT
```

**How `flex-row-reverse` works:**
```
flex-row:         [Image] [Content]
flex-row-reverse: [Content] [Image]
```

---

### 5. ScrollFloat - Scroll-Triggered Animations

```jsx
<ScrollFloat
  animationDuration={1.2}
  ease="back.inOut(2)"
  scrollStart="center bottom+=50%"
  scrollEnd="bottom bottom-=40%"
>
  <img src={committee.image} />
</ScrollFloat>
```

**Props Explained:**

| Prop | What it does |
|------|-------------|
| `animationDuration` | How long the animation takes (1.2s) |
| `ease` | The animation curve ("back.inOut" = slight overshoot) |
| `scrollStart` | When animation starts (element center at viewport bottom + 50%) |
| `scrollEnd` | When animation ends (element bottom at viewport bottom - 40%) |

**The "back.inOut(2)" ease:**
- Slightly overshoots the target
- Then settles back
- Creates a bouncy, playful feel

---

### 6. ScrollReveal - Text Animation

```jsx
<ScrollReveal
  baseOpacity={0}
  enableBlur={true}
  baseRotation={5}
  blurStrength={10}
  animationDuration={1}
  stagger={0.03}
>
  <h2>{committee.name}</h2>
</ScrollReveal>
```

**What happens:**
1. Text starts invisible (`baseOpacity={0}`)
2. Text starts blurry (`enableBlur={true}`)
3. Text starts slightly rotated (`baseRotation={5}`)
4. Each character animates in (`stagger={0.03}`)
5. Creates a beautiful reveal effect!

---

## 🎨 Styling Patterns

### Dynamic Gradient Classes

```jsx
// Each committee has its own color
color: 'from-purple-500 to-pink-500'

// Used in multiple places:
<div className={`bg-gradient-to-r ${committee.color}`} />
<div className={`absolute bg-gradient-to-r ${committee.color} opacity-30`} />
```

**Why store colors as strings?**
- Easy to change per committee
- Consistent theming
- Tailwind classes work dynamically

### The Glow Effect on Hover

```jsx
<div className="relative group">
  {/* Glow background - hidden by default */}
  <div className={`
    absolute -inset-4 
    bg-gradient-to-r ${committee.color} 
    rounded-3xl 
    opacity-0 
    group-hover:opacity-30 
    blur-2xl 
    transition-all duration-700
  `} />
  
  {/* Actual image */}
  <img src={committee.image} />
</div>
```

**How it works:**
1. `group` on parent enables group hover
2. `opacity-0` = Glow is invisible by default
3. `group-hover:opacity-30` = When parent is hovered, show glow
4. `blur-2xl` = Very blurry = soft glow effect
5. `-inset-4` = Extends beyond the image edges

---

### The Shine Effect

```jsx
<div className="
  absolute inset-0 z-20 
  bg-gradient-to-tr from-transparent via-white/10 to-transparent 
  opacity-0 
  group-hover:opacity-100 
  transform -translate-x-full 
  group-hover:translate-x-full
  transition-all duration-700
" />
```

**The Animation:**
```
Default:     [Shine is off-screen left, invisible]
On hover:    [Shine slides across to right, visible]
```

This creates a "light reflection" effect like on a shiny surface!

---

## 🔄 Rendering Pattern

### Mapping with Index

```jsx
{COMMITTEES.map((committee, index) => (
  <div
    key={committee.id}
    className={index % 2 === 1 ? 'bg-gray-50' : ''}
  >
    <CommitteeSection committee={committee} index={index} />
  </div>
))}
```

**What's happening:**
1. `.map()` loops through all committees
2. `index` tells us the position (0, 1, 2, 3...)
3. Odd indices get gray background (alternating)
4. `key={committee.id}` helps React track elements

---

## 📱 Responsive Design

### Mobile-First Layout

```jsx
className="flex flex-col lg:flex-row"
```

| Screen | Layout |
|--------|--------|
| Mobile | Stacked vertically (`flex-col`) |
| Large+ | Side by side (`lg:flex-row`) |

### Responsive Spacing

```jsx
className="py-20 px-4 sm:px-6 lg:px-8"
```

| Screen | Padding |
|--------|---------|
| Mobile | 16px sides |
| Small | 24px sides |
| Large | 32px sides |

---

## 🚀 Performance Features

### 1. Component Memoization (in child components)

The `ScrollFloat` and `ScrollReveal` components use `memo()` internally to prevent unnecessary re-renders.

### 2. CSS-Based Animations

```jsx
className="animate-pulse animate-float"
```

**Why CSS over JavaScript animations?**
- GPU accelerated
- Runs on separate thread
- Doesn't block main thread
- Better for continuous animations

### 3. Lazy Image Loading (via preloader)

All images are preloaded before the page shows, so:
- No layout shift when images load
- Animations are smooth
- No flickering

---

## 🎓 Key Concepts

### 1. Component Composition

```jsx
<CommitteeSection>
  <ScrollFloat>
    <img />
  </ScrollFloat>
  <ScrollReveal>
    <h2 />
  </ScrollReveal>
</CommitteeSection>
```

Components wrap other components, each adding functionality!

### 2. Props Destructuring

```jsx
const CommitteeSection = ({ committee, index }) => {
  // Instead of: props.committee, props.index
  // We can use: committee, index directly!
};
```

### 3. Dynamic Styling

```jsx
// Conditional classes
className={isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}

// Template literals for dynamic values
style={{ animationDelay: `${delay}s` }}

// Combining static and dynamic classes
className={`absolute bg-gradient-to-r ${committee.color}`}
```

---

## 🤔 Common Questions

**Q: Why alternate the layout?**
A: It keeps the page visually interesting! Same layout repeated = boring.

**Q: Why use `index % 2` for alternating?**
A: 
- `0 % 2 = 0` (even)
- `1 % 2 = 1` (odd)
- `2 % 2 = 0` (even)
- Pattern repeats!

**Q: What's the difference between `ScrollFloat` and `ScrollReveal`?**
A:
- `ScrollFloat` = Animates the whole element (position, scale)
- `ScrollReveal` = Animates text character by character

**Q: Why preload committee images?**
A: The images are large and prominent. Loading them mid-scroll would cause jank!

---

## 📊 Visual Structure

```
┌─────────────────────────────────────────┐
│           HERO SECTION                  │
│    "Our Committees" title               │
│    Animated background shapes           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  COMMITTEE 1 (even - image left)        │
│  ┌──────────┐  ┌──────────────────┐    │
│  │  IMAGE   │  │  Name            │    │
│  │          │  │  Description     │    │
│  │          │  │  Responsibilities│    │
│  └──────────┘  └──────────────────┘    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  COMMITTEE 2 (odd - image right)        │
│  ┌──────────────────┐  ┌──────────┐    │
│  │  Name            │  │  IMAGE   │    │
│  │  Description     │  │          │    │
│  │  Responsibilities│  │          │    │
│  └──────────────────┘  └──────────┘    │
└─────────────────────────────────────────┘

... alternating pattern continues ...

┌─────────────────────────────────────────┐
│           CTA SECTION                   │
│    "Join a Committee" button            │
└─────────────────────────────────────────┘
```

---

Happy coding! 🚀
