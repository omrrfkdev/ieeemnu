/**
 * ============================================
 * ANNOTATED CODE: ThemeContext.jsx
 * ============================================
 * This file manages the theme (light/dark mode) for the website.
 * Think of this as the lighting system controller for a house.
 * It remembers the user's preference and applies it everywhere.
 * ============================================
 */

// ============================================
// LINES 1-4: Import React Hooks
// ============================================
// These lines import special tools from React

// LINE 1: import { createContext, useContext, useEffect, useState } from 'react';
// This imports four React hooks (special functions):
// - createContext: Creates a context (shared data) for components
// - useContext: Accesses context data from components
// - useEffect: Runs code when something changes
// - useState: Manages component state (data that can change)
// Think of these as different tools for managing data and side effects
import { createContext, useContext, useEffect, useState } from 'react';

// ============================================
// LINE 6: Create Theme Context
// ============================================
// This line creates the ThemeContext object
// Context is a way to share data across the entire component tree
// Think of it like a public announcement system that all rooms can hear
const ThemeContext = createContext();

/**
 * ============================================
 * LINES 9-11: Documentation Comment
 * ============================================
 * This is a JSDoc comment that explains the ThemeProvider component
 * 
 * @param {Object} props - Component props (properties passed to component)
 * @param {React.ReactNode} props.children - Child components (components inside this one)
 * @returns {JSX.Element} Theme provider wrapper
 */
/**
 * Theme Provider Component
 * Wraps the application to provide theme context to all children
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Theme provider wrapper
 */

// ============================================
// LINE 15: Define ThemeProvider Component
// ============================================
// This line defines the ThemeProvider component as a function
// It wraps the entire application and provides theme context
// Think of it like the main lighting controller for the whole house
export const ThemeProvider = ({ children }) => {
  
  // ============================================
  // LINES 16-25: Initialize Theme State
  // ============================================
  // This creates the theme state using useState
  // useState returns an array with two values: [currentValue, functionToUpdateValue]
  
  const [theme, setTheme] = useState(() => {
    // ============================================
    // LINE 18: Check localStorage for saved theme
    // ============================================
    // This checks if the user has saved a theme preference before
    // localStorage is a browser feature that stores data permanently
    // Think of it like a notebook where you write things down for later
    const savedTheme = localStorage.getItem('ieee-theme');
    
    // ============================================
    // LINES 19-21: Check system preference if no saved theme
    // ============================================
    // If there's no saved theme, check the user's system preference
    // 'window.matchMedia' checks the user's computer settings
    // '(prefers-color-scheme: dark)' checks if they prefer dark mode
    // Think of it like asking the user's computer what they prefer
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // ============================================
    // LINE 23: Return saved theme
    // ============================================
    // If there's a saved theme, use that
    // Think of it like using the user's saved preference
    return savedTheme;
  });

  // ============================================
  // LINES 27-34: Apply Theme Effect
  // ============================================
  // This useEffect runs whenever the theme changes
  // It applies the theme to the document and saves it to localStorage
  
  useEffect(() => {
    // ============================================
    // LINE 29: Get document root element
    // ============================================
    // This gets the root element of the HTML document
    // The root element is the <html> tag
    // Think of it like the main foundation of the house
    const root = window.document.documentElement;
    
    // ============================================
    // LINE 30: Remove existing theme classes
    // ============================================
    // This removes both 'light' and 'dark' classes from the root
    // This ensures we only have one theme class at a time
    // Think of it like clearing the paint before applying new paint
    root.classList.remove('light', 'dark');
    
    // ============================================
    // LINE 31: Add current theme class
    // ============================================
    // This adds the current theme class ('light' or 'dark') to the root
    // Tailwind CSS uses this class to apply dark mode styles
    // Think of it like painting the house with the chosen color
    root.classList.add(theme);
    
    // ============================================
    // LINE 33: Save theme preference to localStorage
    // ============================================
    // This saves the current theme to localStorage
    // The user's preference will be remembered next time they visit
    // Think of it like writing down the preference for next time
    localStorage.setItem('ieee-theme', theme);
  }, [theme]); // This array says: run this effect when 'theme' changes

  /**
   * ============================================
   * LINES 37-39: Toggle Theme Function
   * ============================================
   * This function switches between light and dark theme
   * It's like flipping a light switch
   */
  const toggleTheme = () => {
    // ============================================
    // LINE 38: Switch to opposite theme
    // ============================================
    // This uses the previous theme to determine the new theme
    // If it was 'light', it becomes 'dark'
    // If it was 'dark', it becomes 'light'
    // Think of it like flipping a switch from on to off
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // ============================================
  // LINES 41-45: Create Context Value
  // ============================================
  // This creates the value that will be shared with all components
  // It includes the theme, the toggle function, and a convenience property
  
  const value = {
    // ============================================
    // LINE 42: Current theme ('light' or 'dark')
    // ============================================
    theme,
    
    // ============================================
    // LINE 43: Function to toggle theme
    // ============================================
    toggleTheme,
    
    // ============================================
    // LINE 44: Convenience property (true if dark mode)
    // ============================================
    // This is a shortcut to check if we're in dark mode
    // It's easier to use 'isDark' than 'theme === "dark"'
    // Think of it like a labeled button instead of just "switch 1"
    isDark: theme === 'dark',
  };

  // ============================================
  // LINES 47-49: Render Theme Provider
  // ============================================
  // This returns the ThemeContext.Provider component
  // It wraps the children and provides them with the theme context
  
  return (
    // ============================================
    // LINE 48: Theme Context Provider
    // ============================================
    // This is the provider that shares the theme with all children
    // The 'value' prop is what gets shared
    // Think of it like a broadcasting system that sends the theme to all rooms
    <ThemeContext.Provider value={value}>
      
      {/* ============================================
          LINE 49: Render children
          ============================================
          This renders all the child components
          These children can now access the theme context
          Think of it like all the rooms in the house that can use the lighting
      */}
      {children}
      
    {/* ============================================
        LINE 50: Close Provider
        ============================================
        This closes the ThemeContext.Provider
        We've wrapped all children with theme context
        Think of it like finishing the lighting system installation
    */}
    </ThemeContext.Provider>
  );
};

/**
 * ============================================
 * LINES 54-60: Documentation Comment
 * ============================================
 * This is a JSDoc comment that explains the useTheme hook
 * 
 * @returns {Object} Theme context value with theme state and toggle function
 * @throws {Error} If used outside of ThemeProvider
 */
/**
 * Custom hook to use theme context
 * Must be used within ThemeProvider
 * 
 * @returns {Object} Theme context value with theme state and toggle function
 * @throws {Error} If used outside of ThemeProvider
 */

// ============================================
// LINE 63: Define useTheme Hook
// ============================================
// This creates a custom hook to easily access the theme context
// Hooks are functions that let you use React features in components
// Think of it like a shortcut to access the theme without all the setup
export const useTheme = () => {
  
  // ============================================
  // LINE 65: Access theme context
  // ============================================
  // This uses the useContext hook to access the ThemeContext
  // It returns the value we provided to the ThemeContext.Provider
  // Think of it like tuning into the theme announcement system
  const context = useContext(ThemeContext);
  
  // ============================================
  // LINES 66-68: Error checking
  // ============================================
  // This checks if the context is being used correctly
  // If the context is undefined, it means useTheme was used outside ThemeProvider
  
  if (context === undefined) {
    // ============================================
    // LINE 67: Throw error if used outside provider
    // ============================================
    // This throws an error with a helpful message
    // It helps developers fix the mistake
    // Think of it like an error message saying "You need to be in the house to use the lights"
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  // ============================================
  // LINE 70: Return context
  // ============================================
  // This returns the theme context value
  // Components can now use theme, toggleTheme, and isDark
  // Think of it like giving the user access to the lighting controls
  return context;
};

/**
 * ============================================
 * SUMMARY OF WHAT THIS FILE DOES:
 * ============================================
 * 
 * 1. IMPORTS (Line 1):
 *    - Brings in React hooks for managing state and effects
 * 
 * 2. THEME CONTEXT (Line 6):
 *    - Creates a context for sharing theme data
 * 
 * 3. THEME PROVIDER (Lines 15-51):
 *    - Manages theme state
 *    - Checks localStorage for saved preference
 *    - Checks system preference if no saved preference
 *    - Applies theme to document
 *    - Saves preference to localStorage
 *    - Provides theme context to all children
 * 
 * 4. TOGGLE THEME (Lines 37-39):
 *    - Switches between light and dark mode
 * 
 * 5. USE THEME HOOK (Lines 63-71):
 *    - Custom hook for accessing theme context
 *    - Ensures it's used within ThemeProvider
 * 
 * ============================================
 * REAL-WORLD ANALOGY:
 * ============================================
 * 
 * House Lighting System:
 * 
 * 1. THEME CONTEXT = The electrical wiring
 *    - Connects all rooms to the power source
 * 
 * 2. THEME PROVIDER = The main circuit breaker
 *    - Controls power to the whole house
 *    - Remembers the on/off setting
 * 
 * 3. THEME STATE = Current light setting
 *    - Is the light on or off?
 * 
 * 4. LOCALSTORAGE = Written notes
 *    - Remember the light setting for next time
 * 
 * 5. TOGGLE THEME = The light switch
 *    - Flips between on and off
 * 
 * 6. USE THEME = Remote control
 *    - Lets any room control the lights
 * 
 * ============================================
 * HOW TO USE THEME CONTEXT:
 * ============================================
 * 
 * 1. Wrap your app with ThemeProvider:
 *    <ThemeProvider>
 *      <App />
 *    </ThemeProvider>
 * 
 * 2. Use theme in a component:
 *    const { theme, toggleTheme, isDark } = useTheme();
 * 
 * 3. Toggle the theme:
 *    <button onClick={toggleTheme}>
 *      Toggle Theme
 *    </button>
 * 
 * 4. Check current theme:
 *    if (isDark) {
 *      // Dark mode styles
 *    } else {
 *      // Light mode styles
 *    }
 * 
 * ============================================
 * HOW THEME PERSISTENCE WORKS:
 * ============================================
 * 
 * First Visit:
 * 1. Check localStorage → No saved theme
 * 2. Check system preference → Dark
 * 3. Set theme to 'dark'
 * 4. Apply 'dark' class to document
 * 5. Save 'dark' to localStorage
 * 
 * Second Visit:
 * 1. Check localStorage → 'dark'
 * 2. Set theme to 'dark'
 * 3. Apply 'dark' class to document
 * 4. (Already saved in localStorage)
 * 
 * ============================================
 * HOW THEME TOGGLE WORKS:
 * ============================================
 * 
 * User clicks "Toggle Theme" button:
 * 
// In component:
// const { toggleTheme } = useTheme();
// <button onClick={toggleTheme}>Toggle</button>
// 
// This calls toggleTheme()
// → setTheme runs with previous theme
// → If previous was 'light', new is 'dark'
// → If previous was 'dark', new is 'light'
// → useEffect detects theme change
// → Removes old theme class
// → Adds new theme class
// → Saves new theme to localStorage
// → All components re-render with new theme
// 
// ============================================
 * LOCALSTORAGE EXPLAINED:
 * ============================================
 * 
// localStorage is a browser API for storing data:
// 
// Set item:
// localStorage.setItem('key', 'value');
// localStorage.setItem('ieee-theme', 'dark');
// 
// Get item:
// const value = localStorage.getItem('key');
// const theme = localStorage.getItem('ieee-theme');
// 
// Remove item:
// localStorage.removeItem('key');
// 
// Clear all:
// localStorage.clear();
// 
// Data persists even after browser is closed
// Data is specific to the website domain
// Can store up to ~5MB of data
// 
// ============================================
 * REACT HOOKS EXPLAINED:
 * ============================================
 * 
// useState:
// - Manages component state (data that can change)
// - Returns [currentValue, functionToUpdateValue]
// - Example: const [count, setCount] = useState(0);
// 
// useEffect:
// - Runs side effects (code that shouldn't be in render)
// - Runs after render completes
// - Can run when specific values change
// - Example: useEffect(() => { console.log('Effect'); }, [value]);
// 
// useContext:
// - Accesses context data from a provider
// - Must be used within a provider
// - Example: const { theme } = useContext(ThemeContext);
// 
// ============================================
 * HOW THEME AFFECTS STYLES:
 * ============================================
 * 
// Tailwind CSS uses the 'dark' class to apply dark mode styles:
// 
// Light mode:
// <body class="bg-white text-black">
// 
// Dark mode:
// <body class="dark:bg-gray-900 dark:text-white">
// 
// When 'dark' class is present:
// - dark:bg-gray-900 applies (dark background)
// - dark:text-white applies (light text)
// 
// When 'dark' class is not present:
// - bg-white applies (light background)
// - text-black applies (dark text)
// 
// ============================================
 * COMMON QUESTIONS:
 * ============================================
 * 
// Q: Why do we need a theme provider?
// A: To share the theme across the entire app without prop drilling.
// 
// Q: What is prop drilling?
// A: Passing props through many levels of components unnecessarily.
// 
// Q: What happens if I use useTheme outside ThemeProvider?
// A: You get an error: "useTheme must be used within a ThemeProvider"
// 
// Q: Can I have multiple theme providers?
// A: Yes, but typically you only need one at the root.
// 
// Q: Why use localStorage?
// A: To remember the user's preference across page reloads.
// 
// Q: What if localStorage is disabled?
// A: The code will still work, but won't remember preferences.
// 
// Q: Can I add more than two themes?
// A: Yes, you could add 'light', 'dark', and 'auto' for example.
// 
// ============================================
 */
