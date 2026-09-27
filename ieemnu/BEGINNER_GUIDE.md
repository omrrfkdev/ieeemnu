# IEEMNU Project - Complete Beginner's Guide

## Table of Contents
1. [Introduction](#introduction)
2. [What is Programming?](#what-is-programming)
3. [Understanding the Web](#understanding-the-web)
4. [Project Overview](#project-overview)
5. [Core Technologies Explained](#core-technologies-explained)
6. [Project Structure](#project-structure)
7. [Step-by-Step Code Walkthrough](#step-by-step-code-walkthrough)
8. [Practical Exercises](#practical-exercises)
9. [FAQ Section](#faq-section)
10. [Glossary](#glossary)

---

## Introduction

Welcome to the IEEMNU project! This guide is designed for people who have **zero coding experience** and want to understand how this website works. We'll start from the very basics and work our way up to understanding complex code.

**What is IEEMNU?**
- IEEMNU is the website for an IEEE student branch
- IEEE stands for "Institute of Electrical and Electronics Engineers"
- It's a professional organization for people who work with technology
- This website showcases their events, projects, and team members

---

## What is Programming?

### The Simple Analogy: Building a House

Think of programming like building a house:

- **Code** = The blueprints and instructions for the house
- **Programming Languages** = Different languages you can use to write these instructions (like English, Spanish, French)
- **Programmers** = The architects and builders who create these instructions
- **Computers** = The workers who follow the instructions perfectly

### Why Do We Need Programming?

Imagine you have a robot that can do anything, but it doesn't know what to do. You need to give it specific instructions:

```
1. Pick up the cup
2. Move the cup to the table
3. Put the cup down
```

Programming is just giving computers these kinds of instructions, but for much more complex tasks!

### Real-World Examples of Programming

You use programmed systems every day:
- **Your phone** - Every app is a program
- **Websites** - Like Facebook, YouTube, this website
- **Games** - All video games are programs
- **Smart home devices** - Alexa, Google Home, smart thermostats

---

## Understanding the Web

### How Websites Work

Think of the web like a restaurant:

```
You (Customer) → Browser (Menu) → Server (Kitchen) → Website (Food)
```

**The Process:**
1. You open a web browser (like Chrome or Firefox)
2. You type a website address (like ieemnu.org)
3. Your browser sends a request to a server (a powerful computer)
4. The server finds the website files and sends them back
5. Your browser shows you the website

### The Three Main Parts of a Website

Every website has three main parts:

#### 1. HTML - The Structure (Skeleton)
- Think of this as the **bones** of a webpage
- It defines what's on the page (headings, paragraphs, images, buttons)
- It doesn't make things pretty or interactive

```
HTML Example:
<h1>Welcome to IEEMNU!</h1>
<p>We are a student organization.</p>
<button>Join Us</button>
```

#### 2. CSS - The Style (Appearance)
- Think of this as the **clothing** and **makeup**
- It makes things look good (colors, fonts, spacing, layout)
- It doesn't make things interactive

```
CSS Example:
h1 {
  color: blue;
  font-size: 24px;
}
```

#### 3. JavaScript - The Behavior (Actions)
- Think of this as the **brain**
- It makes things interactive (clicking, typing, animations)
- It can respond to user actions

```
JavaScript Example:
button.addEventListener('click', function() {
  alert('Thanks for clicking!');
});
```

### Visual Diagram

```
┌─────────────────────────────────────┐
│         What You See                │
│                                     │
│    ┌─────────────────────┐         │
│    │   Styled HTML Page  │         │
│    │  (What user sees)   │         │
│    └─────────────────────┘         │
│              ↑                      │
│              │                      │
│    ┌─────────┴─────────┐           │
│    │                   │           │
│    │         Browser    │           │
│    │  (Chrome, Firefox)│           │
│    │                   │           │
│    └─────────┬─────────┘           │
│              │                      │
│              │                      │
│    ┌─────────┴─────────┐           │
│    │                   │           │
│    │   HTML + CSS +    │           │
│    │   JavaScript      │           │
│    │   (Website Files) │           │
│    │                   │           │
│    └───────────────────┘           │
└─────────────────────────────────────┘
```

---

## Project Overview

### What This Website Does

The IEEMNU website serves as a digital showcase for the IEEE student branch. Here's what it does:

```
┌─────────────────────────────────────┐
│         IEEMNU Website              │
├─────────────────────────────────────┤
│ • Shows upcoming events              │
│ • Displays team members              │
│ • Showcases projects                 │
│ • Provides membership information    │
│ • Allows event registration         │
│ • Has photo galleries                │
│ • Shares news and updates            │
└─────────────────────────────────────┘
```

### How Users Interact With the Website

```
User Flow:
1. User visits website
2. User sees homepage
3. User clicks on navigation menu
4. User navigates to different pages
5. User interacts with features (buttons, forms)
6. User gets information or performs actions
```

### The Technology Stack (The Tools We Use)

```
┌─────────────────────────────────────┐
│        Technology Stack              │
├─────────────────────────────────────┤
│                                     │
│  Frontend (What users see)          │
│  ┌─────────────────────────────┐   │
│  │ React 19                    │   │
│  │ (Building the interface)     │   │
│  └─────────────────────────────┘   │
│              ↑                      │
│              │                      │
│  ┌─────────────────────────────┐   │
│  │ Vite 7                      │   │
│  │ (Building the website)      │   │
│  └─────────────────────────────┘   │
│              ↑                      │
│              │                      │
│  ┌─────────────────────────────┐   │
│  │ Tailwind CSS                │   │
│  │ (Making it look good)       │   │
│  └─────────────────────────────┘   │
│              ↑                      │
│              │                      │
│  ┌─────────────────────────────┐   │
│  │ JavaScript/HTML/CSS         │   │
│  │ (The foundation)            │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## Core Technologies Explained

### 1. React - The Building Blocks

**What is React?**
React is a JavaScript library that helps us build user interfaces. Think of it as a set of LEGO blocks that we can use to build websites.

**Why do we use React?**
- **Components**: We can break our website into small, reusable pieces
- **Efficient**: It updates only what needs to change
- **Popular**: Many companies use it (Facebook, Instagram, Netflix)
- **Easy to learn**: Once you understand the basics

**Real-World Analogy:**

Imagine you're building a house with LEGO:

```
Without React:
- Build everything from scratch every time
- Hard to make changes
- Lots of repeated work

With React:
- Pre-made LEGO pieces (components)
- Snap them together easily
- Change one piece without rebuilding everything
```

**Basic React Example:**

```jsx
// This is a React component
function Welcome() {
  return (
    <div>
      <h1>Welcome to IEEMNU!</h1>
      <p>We're excited to have you here.</p>
    </div>
  );
}

// We can use this component multiple times
<Welcome />
<Welcome />
<Welcome />
```

### 2. Vite - The Builder

**What is Vite?**
Vite is a tool that builds our website. Think of it as a construction crew that takes our code and turns it into a working website.

**Why do we use Vite?**
- **Fast**: It's super quick to start and build
- **Modern**: Uses the latest web technologies
- **Simple**: Easy to set up and use
- **Smart**: Only rebuilds what changes

**How Vite Works:**

```
Your Code → Vite → Working Website
   ↓           ↓           ↓
(Instructions)  (Builder)  (Result)
```

**Real-World Analogy:**

Think of Vite like a factory assembly line:

```
Raw Materials (Code) → Assembly Line (Vite) → Finished Product (Website)
```

### 3. Tailwind CSS - The Stylist

**What is Tailwind CSS?**
Tailwind is a CSS framework that helps us style our website. Think of it as a toolbox with pre-made design tools.

**Why do we use Tailwind?**
- **Fast**: No need to write custom CSS from scratch
- **Consistent**: Everything looks cohesive
- **Responsive**: Works on all screen sizes
- **Popular**: Many developers love it

**How Tailwind Works:**

Instead of writing custom CSS like this:

```css
.button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}
```

We use Tailwind classes directly in our HTML/React:

```jsx
<button className="bg-blue-500 text-white px-5 py-2 rounded">
  Click Me
</button>
```

**Real-World Analogy:**

Think of Tailwind like a ready-to-wear clothing store:

```
Without Tailwind:
- Sew your own clothes from scratch
- Takes a long time
- Hard to make everything match

With Tailwind:
- Pick pre-made clothes from the store
- Everything already fits well together
- Quick and easy
```

### 4. JavaScript - The Logic

**What is JavaScript?**
JavaScript is a programming language that makes websites interactive. Think of it as the brain of a website.

**Why do we use JavaScript?**
- **Interactive**: Makes websites respond to user actions
- **Dynamic**: Can change content without reloading
- **Versatile**: Works in browsers and on servers
- **Essential**: Almost all modern websites use it

**What JavaScript Can Do:**

```
✓ Respond to button clicks
✓ Validate forms (check if email is correct)
✓ Load data without refreshing the page
✓ Create animations
✓ Store data in the browser
✓ Make calculations
✓ Control page navigation
```

**Simple JavaScript Example:**

```javascript
// This shows a message when clicked
function showMessage() {
  alert('Hello from IEEMNU!');
}

// We can attach this to a button
<button onClick={showMessage}>Click Me</button>
```

---

## Project Structure

### The Folder Organization

Our project is organized into folders, just like how you organize files on your computer:

```
ieemnu/
│
├── public/              # Static files (images, favicon)
│   ├── images/          # All the images used on the site
│   └── favicon.svg      # The little icon in the browser tab
│
├── src/                 # All our code (source files)
│   ├── components/       # Reusable pieces of the website
│   │   ├── animations/  # Animation components
│   │   ├── events/      # Event-related components
│   │   ├── layout/      # Header, footer, main layout
│   │   └── common/      # General purpose components
│   │
│   ├── context/         # Global state management
│   │   └── ThemeContext.jsx
│   │
│   ├── hooks/           # Reusable functions
│   │   └── useScrollAnimation.js
│   │
│   ├── pages/           # Different pages of the website
│   │   ├── Home.jsx
│   │   ├── Events.jsx
│   │   ├── Team.jsx
│   │   └── ...
│   │
│   ├── constants/        # Static data
│   │   └── index.js
│   │
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
│
├── Configuration Files   # Settings and tools
├── Documentation        # Documentation files
└── package.json        # Project dependencies
```

### Visual Project Structure

```
┌─────────────────────────────────────┐
│         Project Structure           │
├─────────────────────────────────────┤
│                                     │
│   ┌─────────────────────────────┐   │
│   │        public/              │   │
│   │    (Images & Assets)        │   │
│   └─────────────────────────────┘   │
│             ↑                       │
│   ┌─────────┴─────────┐             │
│   │                   │             │
│   │        src/       │             │
│   │                   │             │
│   │   ┌───────────┐   │             │
│   │   │ components│   │             │
│   │   └───────────┘   │             │
│   │                   │             │
│   │   ┌───────────┐   │             │
│   │   │   pages   │   │             │
│   │   └───────────┘   │             │
│   │                   │             │
│   │   ┌───────────┐   │             │
│   │   │   hooks   │   │             │
│   │   └───────────┘   │             │
│   │                   │             │
│   └───────────────────┘             │
│                                     │
└─────────────────────────────────────┘
```

---

## Step-by-Step Code Walkthrough

### Level 1: The Entry Point (main.jsx)

This is where our website starts. Think of it as the front door of a house.

```jsx
// Line 1: Import React, the library we use to build our website
import React from 'react';

// Line 2: Import ReactDOM, which helps us put React in the browser
import ReactDOM from 'react-dom/client';

// Line 3: Import our main App component (the house)
import App from './App.jsx';

// Line 4: Import CSS for global styles (the paint job)
import './index.css';

// Line 7: Find the root element in our HTML file
// This is like finding the plot of land where we'll build our house
const rootElement = document.getElementById('root');

// Line 10: Create a React root
// This prepares the land for building
const root = ReactDOM.createRoot(rootElement);

// Line 13: Render our App component
// This actually builds and shows our website
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**What happens when the website loads:**

```
1. Browser loads the HTML file
2. Browser finds the <div id="root"></div> element
3. React takes over this element
4. React renders the App component
5. User sees the complete website
```

### Level 2: The Main App Component (App.jsx)

This is the main structure of our website. Think of it as the main frame of a house.

```jsx
// Line 1: Import necessary libraries
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Line 2: Import our ThemeProvider (handles light/dark mode)
import { ThemeProvider } from './context/ThemeContext.jsx';

// Line 3: Import Layout component (header, footer, main content area)
import Layout from './components/layout/Layout.jsx';

// Line 6: Import all our page components
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import Team from './pages/Team.jsx';
import About from './pages/About.jsx';
import Membership from './pages/Membership.jsx';
import Committees from './pages/Committees.jsx';
import Contact from './pages/Contact.jsx';
import Projects from './pages/Projects.jsx';
import Board from './pages/Board.jsx';
import Registration from './pages/Registration.jsx';
import NotFound from './pages/NotFound.jsx';

// Line 17: Import lazy loading for better performance
import lazy from 'react';

// Line 20: Define our main App component
function App() {
  return (
    // Line 22: Wrap everything in Router for navigation
    <Router>
      {/* Line 24: Wrap everything in ThemeProvider for theme support */}
      <ThemeProvider>
        {/* Line 26: Wrap everything in Layout for consistent structure */}
        <Layout>
          {/* Line 28: Define our routes (which URL shows which page) */}
          <Routes>
            {/* Line 30: Home page at the root URL */}
            <Route path="/" element={<Home />} />

            {/* Line 33: Events page at /events */}
            <Route path="/events" element={<Events />} />

            {/* Line 36: Team page at /team */}
            <Route path="/team" element={<Team />} />

            {/* Line 39: About page at /about */}
            <Route path="/about" element={<About />} />

            {/* Line 42: Membership page at /membership */}
            <Route path="/membership" element={<Membership />} />

            {/* Line 45: Committees page at /committees */}
            <Route path="/committees" element={<Committees />} />

            {/* Line 48: Contact page at /contact */}
            <Route path="/contact" element={<Contact />} />

            {/* Line 51: Projects page at /projects */}
            <Route path="/projects" element={<Projects />} />

            {/* Line 54: Board page at /board */}
            <Route path="/board" element={<Board />} />

            {/* Line 57: Registration page at /registration */}
            <Route path="/registration" element={<Registration />} />

            {/* Line 60: 404 page for unknown URLs */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

// Line 67: Export the App component so it can be used
export default App;
```

**How Routing Works:**

```
URL → Router → Component → Page
│      │         │          │
│      │         │          └─ What user sees
│      │         └─ The page component
│      └─ Matches URL to correct route
└─ What user types in browser

Example:
/user types "/events"
  → Router finds Route path="/events"
  → Router loads Events component
  → User sees Events page
```

### Level 3: A Simple Component (Button.jsx)

This is a reusable button component. Think of it as a template for making buttons.

```jsx
// Line 1: Import React
import React from 'react';

// Line 4: Define Button component that accepts properties (props)
function Button({ children, onClick, variant = 'primary', disabled = false }) {
  // Line 5: Define button styles based on variant
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors';

  // Line 8: Different style variants
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  };

  // Line 13: Combine base styles with variant styles
  const buttonStyles = `${baseStyles} ${variants[variant]}`;

  // Line 16: Return the button element
  return (
    <button
      // Line 18: Apply the styles
      className={buttonStyles}

      // Line 21: Handle click events
      onClick={onClick}

      // Line 24: Disable if needed
      disabled={disabled}
    >
      {/* Line 27: Display button text or content */}
      {children}
    </button>
  );
}

// Line 32: Export the Button component
export default Button;
```

**How to Use This Component:**

```jsx
// Example 1: Basic button
<Button>Click Me</Button>

// Example 2: Button with click handler
<Button onClick={() => alert('Clicked!')}>Alert Me</Button>

// Example 3: Different variant
<Button variant="secondary">Secondary Button</Button>

// Example 4: Disabled button
<Button disabled={true}>Can't Click</Button>
```

### Level 4: A Page Component (Home.jsx)

This is the homepage component. Think of it as the living room of our house.

```jsx
// Line 1: Import React
import React from 'react';

// Line 2: Import our animation components
import ScrollReveal from '../components/animations/ScrollReveal';
import CountUp from '../components/animations/CountUp';
import MagicBento from '../components/animations/MagicBento';

// Line 6: Import static data
import { TEAM_MEMBERS, UPCOMING_EVENTS } from '../constants';

// Line 9: Define Home component
function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ScrollReveal>
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to IEEMNU</h1>
            <p className="text-xl mb-8">Empowering Future Engineers</p>
            <Button variant="outline" className="text-white border-white">
              Join Us Today
            </Button>
          </div>
        </section>
      </ScrollReveal>

      {/* Statistics Section */}
      <ScrollReveal>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <CountUp end={150} />
                <p className="text-gray-600">Members</p>
              </div>
              <div className="text-center">
                <CountUp end={25} />
                <p className="text-gray-600">Projects</p>
              </div>
              <div className="text-center">
                <CountUp end={50} />
                <p className="text-gray-600">Events</p>
              </div>
              <div className="text-center">
                <CountUp end={10} />
                <p className="text-gray-600">Years</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Events Section */}
      <ScrollReveal>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {UPCOMING_EVENTS.slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Magic Bento Grid */}
      <ScrollReveal>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <MagicBento />
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}

// Line 69: Export Home component
export default Home;
```

**What This Page Does:**

```
1. Shows a hero section with welcome message
2. Displays statistics (members, projects, events, years)
3. Shows upcoming events
4. Displays a magic bento grid
5. All sections animate when scrolled into view
```

### Level 5: An Animation Component (ScrollReveal.jsx)

This component makes things appear smoothly when you scroll to them.

```jsx
// Line 1: Import React hooks
import { useEffect, useRef } from 'react';

// Line 2: Import GSAP for animations
import gsap from 'gsap';

// Line 5: Define ScrollReveal component
function ScrollReveal({ children, delay = 0 }) {
  // Line 6: Create a reference to the DOM element
  const elementRef = useRef(null);

  // Line 9: Run animation when component mounts
  useEffect(() => {
    // Line 10: Get the element from the reference
    const element = elementRef.current;

    // Line 13: Create animation with GSAP
    gsap.fromTo(
      element,
      // Line 15: Starting state (invisible and moved down)
      {
        opacity: 0,
        y: 50,
      },
      // Line 20: Ending state (visible and in position)
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: delay,
        ease: 'power2.out',
      }
    );
  }, [delay]);

  // Line 32: Return the wrapped children
  return <div ref={elementRef}>{children}</div>;
}

// Line 36: Export ScrollReveal component
export default ScrollReveal;
```

**How the Animation Works:**

```
1. Component creates an invisible div
2. GSAP animation starts when component mounts
3. Element fades in and moves up smoothly
4. Animation takes 0.8 seconds to complete
5. User sees smooth reveal effect
```

### Level 6: Theme Management (ThemeContext.jsx)

This component handles light/dark mode switching.

```jsx
// Line 1: Import React hooks and context
import { createContext, useContext, useState, useEffect } from 'react';

// Line 4: Create a context for theme
const ThemeContext = createContext();

// Line 7: Define ThemeProvider component
function ThemeProvider({ children }) {
  // Line 8: State to track current theme
  const [theme, setTheme] = useState('light');

  // Line 11: Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  // Line 17: Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Line 22: Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Line 26: Apply theme to document
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Line 33: Provide theme context to children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Line 40: Custom hook to use theme
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Line 48: Export provider and hook
export { ThemeProvider, useTheme };
```

**How Theme Switching Works:**

```
1. User clicks theme toggle button
2. toggleTheme() function is called
3. Theme state changes (light ↔ dark)
4. New theme is saved to localStorage
5. Dark/light class is added to document
6. Tailwind CSS applies different styles
7. Website appearance changes
```

---

## Practical Exercises

### Exercise 1: Create Your First Component

**Goal:** Create a simple greeting component

**Steps:**
1. Create a new file called `Greeting.jsx`
2. Add the following code:

```jsx
import React from 'react';

function Greeting({ name }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to our website.</p>
    </div>
  );
}

export default Greeting;
```

3. Use it in your App component:

```jsx
<Greeting name="Your Name" />
```

**What you learned:**
- How to create a React component
- How to use props (properties)
- How to export and import components

### Exercise 2: Create a Button Component

**Goal:** Create a button that changes color when clicked

**Steps:**
1. Create a new file called `ColorButton.jsx`
2. Add the following code:

```jsx
import React, { useState } from 'react';

function ColorButton() {
  const [color, setColor] = useState('blue');

  const colors = ['blue', 'red', 'green', 'purple', 'orange'];

  function handleClick() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setColor(colors[randomIndex]);
  }

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: color, color: 'white', padding: '10px 20px' }}
    >
      Click to change color!
    </button>
  );
}

export default ColorButton;
```

3. Use it in your App component:

```jsx
<ColorButton />
```

**What you learned:**
- How to use state (useState)
- How to handle click events
- How to update state based on user interaction

### Exercise 3: Create a Counter Component

**Goal:** Create a counter that can be increased and decreased

**Steps:**
1. Create a new file called `Counter.jsx`
2. Add the following code:

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  function decrease() {
    setCount(count - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;
```

3. Use it in your App component:

```jsx
<Counter />
```

**What you learned:**
- How to manage multiple pieces of state
- How to create multiple event handlers
- How to reset state to initial value

### Exercise 4: Create a Todo List

**Goal:** Create a simple todo list with add and delete functionality

**Steps:**
1. Create a new file called `TodoList.jsx`
2. Add the following code:

```jsx
import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  function addTodo() {
    if (input.trim() !== '') {
      setTodos([...todos, input]);
      setInput('');
    }
  }

  function deleteTodo(index) {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  }

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a todo..."
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
```

3. Use it in your App component:

```jsx
<TodoList />
```

**What you learned:**
- How to work with arrays in state
- How to add items to an array
- How to remove items from an array
- How to map over arrays to render lists

---

## FAQ Section

### General Questions

**Q: Do I need to know coding to understand this guide?**
A: No! This guide is designed for complete beginners. We start from the very basics.

**Q: How long will it take to learn React?**
A: It varies, but most people can learn the basics in 2-4 weeks with consistent practice.

**Q: What makes this project different from other tutorials?**
A: This guide uses real-world examples, simple analogies, and explains WHY things work, not just HOW.

### Technical Questions

**Q: What's the difference between JavaScript and React?**
A: JavaScript is the programming language, and React is a library built with JavaScript that helps build user interfaces.

**Q: Why do we need so many files?**
A: Organizing code into separate files makes it easier to:
- Find specific pieces of code
- Reuse components
- Work in teams
- Maintain the code

**Q: What is a component?**
A: A component is like a building block. It's a piece of the website that can be reused. Think of it like a LEGO piece.

**Q: What are props?**
A: Props (properties) are like arguments you pass to a function. They let you customize components.

**Q: What is state?**
A: State is data that can change. It's like the information displayed on a digital clock that updates every second.

**Q: What is an event?**
A: An event is something that happens in the browser, like a user clicking a button or typing in a text field.

**Q: What is useEffect?**
A: useEffect is a React hook that lets you perform side effects, like fetching data or setting up subscriptions.

**Q: What is useRef?**
A: useRef is a React hook that lets you create references to DOM elements or keep values that don't trigger re-renders.

### Practical Questions

**Q: How do I run this project?**
A: Follow these steps:
1. Install Node.js from nodejs.org
2. Open your terminal/command prompt
3. Navigate to the project folder
4. Run `npm install`
5. Run `npm run dev`
6. Open the URL shown in your terminal

**Q: How do I make changes to the website?**
A: Edit the files in the `src` folder, save them, and the website will automatically update.

**Q: Can I use this code for my own project?**
A: Yes! This is open-source code. Feel free to use it as a starting point.

**Q: What editor should I use?**
A: Popular choices include:
- Visual Studio Code (recommended)
- WebStorm
- Sublime Text
- Atom

**Q: How do I debug when something doesn't work?**
A: Try these steps:
1. Check the browser console for errors
2. Make sure you imported everything correctly
3. Check for typos
4. Use console.log() to see what's happening
5. Break down the problem into smaller parts

---

## Glossary

### A

**Array**: A list of values. Like a shopping list: `["apples", "bananas", "oranges"]`

**Argument**: A value passed to a function. Like giving a recipe the ingredient "sugar".

**Attribute**: Additional information about an HTML element. Like `src="image.jpg"` in `<img src="image.jpg">`

### B

**Browser**: A program that displays websites. Examples: Chrome, Firefox, Safari, Edge.

**Bug**: An error or problem in code that makes it not work correctly.

**Build**: The process of converting code into a working application.

### C

**Component**: A reusable piece of a React application. Like a building block.

**CSS**: Cascading Style Sheets. Used to style websites.

**Callback**: A function passed as an argument to another function.

**Class**: A template for creating objects in JavaScript.

**Console**: A tool in browsers for viewing messages and errors.

**Context**: A way to pass data through the component tree without passing props at every level.

### D

**DOM**: Document Object Model. The browser's representation of a webpage.

**Deployment**: The process of putting a website on the internet for others to access.

**Dependency**: External code that your project relies on.

**Debugging**: Finding and fixing errors in code.

### E

**Event**: Something that happens in the browser, like a click or keypress.

**Element**: A part of a webpage, like a paragraph, button, or image.

**Export**: Making code available for other files to use.

**Effect**: Side effects in React, like data fetching or subscriptions.

### F

**Function**: A reusable block of code that performs a specific task.

**Framework**: A set of tools and conventions for building applications.

**Frontend**: The part of a website that users see and interact with.

**File**: A collection of data stored on a computer.

### G

**Git**: A version control system for tracking changes in code.

**Global**: Something accessible from anywhere in the code.

**Grid**: A layout system for arranging elements in rows and columns.

### H

**HTML**: HyperText Markup Language. The structure of webpages.

**Hook**: Special functions in React that let you use state and other React features.

**Hosting**: Storing website files on a server so they can be accessed online.

**Hyperlink**: A link that takes you to another webpage or location.

### I

**Import**: Bringing code from another file into your current file.

**Interface**: How different parts of code interact with each other.

**Internet**: A global network of computers.

**Image**: A visual file displayed on a webpage.

### J

**JavaScript**: A programming language used to make websites interactive.

**JSON**: JavaScript Object Notation. A format for storing and exchanging data.

**JSX**: JavaScript XML. A syntax extension for JavaScript that looks like HTML.

### K

**Key**: A unique identifier used by React to track items in lists.

**Keyword**: A reserved word in a programming language with special meaning.

### L

**Library**: A collection of pre-written code that you can use.

**Loop**: Repeating a block of code multiple times.

**Lifecycle**: The stages of a component's existence.

**Local Storage**: A way to store data in the browser.

### M

**Module**: A file containing related code.

**Method**: A function that belongs to an object.

**Mounting**: The process of adding a component to the DOM.

### N

**Node.js**: A JavaScript runtime for building server-side applications.

**npm**: Node Package Manager. A tool for managing JavaScript packages.

**Navigation**: Moving between different pages or sections of a website.

**Null**: A value that represents the absence of a value.

### O

**Object**: A collection of related data and functions.

**Operator**: A symbol that performs an operation, like `+` or `-`.

**Optimization**: Making code run faster or use fewer resources.

**Output**: The result produced by code.

### P

**Package**: A collection of code that can be shared and reused.

**Props**: Properties passed to React components.

**Parameter**: A variable in a function definition.

**Promise**: An object representing the eventual completion of an operation.

### Q

**Query**: A request for information.

**Queue**: A list of tasks waiting to be processed.

**Quick Action**: A fast way to perform a common task.

### R

**React**: A JavaScript library for building user interfaces.

**Render**: The process of displaying a component on the screen.

**Route**: A path in the URL that maps to a specific page.

**Ref**: A reference to a DOM element or value.

### S

**State**: Data that can change over time in a React component.

**String**: Text data. Like "Hello, World!"

**Style**: The visual appearance of elements.

**Server**: A computer that serves webpages to browsers.

### T

**Terminal**: A command-line interface for running commands.

**Tailwind**: A CSS framework for styling websites.

**Type**: The kind of data, like string, number, or boolean.

**Testing**: Checking that code works correctly.

### U

**URL**: Uniform Resource Locator. The address of a webpage.

**User**: A person who uses the website.

**Update**: Changing the state or props of a component.

**Utility**: A function that performs a common, helpful task.

### V

**Variable**: A named storage location for data.

**Version Control**: A system for tracking changes to code.

**Virtual DOM**: React's in-memory representation of the DOM.

**Value**: The data stored in a variable or property.

### W

**Website**: A collection of webpages.

**Web Browser**: A program that displays websites.

**Webpack**: A tool for bundling JavaScript files.

**Widget**: A small, reusable component.

### X

**XSS**: Cross-Site Scripting. A security vulnerability.

**XML**: eXtensible Markup Language. A format for storing data.

### Y

**Yarn**: A package manager for JavaScript, alternative to npm.

### Z

**Zero**: The number 0.

**Zone**: A specific area or section of code.

---

## Conclusion

Congratulations! You've completed the IEEMNU Beginner's Guide. You now understand:

- What programming is and why it's important
- How websites work (HTML, CSS, JavaScript)
- What React is and how to use it
- How the IEEMNU website is structured
- How components, props, and state work
- How to create your own React components

### Next Steps

1. **Practice**: Try the exercises in this guide
2. **Explore**: Look at other files in the project
3. **Experiment**: Make changes to the code
4. **Learn**: Study more React tutorials
5. **Build**: Create your own small projects

### Resources for Further Learning

- React Documentation: https://react.dev
- MDN Web Docs: https://developer.mozilla.org
- freeCodeCamp: https://www.freecodecamp.org
- Codecademy: https://www.codecademy.com

### Remember

- Everyone starts as a beginner
- Practice makes perfect
- Don't be afraid to make mistakes
- Ask questions when you're stuck
- Have fun coding!

---

**Happy Coding! 🚀**

For more detailed explanations of specific components, check out the annotated code files in the `annotated-code/` folder.
