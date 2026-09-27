# 🏠 Home Page Documentation

> **File:** `src/pages/Home.jsx`
> **What it does:** The landing page - first thing users see! Has animated hero, stats, events, and sponsors.

---

## 🎬 The Big Picture

The Home page is like a **movie trailer** for your IEEE branch:
- Eye-catching hero section with animated background
- Stats that count up as you scroll
- Featured events preview
- Sponsor logos scrolling infinitely

---

## 🧩 Components Breakdown

### 1. Lazy Loading - The "Load Only When Needed" Pattern

```jsx
// Instead of this (loads everything immediately):
import Threads from '../components/animations/Threads';

// We do this (loads only when needed):
const Threads = lazy(() => import('../components/animations/Threads'));
```

**What's `lazy()`?** 🦥
- It's React's way of saying "Don't load this until we actually need it"
- Makes the initial page load MUCH faster
- The component loads in the background when it's about to be shown

**The Suspense Wrapper:**
```jsx
<Suspense fallback={<div className="w-full h-full bg-gray-900" />}>
  <Threads amplitude={1} distance={0} />
</Suspense>
```

- `Suspense` = "Show this fallback while the lazy component loads"
- `fallback` = What to show during loading (a simple dark div)

---

### 2. The Threads Background - Animated Canvas Magic ✨

```jsx
<Threads
  amplitude={1}
  distance={0}
  enableMouseInteraction={true}
/>
```

This is a **WebGL/Canvas animation** that creates those cool flowing lines!
- `amplitude` = How wavy the lines are
- `enableMouseInteraction` = Lines react to your mouse movement

**Why it's wrapped in Suspense:**
- It's a heavy component (uses WebGL)
- We don't want it to block the page from loading
- Shows a placeholder while it initializes

---

### 3. ScrollReveal - Text That Fades In Letter by Letter

```jsx
<ScrollReveal
  as="h1"
  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
  baseOpacity={0}
  enableBlur={true}
  baseRotation={5}
  blurStrength={10}
  animationDuration={1}
  stagger={0.03}
>
  IEEE Student Branch
</ScrollReveal>
```

**Props Explained:**

| Prop | What it does | Value |
|------|-------------|-------|
| `as="h1"` | Renders as an `<h1>` tag | Any HTML tag |
| `baseOpacity={0}` | Starts invisible | 0 to 1 |
| `enableBlur={true}` | Text starts blurry | true/false |
| `baseRotation={5}` | Slight rotation at start | Degrees |
| `stagger={0.03}` | Delay between each letter | Seconds |

**The Magic:** Each letter animates separately, creating a typewriter-like effect!

---

### 4. CountUp - Numbers That Animate

```jsx
<CountUp
  from={0}
  to={500}
  duration={2}
  separator=","
/>
```

**How it works:**
1. Starts at `from` value (0)
2. Animates to `to` value (500)
3. Takes `duration` seconds (2s)
4. Uses spring physics for natural feel

**The Hook Behind It:**
```jsx
// Uses motion/react for spring animations
import { useInView, useMotionValue, useSpring } from 'motion/react';
```

- `useInView` = Detects when element is visible on screen
- `useMotionValue` = A value that can animate
- `useSpring` = Makes the animation bouncy/natural

---

### 5. LogoLoop - Infinite Scrolling Sponsors

```jsx
<LogoLoop logos={sponsorLogos} speed={30} />
```

**The CSS Trick:**
```css
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

**How infinite scroll works:**
1. Duplicate the logos (so you have 2 copies side by side)
2. Animate from 0% to -50% (scroll left)
3. When it reaches -50%, it's showing the duplicate
4. Jump back to 0% (looks seamless because duplicate is identical!)

---

### 6. useStaggerAnimation - Custom Hook for Staggered Animations

```jsx
const statsRef = useStaggerAnimation({
  selector: '.stat-card',
  animation: { y: 0, opacity: 1, duration: 0.8 },
  stagger: 0.15,
});
```

**What this does:**
1. Finds all elements with class `.stat-card`
2. Animates them one by one (0.15s apart)
3. Each card slides up (`y: 0`) and fades in (`opacity: 1`)

**Why use a custom hook?**
- Reusable across multiple components
- Keeps component code clean
- Encapsulates complex GSAP logic

---

## 🎨 Layout Patterns

### The Container Pattern

```jsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

| Class | What it does |
|-------|-------------|
| `container` | Sets max-width based on breakpoints |
| `mx-auto` | Centers horizontally (margin-x: auto) |
| `px-4` | Padding on sides (16px on mobile) |
| `sm:px-6` | More padding on small screens (24px) |
| `lg:px-8` | Even more on large screens (32px) |

### The Grid Pattern

```jsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {STATS.map(stat => <StatCard key={stat.id} />)}
</div>
```

- `grid-cols-2` = 2 columns on mobile
- `md:grid-cols-4` = 4 columns on medium+ screens
- `gap-6` = Space between items (24px)

---

## 🔄 Data Flow

```
STATS (constant array)
    ↓
.map() transforms each item
    ↓
<Card> component renders each stat
    ↓
useStaggerAnimation animates them in
    ↓
User sees beautiful staggered animation!
```

**The STATS constant:**
```jsx
// In constants/index.js
export const STATS = [
  { id: 1, value: 500, label: 'Members', icon: Users },
  { id: 2, value: 50, label: 'Events', icon: Calendar },
  // ...
];
```

---

## 🚀 Performance Optimizations

### 1. Lazy Loading Heavy Components

```jsx
const Threads = lazy(() => import('../components/animations/Threads'));
const MagicBentoCard = lazy(() => import('../components/animations/MagicBento'));
```

**Benefits:**
- Initial bundle is smaller
- Page loads faster
- Heavy animations load in background

### 2. Reduced Motion Support

```jsx
useEffect(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // Skip animations!
  // ... animation code
}, []);
```

**Why this matters:**
- Some users have motion sensitivity
- Respects system accessibility settings
- Good practice for inclusive design

### 3. GSAP Context for Cleanup

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(heroButtons, { y: 20, opacity: 0 });
  }, heroRef);

  return () => ctx.revert(); // Cleanup!
}, []);
```

**The `ctx.revert()` cleanup:**
- When component unmounts, animations are cleaned up
- Prevents memory leaks
- Prevents animations from running on removed elements

---

## 📱 Responsive Design

### Mobile-First Approach

```jsx
className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
```

**Translation:**
| Screen | Font Size |
|--------|-----------|
| Mobile (default) | 2.25rem (36px) |
| Small (640px+) | 3rem (48px) |
| Medium (768px+) | 3.75rem (60px) |
| Large (1024px+) | 4.5rem (72px) |

### Hiding Elements on Mobile

```jsx
className="hidden sm:block"
```

- `hidden` = Display none (hidden on mobile)
- `sm:block` = Display block on small screens and up

---

## 🎯 Key React Concepts Used

### 1. Component Composition

```jsx
<Card>
  <CardBody>
    <CountUp to={stat.value} />
    <p>{stat.label}</p>
  </CardBody>
</Card>
```

Components inside components inside components! Like Russian nesting dolls 🪆

### 2. Props Drilling vs Constants

```jsx
// Instead of passing data through many components:
<Parent data={data}>
  <Child data={data}>
    <GrandChild data={data} />
  </Child>
</Parent>

// We use constants imported directly:
import { STATS } from '../constants';
```

### 3. Conditional Rendering

```jsx
{activeTab === 'upcoming' && <UpcomingEvents />}
{activeTab === 'past' && <PastEvents />}
```

Only renders the component if condition is true!

---

## 🎓 Key Takeaways

1. **Lazy load heavy components** to speed up initial page load
2. **Use Suspense** to show fallbacks while lazy components load
3. **Custom hooks** (`useStaggerAnimation`) keep code clean and reusable
4. **Respect user preferences** (reduced motion)
5. **Clean up animations** in useEffect return function
6. **Mobile-first design** with Tailwind's responsive prefixes

---

## 🤔 Common Questions

**Q: Why lazy load the Threads component?**
A: It uses WebGL which is heavy. Loading it lazily means the rest of the page shows faster!

**Q: What's the difference between `useEffect` and `useMemo`?**
A: 
- `useEffect` = Run side effects (animations, API calls)
- `useMemo` = Calculate and remember a value

**Q: Why use GSAP instead of CSS animations?**
A: GSAP gives us scroll triggers, staggered animations, and better control!

---

Happy coding! 🚀
