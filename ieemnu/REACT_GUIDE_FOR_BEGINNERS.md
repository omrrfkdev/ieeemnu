# React Guide for Beginners - IEEE Website

A complete beginner's guide to understanding and modifying this React website. No prior React experience needed!

## Table of Contents

1. [What is React?](#what-is-react)
2. [Basic Concepts](#basic-concepts)
3. [React Features Used in This Project](#react-features-used)
4. [How to Modify Content](#how-to-modify-content)
5. [Step-by-Step Examples](#step-by-step-examples)
6. [Common Tasks](#common-tasks)
7. [Troubleshooting](#troubleshooting)

---

## What is React?

React is a JavaScript library for building user interfaces. Think of it like building with LEGO blocks:
- Each LEGO block is a **component** (like a button, card, or page)
- You combine blocks to build bigger things (like a complete website)
- You can reuse the same block in many places

**Why React?**
- ✅ Easy to organize code
- ✅ Reusable components
- ✅ Fast and efficient
- ✅ Large community support

---

## Basic Concepts

### 1. Components

**What is a Component?**
A component is a piece of your website. It's like a building block.

**Example:**
```jsx
// This is a simple component
const Welcome = () => {
  return <h1>Hello, IEEE!</h1>;
};
```

**Breaking it down:**
- `const Welcome` = Name of the component (always start with capital letter)
- `() => { }` = Arrow function (modern JavaScript syntax)
- `return` = What the component displays
- `<h1>Hello, IEEE!</h1>` = HTML-like code (called JSX)

### 2. JSX (JavaScript XML)

**What is JSX?**
JSX lets you write HTML inside JavaScript. It looks like HTML but it's more powerful.

**Example:**
```jsx
// JSX - looks like HTML
<div className="container">
  <h1>Title</h1>
  <p>This is a paragraph</p>
</div>
```

**Important differences from HTML:**
- Use `className` instead of `class`
- Use `onClick` instead of `onclick`
- Self-closing tags need `/` like `<img />`

### 3. Props (Properties)

**What are Props?**
Props are like settings you pass to a component. Like giving instructions to a LEGO block.

**Example:**
```jsx
// Passing props
<Button text="Click Me" color="blue" />

// Receiving props
const Button = ({ text, color }) => {
  return <button style={{ color }}>{text}</button>;
};
```

**Think of it like:**
- Props = Settings/Instructions
- You can pass text, numbers, colors, functions, etc.

### 4. State

**What is State?**
State is data that can change. Like a light switch (on/off).

**Example:**
```jsx
import { useState } from 'react';

const Counter = () => {
  // Create state: count starts at 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Add 1
      </button>
    </div>
  );
};
```

**Breaking it down:**
- `useState(0)` = Create state starting at 0
- `count` = Current value
- `setCount` = Function to change the value
- `onClick={() => setCount(count + 1)}` = When clicked, add 1

---

## React Features Used in This Project

### 1. **useState** - Managing Changing Data

**Where it's used:** Theme toggle (light/dark mode), mobile menu, form inputs

**Example from our project:**
```jsx
// In Header.jsx - Mobile menu
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// When hamburger icon is clicked
<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
  Menu
</button>
```

**How to modify:**
```jsx
// Change initial state
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true); // Starts open

// Or add your own state
const [isVisible, setIsVisible] = useState(false);
```

### 2. **useEffect** - Running Code at Specific Times

**Where it's used:** Loading data, animations, theme persistence

**Example from our project:**
```jsx
// In ThemeContext.jsx - Save theme to browser
useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]); // Runs when theme changes
```

**Breaking it down:**
- `useEffect(() => { })` = Run this code
- `[theme]` = Run when `theme` changes
- `[]` = Run only once when page loads
- No array = Run on every render

**How to modify:**
```jsx
// Run once when component loads
useEffect(() => {
  console.log('Component loaded!');
}, []);

// Run when specific value changes
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);
```

### 3. **useContext** - Sharing Data Across Components

**Where it's used:** Theme (light/dark mode) shared across entire site

**Example from our project:**
```jsx
// ThemeContext.jsx - Create context
export const ThemeContext = createContext();

// App.jsx - Provide context to all components
<ThemeProvider>
  <App />
</ThemeProvider>

// Any component - Use the context
const { theme, toggleTheme } = useContext(ThemeContext);
```

**Think of it like:**
- Context = A box of shared toys
- Any component can reach into the box and use the toys
- No need to pass props through many components

**How to modify:**
```jsx
// Use theme in your component
const MyComponent = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div>
      Current theme: {theme}
    </div>
  );
};
```

### 4. **React Router** - Navigation Between Pages

**Where it's used:** Navigating between Home, About, Events, etc.

**Example from our project:**
```jsx
// App.jsx - Define routes
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/events" element={<Events />} />
</Routes>

// Any component - Link to pages
<Link to="/about">Go to About</Link>
```

**Breaking it down:**
- `path="/"` = URL path (like website.com/)
- `element={<Home />}` = Component to show
- `<Link to="/about">` = Navigation link (doesn't reload page)

**How to add a new page:**
```jsx
// 1. Create the component
const NewPage = () => {
  return <div>My New Page</div>;
};

// 2. Add route in App.jsx
<Route path="/new-page" element={<NewPage />} />

// 3. Add link in navigation
<Link to="/new-page">New Page</Link>
```

### 5. **Custom Hooks** - Reusable Logic

**Where it's used:** `useTheme`, `useScrollAnimation`, `useMediaQuery`

**Example from our project:**
```jsx
// useMediaQuery.js - Check screen size
export const useIsMobile = () => {
  return useMediaQuery('(max-width: 768px)');
};

// Use in any component
const MyComponent = () => {
  const isMobile = useIsMobile();
  
  return (
    <div>
      {isMobile ? 'Mobile View' : 'Desktop View'}
    </div>
  );
};
```

**Think of it like:**
- Custom hook = A tool you create
- You can use this tool in many components
- Keeps code organized and reusable

### 6. **Props and Children** - Passing Data

**Where it's used:** Button, Card, all reusable components

**Example from our project:**
```jsx
// Button.jsx - Receives props
const Button = ({ children, variant, onClick }) => {
  return (
    <button className={variant} onClick={onClick}>
      {children}
    </button>
  );
};

// Using the Button
<Button variant="primary" onClick={() => alert('Clicked!')}>
  Click Me
</Button>
```

**Breaking it down:**
- `children` = Content between opening and closing tags
- `variant` = Style type (primary, secondary, etc.)
- `onClick` = Function to run when clicked

**How to modify:**
```jsx
// Add your own prop
const Button = ({ children, variant, onClick, size }) => {
  return (
    <button 
      className={`${variant} ${size}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Use it
<Button variant="primary" size="large">
  Big Button
</Button>
```

### 7. **Conditional Rendering** - Show/Hide Content

**Where it's used:** Mobile menu, loading states, event filters

**Example from our project:**
```jsx
// Show different content based on condition
{isMobileMenuOpen && (
  <div className="mobile-menu">
    Menu content here
  </div>
)}

// Or use ternary operator
{isLoading ? (
  <p>Loading...</p>
) : (
  <p>Content loaded!</p>
)}
```

**Breaking it down:**
- `&&` = "AND" - show if condition is true
- `? :` = "IF-ELSE" - show one thing or another
- `{condition}` = JavaScript in JSX (use curly braces)

**How to use:**
```jsx
const MyComponent = () => {
  const [showMessage, setShowMessage] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowMessage(!showMessage)}>
        Toggle Message
      </button>
      
      {showMessage && <p>Hello! I'm visible now!</p>}
    </div>
  );
};
```

### 8. **Lists and Mapping** - Displaying Multiple Items

**Where it's used:** Events list, team members, projects

**Example from our project:**
```jsx
// Events.jsx - Display list of events
{events.map((event) => (
  <div key={event.id}>
    <h3>{event.title}</h3>
    <p>{event.date}</p>
  </div>
))}
```

**Breaking it down:**
- `.map()` = Loop through array
- `(event) =>` = Each item in the array
- `key={event.id}` = Unique identifier (required by React)
- `{event.title}` = Display data from each item

**How to use:**
```jsx
const MyList = () => {
  const fruits = ['Apple', 'Banana', 'Orange'];
  
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
};
```

### 9. **Event Handlers** - Responding to User Actions

**Where it's used:** Buttons, forms, navigation

**Example from our project:**
```jsx
// Contact.jsx - Form submission
const handleSubmit = (e) => {
  e.preventDefault(); // Prevent page reload
  console.log('Form submitted!');
};

<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>
```

**Common events:**
- `onClick` = When clicked
- `onChange` = When input changes
- `onSubmit` = When form submitted
- `onMouseEnter` = When mouse hovers
- `onFocus` = When input focused

**How to use:**
```jsx
const MyComponent = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };
  
  const handleChange = (e) => {
    console.log('Input value:', e.target.value);
  };
  
  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <input onChange={handleChange} placeholder="Type here" />
    </div>
  );
};
```

### 10. **Refs** - Direct Access to Elements

**Where it's used:** Scroll animations, focus management

**Example from our project:**
```jsx
// useScrollAnimation.js - Animate element
const elementRef = useRef(null);

useEffect(() => {
  gsap.from(elementRef.current, {
    opacity: 0,
    y: 50,
  });
}, []);

return <div ref={elementRef}>Animated content</div>;
```

**Think of it like:**
- Ref = A name tag for an element
- You can directly access and manipulate the element
- Useful for animations, focus, measurements

---

## How to Modify Content

### Changing Text and Data

**All content is in one file:** `src/constants/index.js`

#### 1. Change Branch Information

```javascript
// Find this in constants/index.js
export const BRANCH_INFO = {
  name: 'IEEE University Student Branch',  // ← Change your branch name
  university: 'University Name',            // ← Change university
  established: '2020',                      // ← Change year
  email: 'ieee@university.edu',             // ← Change email
  phone: '+1 (555) 123-4567',              // ← Change phone
  address: '123 University Ave...',         // ← Change address
};
```

#### 2. Change Social Media Links

```javascript
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/your-page',
  twitter: 'https://twitter.com/your-handle',
  linkedin: 'https://linkedin.com/company/...',
  instagram: 'https://instagram.com/...',
  github: 'https://github.com/...',
};
```

#### 3. Add/Remove Team Members

```javascript
export const EXECUTIVE_BOARD = [
  {
    id: 1,                              // Unique number
    name: 'John Doe',                   // Member name
    position: 'Chairperson',            // Their role
    bio: 'Short bio here...',           // About them
    linkedin: 'https://linkedin.com/in/johndoe',
    email: 'john@university.edu',
  },
  // Add more members by copying this structure
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Vice Chair',
    bio: 'Another bio...',
    linkedin: 'https://linkedin.com/in/janesmith',
    email: 'jane@university.edu',
  },
];
```

#### 4. Add/Remove Events

```javascript
export const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'Workshop: Web Development',    // Event name
    date: '2024-02-15',                    // Date (YYYY-MM-DD)
    time: '2:00 PM - 5:00 PM',            // Time
    location: 'Engineering Building',      // Where
    description: 'Learn web development...', // Details
    category: 'Workshop',                  // Type
    registrationLink: 'https://...',       // Sign up link
  },
  // Add more events...
];
```

### Changing Styles and Colors

**All styles are in:** `tailwind.config.js`

#### Change Primary Color

```javascript
// Find this in tailwind.config.js
colors: {
  ieee: {
    blue: '#00629B',      // ← Change this hex code
    'blue-dark': '#004A75',
    'blue-light': '#0080C9',
  },
}
```

**How to find color codes:**
- Visit [coolors.co](https://coolors.co) or [color.adobe.com](https://color.adobe.com)
- Pick a color and copy the hex code (like #FF5733)
- Replace the value in the config

#### Change Fonts

```javascript
// In tailwind.config.js
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],  // ← Change 'Inter'
}
```

**Popular fonts:**
- `'Roboto'` - Clean and modern
- `'Open Sans'` - Friendly and readable
- `'Poppins'` - Geometric and modern
- `'Montserrat'` - Elegant and professional

---

## Step-by-Step Examples

### Example 1: Add a New Page

**Goal:** Create a "Gallery" page

**Step 1: Create the component file**

Create `src/pages/Gallery.jsx`:

```jsx
/**
 * Gallery Page
 * Displays photo gallery
 */

const Gallery = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">
        Photo Gallery
      </h1>
      <p className="text-center text-gray-600">
        Coming soon!
      </p>
    </div>
  );
};

export default Gallery;
```

**Step 2: Add route in App.jsx**

```jsx
// At the top, add import
import Gallery from './pages/Gallery';

// Inside <Routes>, add new route
<Route path="/gallery" element={<Gallery />} />
```

**Step 3: Add to navigation**

In `src/constants/index.js`:

```javascript
export const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/events', label: 'Events' },
  { path: '/projects', label: 'Projects' },
  { path: '/team', label: 'Team' },
  { path: '/gallery', label: 'Gallery' },  // ← Add this
  { path: '/contact', label: 'Contact' },
];
```

**Done!** Visit `http://localhost:5174/gallery`

### Example 2: Add a Counter Component

**Goal:** Create a simple counter that increases when clicked

**Create `src/components/common/Counter.jsx`:**

```jsx
import { useState } from 'react';

/**
 * Counter Component
 * A simple counter that increases on click
 */
const Counter = () => {
  // State: count starts at 0
  const [count, setCount] = useState(0);

  // Function to increase count
  const increase = () => {
    setCount(count + 1);
  };

  // Function to decrease count
  const decrease = () => {
    setCount(count - 1);
  };

  // Function to reset count
  const reset = () => {
    setCount(0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Counter</h2>
      
      {/* Display count */}
      <p className="text-4xl font-bold text-ieee-blue mb-4">
        {count}
      </p>
      
      {/* Buttons */}
      <div className="flex gap-2">
        <button 
          onClick={decrease}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          -
        </button>
        
        <button 
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
        
        <button 
          onClick={increase}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
```

**Use it in any page:**

```jsx
import Counter from '../components/common/Counter';

const MyPage = () => {
  return (
    <div>
      <h1>My Page</h1>
      <Counter />
    </div>
  );
};
```

### Example 3: Create a Simple Form

**Goal:** Create a contact form that shows what you typed

**Create `src/components/common/SimpleForm.jsx`:**

```jsx
import { useState } from 'react';

/**
 * Simple Form Component
 * Demonstrates form handling in React
 */
const SimpleForm = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    setSubmitted(true);
    console.log('Form data:', { name, email, message });
  };

  // If form submitted, show thank you message
  if (submitted) {
    return (
      <div className="bg-green-100 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-green-800 mb-2">
          Thank you, {name}!
        </h3>
        <p className="text-green-700">
          We received your message and will contact you at {email}
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  // Show form
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
      
      {/* Name input */}
      <div>
        <label className="block mb-2 font-medium">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter your name"
        />
      </div>

      {/* Email input */}
      <div>
        <label className="block mb-2 font-medium">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter your email"
        />
      </div>

      {/* Message textarea */}
      <div>
        <label className="block mb-2 font-medium">Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows="4"
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter your message"
        />
      </div>

      {/* Submit button */}
      <button 
        type="submit"
        className="px-6 py-2 bg-ieee-blue text-white rounded hover:bg-ieee-blue-dark"
      >
        Send Message
      </button>
    </form>
  );
};

export default SimpleForm;
```

**Breaking down the form:**
1. **State** - Store form field values
2. **onChange** - Update state when user types
3. **onSubmit** - Handle form submission
4. **e.preventDefault()** - Stop page reload
5. **Conditional rendering** - Show thank you message after submit

---

## Common Tasks

### Task 1: Change Homepage Hero Text

**File:** `src/pages/Home.jsx`

Find this section:

```jsx
<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
  IEEE Student Branch  {/* ← Change this */}
</h1>
<p className="text-xl md:text-2xl mb-8">
  Advancing Technology for Humanity  {/* ← Change this */}
</p>
```

### Task 2: Add More Statistics

**File:** `src/constants/index.js`

```javascript
export const STATS = [
  { label: 'Active Members', value: '150+' },
  { label: 'Events Organized', value: '30+' },
  { label: 'Projects Completed', value: '25+' },
  { label: 'Awards Won', value: '10+' },
  // Add your own:
  { label: 'Workshops', value: '20+' },
];
```

### Task 3: Change Button Colors

**File:** `src/components/common/Button.jsx`

Find the `variants` object:

```javascript
const variants = {
  primary: 'bg-ieee-blue text-white hover:bg-ieee-blue-dark',
  secondary: 'bg-accent-teal text-white hover:bg-accent-teal/90',
  // Add your own variant:
  success: 'bg-green-500 text-white hover:bg-green-600',
};
```

Use it:
```jsx
<Button variant="success">Success Button</Button>
```

### Task 4: Add Loading State

```jsx
const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <div>Content loaded!</div>;
};
```

### Task 5: Add Image

**Put image in `public/` folder**, then:

```jsx
<img 
  src="/my-image.jpg" 
  alt="Description of image"
  className="w-full h-auto rounded-lg"
/>
```

---

## Troubleshooting

### Error: "Cannot find module"

**Problem:** Import path is wrong

**Solution:**
```jsx
// ❌ Wrong
import Button from 'components/Button';

// ✅ Correct
import Button from '../components/common/Button';
```

### Error: "Objects are not valid as a React child"

**Problem:** Trying to display an object directly

**Solution:**
```jsx
// ❌ Wrong
<p>{user}</p>

// ✅ Correct
<p>{user.name}</p>
```

### Error: "Each child should have a unique key"

**Problem:** Missing `key` prop in list

**Solution:**
```jsx
// ❌ Wrong
{items.map(item => <div>{item}</div>)}

// ✅ Correct
{items.map((item, index) => <div key={index}>{item}</div>)}
```

### Styles Not Showing

**Solution:**
1. Make sure dev server is running: `npm run dev`
2. Check className spelling
3. Restart dev server (Ctrl+C, then `npm run dev`)

### Component Not Updating

**Problem:** Forgot to use state

**Solution:**
```jsx
// ❌ Wrong - won't update UI
let count = 0;
count = count + 1;

// ✅ Correct - updates UI
const [count, setCount] = useState(0);
setCount(count + 1);
```

---

## Quick Reference

### Import Statements

```jsx
// React hooks
import { useState, useEffect, useContext, useRef } from 'react';

// Router
import { Link, useNavigate } from 'react-router-dom';

// Components
import Button from './components/common/Button';

// Icons
import { Home, User, Mail } from 'lucide-react';
```

### Common Patterns

```jsx
// State
const [value, setValue] = useState(initialValue);

// Effect
useEffect(() => {
  // Code here
}, [dependency]);

// Event handler
const handleClick = () => {
  // Code here
};

// Conditional rendering
{condition && <Component />}
{condition ? <ComponentA /> : <ComponentB />}

// List rendering
{items.map(item => <div key={item.id}>{item.name}</div>)}
```

---

## Next Steps

1. **Practice:** Try modifying small things first
2. **Experiment:** Don't be afraid to break things (you can always undo)
3. **Read:** Check component files to see how they work
4. **Build:** Create your own simple components
5. **Learn More:** Visit [react.dev](https://react.dev) for official docs

---

## Helpful Resources

- **React Official Tutorial:** [react.dev/learn](https://react.dev/learn)
- **JavaScript Basics:** [javascript.info](https://javascript.info)
- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **React Router:** [reactrouter.com](https://reactrouter.com)

---

**Remember:** Everyone starts as a beginner. Take it one step at a time, and you'll be building amazing React apps in no time! 🚀

If you get stuck, read the error message carefully - it usually tells you what's wrong and where!
