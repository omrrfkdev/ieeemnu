/**
 * ============================================
 * ANNOTATED CODE: main.jsx
 * ============================================
 * This is the entry point of the IEEMNU website.
 * Think of this as the front door of a house.
 * ============================================
 */

// ============================================
// LINE 1: Import Statement
// ============================================
// This line imports a special feature from React called 'StrictMode'
// StrictMode is like a safety inspector that helps find potential problems
// It doesn't change what your users see, but it helps you write better code
import { StrictMode } from 'react'

// ============================================
// LINE 2: Import Statement
// ============================================
// This line imports 'createRoot' from 'react-dom/client'
// 'react-dom' is React's library for working with web browsers
// 'createRoot' is a function that prepares a place in the webpage to show our app
// Think of it like preparing a canvas before you start painting
import { createRoot } from 'react-dom/client'

// ============================================
// LINE 3: Import Statement
// ============================================
// This line imports our CSS (Cascading Style Sheets) file
// CSS is what makes our website look good (colors, fonts, spacing)
// The './index.css' means the file is in the same folder as this file
// Think of this as importing the paint and brushes we'll use
import './index.css'

// ============================================
// LINE 4: Import Statement
// ============================================
// This line imports our main App component
// The App component is like the main structure of our house
// It contains all the other components and pages
// Think of this as bringing in the blueprints for the entire house
import App from './App.jsx'

// ============================================
// LINE 5: Import Statement
// ============================================
// This line imports performance tracking utilities
// 'webVitals' helps measure how fast our website loads
// It's like a speedometer for our website
// We'll use these to track performance and make improvements
import { initWebVitals, markPerformance } from './utils/webVitals'

// ============================================
// LINE 8: Mark Application Start
// ============================================
// This line marks when our application starts loading
// Think of it like pressing a stopwatch at the start of a race
// This helps us measure how long it takes for our app to load
markPerformance('app-start');

// ============================================
// LINE 10-12: Conditional Web Vitals Initialization
// ============================================
// This code only runs when we're in production (when the website is live)
// 'import.meta.env.PROD' checks if we're in production mode
// 'initWebVitals()' starts tracking website performance
// Think of this like turning on security cameras when the store opens
// We only do this in production, not while we're developing
if (import.meta.env.PROD) {
  initWebVitals();
}

// ============================================
// LINE 14-20: Create and Render the App
// ============================================
// This is where the magic happens! Let's break it down:

// LINE 14: document.getElementById('root')
// This finds a special element in our HTML file with the ID 'root'
// The HTML file has a line like: <div id="root"></div>
// Think of this as finding the empty plot of land where we'll build our house

// LINE 14: createRoot(...)
// This function prepares the 'root' element to hold our React app
// Think of it like preparing the foundation before building

// LINE 14: .render(...)
// This function actually shows our app on the screen
// Think of it like finally building the house and turning on the lights

// LINE 15: <StrictMode>
// This wraps our app in StrictMode (the safety inspector from line 1)
// It helps catch potential problems during development
// Think of it like having a building inspector check the construction

// LINE 16: <App />
// This is our main App component being rendered
// The '/' at the end indicates this is a self-closing tag
// Think of this as the completed house structure

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// ============================================
// LINE 22: Mark App Rendered
// ============================================
// This line marks when our app has finished rendering
// Think of it like stopping the stopwatch when the house is built
// We can now calculate how long it took to load the entire app
markPerformance('app-rendered');

/**
 * ============================================
 * SUMMARY OF WHAT THIS FILE DOES:
 * ============================================
 * 
 * 1. IMPORTS (Lines 1-5):
 *    - Brings in all the tools and materials we need
 *    - React features, browser utilities, CSS, and our main app
 * 
 * 2. PERFORMANCE TRACKING (Lines 8, 10-12, 22):
 *    - Marks when the app starts loading
 *    - Sets up performance tracking (in production only)
 *    - Marks when the app finishes loading
 * 
 * 3. RENDERING (Lines 14-20):
 *    - Finds the 'root' element in the HTML
 *    - Prepares it to hold our React app
 *    - Actually renders the App component on the screen
 * 
 * ============================================
 * REAL-WORLD ANALOGY:
 * ============================================
 * 
 * Building a House:
 * 
 * 1. IMPORTS = Gathering materials and tools
 *    - Lumber, nails, hammers, blueprints
 * 
 * 2. PERFORMANCE TRACKING = Construction timeline
 *    - Marking when construction starts
 *    - Tracking progress
 *    - Recording when it's finished
 * 
 * 3. RENDERING = Building the house
 *    - Finding the plot of land (getElementById)
 *    - Preparing the foundation (createRoot)
 *    - Building the structure (render)
 *    - Inspecting the work (StrictMode)
 * 
 * ============================================
 * HOW TO USE THIS FILE:
 * ============================================
 * 
 * You typically don't need to change this file!
 * It's automatically created when you set up a React project.
 * Most of your work will be in other files like:
 * - App.jsx (main structure)
 * - Components (reusable pieces)
 * - Pages (different sections of the website)
 * 
 * ============================================
 * COMMON QUESTIONS:
 * ============================================
 * 
 * Q: Why do we need this file?
 * A: Every React app needs an entry point. This is where it starts.
 * 
 * Q: Can I delete StrictMode?
 * A: Yes, but it's recommended to keep it for development.
 * 
 * Q: What happens if I change the 'root' ID?
 * A: You must also change it in your index.html file.
 * 
 * Q: Why is there a './' before some imports?
 * A: './' means the file is in the same folder. No './' means it's a library.
 * 
 * ============================================
 */
