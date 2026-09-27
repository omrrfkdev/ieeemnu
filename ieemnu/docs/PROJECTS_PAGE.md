# 💻 Projects Page Documentation

> **File:** `src/pages/Projects.jsx`
> **What it does:** Showcases IEEE branch projects, achievements, and technical work!

---

## 🎬 The Big Picture

The Projects page is like a **portfolio showcase** 🎨:
- Hero section with code icon
- Project cards with status badges
- Technology tags
- GitHub and demo links
- Awards section

---

## 🧩 Components Breakdown

### 1. Status Badge - Dynamic Styling Based on Data

```jsx
const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
};

// Usage:
<span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
  {project.status}
</span>
```

**The Switch Statement Pattern:**
```
Input: 'Completed'  → Output: Green classes
Input: 'In Progress' → Output: Blue classes
Input: anything else → Output: Gray classes (default)
```

**Why a function instead of inline logic?**
- Cleaner JSX
- Reusable
- Easy to add more statuses

---

### 2. Technology Tags - Mapping Arrays to UI

```jsx
// Project data:
{
  technologies: ['React', 'Node.js', 'MongoDB', 'TailwindCSS']
}

// Rendering:
<div className="flex flex-wrap gap-2">
  {project.technologies.map((tech, index) => (
    <span 
      key={index}
      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm"
    >
      {tech}
    </span>
  ))}
</div>
```

**The `flex-wrap` Pattern:**
- `flex` = Horizontal layout
- `flex-wrap` = Wrap to next line if no space
- `gap-2` = 8px between items

**Result:**
```
[React] [Node.js] [MongoDB]
[TailwindCSS]
```

---

### 3. ScrollFloat - Animated Hero Text

```jsx
<ScrollFloat
  as="h1"
  className="text-4xl md:text-5xl font-bold mb-6"
  animationDuration={1}
  ease="back.inOut(2)"
  scrollStart="center bottom+=50%"
  scrollEnd="bottom bottom-=40%"
>
  Projects & Achievements
</ScrollFloat>
```

**Animation Timeline:**
```
User scrolls down
      ↓
Element enters viewport (scrollStart)
      ↓
Animation begins (1 second duration)
      ↓
Element reaches scrollEnd position
      ↓
Animation complete!
```

---

### 4. useStaggerAnimation - Project Cards Cascade

```jsx
const projectsRef = useStaggerAnimation({
  selector: '.project-card',
  animation: { y: 0, opacity: 1, duration: 0.8 },
  stagger: 0.15,
});

<div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {PROJECTS.map(project => (
    <Card className="project-card">
      {/* ... */}
    </Card>
  ))}
</div>
```

**Initial State (before animation):**
```jsx
{ y: 50, opacity: 0 }  // Below and invisible
```

**Final State (after animation):**
```jsx
{ y: 0, opacity: 1 }   // In place and visible
```

---

## 🎨 Card Design Pattern

### The Project Card Structure

```jsx
<Card className="project-card h-full">
  <CardBody className="flex flex-col h-full">
    {/* Header: Status + Title */}
    <div className="flex justify-between items-start mb-4">
      <span className={getStatusColor(project.status)}>
        {project.status}
      </span>
    </div>
    
    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
    
    {/* Description */}
    <p className="text-gray-600 mb-4 flex-grow">
      {project.description}
    </p>
    
    {/* Tech Tags */}
    <div className="flex flex-wrap gap-2 mb-4">
      {project.technologies.map(tech => (
        <span className="tech-tag">{tech}</span>
      ))}
    </div>
    
    {/* Action Buttons */}
    <div className="flex gap-3 mt-auto">
      <Button href={project.github}>
        <Github /> Code
      </Button>
      <Button href={project.demo}>
        <ExternalLink /> Demo
      </Button>
    </div>
  </CardBody>
</Card>
```

**Key Layout Tricks:**

| Class | Purpose |
|-------|---------|
| `h-full` | Card takes full height of grid cell |
| `flex flex-col` | Stack content vertically |
| `flex-grow` | Description expands to fill space |
| `mt-auto` | Buttons stick to bottom |

**Why `h-full` + `flex-col` + `mt-auto`?**
- All cards same height (even with different content lengths)
- Buttons always at the bottom
- Clean, aligned grid!

---

## 📱 Responsive Grid

```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

| Screen | Columns | Cards per row |
|--------|---------|---------------|
| Mobile | 1 | 1 |
| Medium | 2 | 2 |
| Large | 3 | 3 |

---

## 🌙 Dark Mode Support

```jsx
className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
```

**How Tailwind Dark Mode Works:**
1. `dark:` prefix = Only applies in dark mode
2. Parent has `class="dark"` on `<html>` or `<body>`
3. Tailwind automatically switches styles

**Light Mode:**
- `bg-green-100` = Light green background
- `text-green-800` = Dark green text

**Dark Mode:**
- `dark:bg-green-900` = Dark green background
- `dark:text-green-200` = Light green text

---

## 🔗 External Links Pattern

```jsx
<a 
  href={project.github}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2"
>
  <Github className="w-4 h-4" />
  View Code
</a>
```

**Security Attributes:**
- `target="_blank"` = Open in new tab
- `rel="noopener"` = Prevents new page from accessing `window.opener`
- `rel="noreferrer"` = Doesn't send referrer header

**Why both?**
- Security best practice
- Prevents potential attacks from linked pages

---

## 🎓 Key Concepts

### 1. Conditional Rendering for Optional Data

```jsx
{project.github && (
  <a href={project.github}>
    <Github /> Code
  </a>
)}

{project.demo && (
  <a href={project.demo}>
    <ExternalLink /> Demo
  </a>
)}
```

**Only shows links if they exist in data!**

### 2. Array Methods Chain

```jsx
PROJECTS
  .filter(p => p.featured)           // Only featured projects
  .sort((a, b) => b.year - a.year)   // Newest first
  .slice(0, 6)                       // Only first 6
  .map(project => <Card />)          // Render each
```

### 3. Destructuring in Map

```jsx
// Without destructuring:
{PROJECTS.map(project => (
  <h3>{project.title}</h3>
  <p>{project.description}</p>
))}

// With destructuring:
{PROJECTS.map(({ title, description, technologies }) => (
  <h3>{title}</h3>
  <p>{description}</p>
))}
```

---

## 🚀 Performance Notes

### No Heavy Images

Projects page is mostly text and icons:
- Fast LCP (text renders immediately)
- No image preloading needed
- Small bundle size

### Icon Tree-Shaking

```jsx
import { Code, Award, Github, ExternalLink } from 'lucide-react';
```

**Only these 4 icons are bundled, not the entire library!**

---

## 🤔 Common Questions

**Q: Why use `flex-grow` on the description?**
A: It pushes the buttons to the bottom, making all cards align nicely.

**Q: What if a project has no GitHub link?**
A: The `{project.github && ...}` pattern hides the button entirely.

**Q: Why separate `getStatusColor` function?**
A: 
- Keeps JSX clean
- Easy to add more statuses later
- Reusable if needed elsewhere

---

## 📊 Data Structure

```jsx
const PROJECTS = [
  {
    id: 1,
    title: 'Smart Campus IoT',
    description: 'An IoT-based system for monitoring...',
    status: 'Completed',
    year: 2024,
    technologies: ['Arduino', 'Python', 'MQTT', 'React'],
    github: 'https://github.com/ieee-branch/smart-campus',
    demo: 'https://smart-campus.ieee.org',
    featured: true,
    team: ['John Doe', 'Jane Smith'],
    awards: ['Best Innovation Award 2024'],
  },
  // ... more projects
];
```

**Each project has:**
| Field | Type | Purpose |
|-------|------|---------|
| `id` | number | Unique key for React |
| `title` | string | Project name |
| `status` | string | 'Completed' or 'In Progress' |
| `technologies` | array | Tech stack tags |
| `github` | string | Optional repo link |
| `demo` | string | Optional live demo |
| `featured` | boolean | Show on homepage? |

---

## 📐 Page Structure

```
┌─────────────────────────────────────────┐
│           HERO SECTION                  │
│    <Code /> icon                        │
│    "Projects & Achievements" title      │
│    Subtitle                             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         PROJECTS GRID                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Project │ │ Project │ │ Project │   │
│  │ Card 1  │ │ Card 2  │ │ Card 3  │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Project │ │ Project │ │ Project │   │
│  │ Card 4  │ │ Card 5  │ │ Card 6  │   │
│  └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         AWARDS SECTION                  │
│    Trophy icons + award names           │
└─────────────────────────────────────────┘
```

---

Happy coding! 🚀
