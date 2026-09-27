/**
 * ============================================
 * ANNOTATED CODE: Layout.jsx
 * ============================================
 * This is the layout component for the website.
 * Think of this as the frame of a house - it provides the basic structure.
 * It includes the header, footer, and main content area for all pages.
 * ============================================
 */

// ============================================
// LINES 1-3: Import Statement
// ============================================
// This line imports the 'Outlet' component from React Router

// LINE 1: import { Outlet } from 'react-router-dom'
// 'Outlet' is a special component that shows the current page
// It's like a placeholder that displays whatever page is currently active
// Think of it like a TV screen that changes shows depending on the channel
import { Outlet } from 'react-router-dom';

// ============================================
// LINE 2: Import Header Component
// ============================================
// This line imports the Header component
// The Header contains the navigation menu and logo
// Think of it like the sign above a store entrance
import Header from './Header';

// ============================================
// LINE 3: Import Footer Component
// ============================================
// This line imports the Footer component
// The Footer contains links, contact info, and copyright
// Think of it like the information at the bottom of a document
import Footer from './Footer';

// ============================================
// LINE 4: Import Skip to Content Component
// ============================================
// This line imports the Skip to Content component
// This helps users who use keyboard navigation jump to the main content
// Think of it like a shortcut that takes you directly to the main content
import SkipToContent from '../common/SkipToContent';

/**
 * ============================================
 * LINES 7-12: Documentation Comment
 * ============================================
 * This is a JSDoc comment that explains what the Layout component does
 * 
 * @returns {JSX.Element} - This component returns JSX (React's HTML-like code)
 */
/**
 * Layout component that wraps all pages
 * Provides consistent header and footer across the application
 * 
 * @returns {JSX.Element} Layout component
 */

// ============================================
// LINE 15: Define Layout Component
// ============================================
// This line defines the Layout component as a function
// Notice it uses 'const' instead of 'function' - this is an arrow function
// It's a more modern, concise way to write functions
// Think of it like defining a template that we can use over and over
const Layout = () => {
  
  // ============================================
  // LINES 17-27: Return Statement
  // ============================================
  // This return statement defines what the Layout component looks like
  // Everything inside the parentheses will be displayed on the screen
  // Think of it like the final assembled structure from the blueprint

  return (
    // ============================================
    // LINE 18: Main Container Div
    // ============================================
    // This is the main container for the entire page
    // Let's break down all the classes:
    //
    // 'min-h-screen' = Minimum height of screen (at least as tall as the viewport)
    // 'flex' = Enable Flexbox layout (flexible layout system)
    // 'flex-col' = Flexbox with column direction (items stack vertically)
    // 'bg-gray-50' = Light gray background color
    // 'dark:bg-gray-900' = Dark gray background in dark mode
    // 'transition-colors' = Smooth transition when colors change
    // 'duration-300' = Transition takes 300 milliseconds
    //
    // Think of this as the outer walls of the house with paint and weatherstripping
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* ============================================
          LINE 19: Skip to Content Component
          ============================================
          This is the Skip to Content button
          It's invisible until focused (for keyboard users)
          It helps users skip navigation and go straight to main content
          Think of it like a VIP entrance that bypasses the line
      */}
      <SkipToContent />
      
      {/* ============================================
          LINE 20: Header Component
          ============================================
          This displays the header (navigation menu, logo)
          It's the same on every page of the website
          Think of it like the sign and main entrance of a store
      */}
      <Header />
      
      {/* ============================================
          LINE 21: Main Content Area
          ============================================
          This is where the page content goes
          Let's break down the attributes:
          //
          // 'id="main-content"' = Gives this element an ID for targeting
          // 'className="flex-1 pt-16 md:pt-20"' = Styling classes
          //   - 'flex-1' = Takes up all available space (fills remaining height)
          //   - 'pt-16' = Padding top of 16 units (on small screens)
          //   - 'md:pt-20' = Padding top of 20 units on medium+ screens
          // 'tabIndex={-1}' = Removes from tab order (except when targeted by skip link)
          //
          // Think of this as the main living area of the house
          // The 'Outlet' component inside is like a TV that changes shows
      */}
      <main id="main-content" className="flex-1 pt-16 md:pt-20" tabIndex={-1}>
        
        {/* ============================================
            LINE 22: Outlet Component
            ============================================
            This is where the current page gets displayed
            React Router automatically replaces this with the current route's component
            Example: If user is at /about, this shows the About component
            Think of it like a placeholder that gets filled with different content
            Think of it like a TV screen that shows different channels
        */}
        <Outlet />
        
      {/* ============================================
          LINE 24: Close Main Element
          ============================================
          This closes the <main> element
          We've defined the main content area
          Think of it like finishing the main living room setup
      */}
      </main>
      
      {/* ============================================
          LINE 25: Footer Component
          ============================================
          This displays the footer (links, contact info, copyright)
          It's the same on every page of the website
          Think of it like the basement foundation or the bottom of a document
      */}
      <Footer />
      
    {/* ============================================
        LINE 27: Close Main Container Div
        ============================================
        This closes the main container div
        We've completed the layout structure
        Think of it like finishing the outer walls of the house
    */}
    </div>
  );
};

// ============================================
// LINE 31: Export Layout Component
// ============================================
// This makes the Layout component available for other files to import
// Without this, other files couldn't use our Layout component
// Think of it like publishing our blueprint so others can use it
export default Layout;

/**
 * ============================================
 * SUMMARY OF WHAT THIS FILE DOES:
 * ============================================
 * 
 * 1. IMPORTS (Lines 1-4):
 *    - Brings in necessary components from other files
 *    - Outlet for displaying current page
 *    - Header for top navigation
 *    - Footer for bottom information
 *    - SkipToContent for accessibility
 * 
 * 2. LAYOUT COMPONENT (Lines 15-29):
 *    - Creates a vertical layout structure
 *    - Positions header at the top
 *    - Positions footer at the bottom
 *    - Fills middle with main content
 * 
 * 3. STRUCTURE (Lines 18-27):
 *    - Main container with flexbox layout
 *    - Skip to content button (accessibility)
 *    - Header (top)
 *    - Main content area (middle, flexible)
 *    - Footer (bottom)
 * 
 * ============================================
 * REAL-WORLD ANALOGY:
 * ============================================
 * 
 * Building a House:
 * 
 * 1. LAYOUT COMPONENT = The house structure
 *    - Walls, floors, roof
 * 
 * 2. HEADER = The front of the house
 *    - Address, main door, welcome sign
 * 
 * 3. MAIN CONTENT = The living space
 *    - Rooms that change based on what you're doing
 * 
 * 4. FOOTER = The foundation
 *    - Support structure, contact info
 * 
 * 5. OUTLET = Different furniture arrangements
 *    - Same room, different setup depending on need
 * 
 * 6. SKIP TO CONTENT = VIP entrance
 *    - Bypasses the lobby and goes straight to the main room
 * 
 * ============================================
 * HOW FLEXBOX WORKS:
 * ============================================
 * 
 * 'flex flex-col' creates a vertical flex container:
 * 
 * ┌─────────────────────────┐
 * │      Header            │ ← First item
 * ├─────────────────────────┤
 * │                         │
 * │                         │
 * │     Main Content       │ ← Second item (flex-1 = grows)
 * │     (Outlet)           │
 * │                         │
 * │                         │
 * ├─────────────────────────┤
 │      Footer             │ ← Third item
 * └─────────────────────────┘
 * 
 * 'flex-1' makes the main content take all available space
 * This pushes the footer to the bottom of the screen
 * 
 * ============================================
 * HOW OUTLET WORKS:
 * ============================================
 * 
 * The Outlet component is like a placeholder:
 * 
 * URL: /about
 * → Outlet shows: <About />
 * 
 * URL: /events
 * → Outlet shows: <Events />
 * 
 * URL: /team
 * → Outlet shows: <Team />
 * 
 * The Layout stays the same (header, footer)
 * Only the Outlet content changes
 * 
 * ============================================
 * ACCESSIBILITY FEATURES:
 * ============================================
 * 
 * 1. SKIP TO CONTENT:
 *    - Helps keyboard users skip navigation
 *    - Press Tab to see the "Skip to content" link
 *    - Press Enter to jump to main content
 * 
 * 2. MAIN ELEMENT:
 *    - Semantic HTML element for main content
 *    - Helps screen readers understand page structure
 *    - id="main-content" for targeting
 * 
 * 3. TABINDEX:
 *    - tabIndex={-1} removes from normal tab order
 *    - But still accessible when targeted by skip link
 * 
 * ============================================
 * DARK MODE SUPPORT:
 * ============================================
 * 
 * The layout supports dark mode through Tailwind classes:
 * 
 * 'bg-gray-50' = Light gray background (light mode)
 * 'dark:bg-gray-900' = Dark gray background (dark mode)
 * 
 * The theme is controlled by ThemeContext
 * ThemeContext adds/removes 'dark' class from document
 * Tailwind responds to 'dark' class automatically
 * 
 * ============================================
 * RESPONSIVE DESIGN:
 * ============================================
 * 
 * The layout adapts to different screen sizes:
 * 
 * 'pt-16' = 16 units padding (mobile)
 * 'md:pt-20' = 20 units padding (desktop)
 * 
 * 'md:' prefix means "on medium screens and larger"
 * This gives more spacing on larger screens
 * 
 * ============================================
 * HOW TO MODIFY THE LAYOUT:
 * ============================================
 * 
 * To add something above the header:
 * <div>
 *   <AnnouncementBanner />
 *   <Header />
 *   ...
 * </div>
 * 
 * To add something below the footer:
 * <div>
 *   ...
 *   <Footer />
 *   <CookieBanner />
 * </div>
 * 
 * To change the background color:
 * Change 'bg-gray-50' to another color class
 * 
 * ============================================
 * COMMON QUESTIONS:
 * ============================================
 * 
 * Q: Why do we need a Layout component?
 * A: To provide consistent structure across all pages.
 * 
 * Q: What happens if I remove the Outlet?
 * A: No page content will be displayed.
 * 
 * Q: Can I have multiple Outlets?
 * A: Yes, you can have nested layouts with multiple Outlets.
 * 
 * Q: Why use 'flex-1' on the main element?
 * A: To make it fill all available space and push footer to bottom.
 * 
 * Q: What does 'min-h-screen' do?
 * A: Ensures the page is at least as tall as the screen.
 * 
 * Q: Can I change the padding on the main element?
 * A: Yes, modify 'pt-16 md:pt-20' to different values.
 * 
 * ============================================
 */
