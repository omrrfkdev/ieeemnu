/**
 * ============================================
 * ANNOTATED CODE: App.jsx
 * ============================================
 * This is the main application component.
 * Think of this as the main floor plan of a house.
 * It defines the structure and routing of the entire website.
 * ============================================
 */

// ============================================
// LINES 1-2: Import React Features
// ============================================
// These lines import special features from React

// LINE 1: Import 'lazy' function
// 'lazy' helps us load parts of our website only when needed
// This makes the website load faster initially
// Think of it like only bringing furniture into a room when you enter it
import { lazy, Suspense } from 'react';

// ============================================
// LINE 3: Import Routing Features
// ============================================
// This line imports tools for navigating between pages

// LINE 3: BrowserRouter as Router
// This manages the website's navigation
// 'BrowserRouter' is the actual tool, we're calling it 'Router' for simplicity
// Think of it like a GPS system that guides users to different pages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ============================================
// LINE 4: Import Theme Provider
// ============================================
// This line imports the theme management system
// It handles light/dark mode switching
// Think of it like a light switch that works across the whole house
import { ThemeProvider } from './context/ThemeContext';

// ============================================
// LINE 5: Import Scroll to Top
// ============================================
// This line imports a component that scrolls to the top of the page
// It automatically scrolls up when navigating between pages
// Think of it like an elevator that always goes to the top floor first
import ScrollToTop from './components/common/ScrollToTop';

// ============================================
// LINE 6: Import Layout Component
// ============================================
// This line imports the main layout component
// It includes the header, footer, and main content area
// Think of it like the walls and roof that form the basic structure
import Layout from './components/layout/Layout';

// ============================================
// LINE 7: Import Page Loader
// ============================================
// This line imports a loading screen component
// It shows while pages are loading
// Think of it like a "Please Wait" sign that appears during construction
import PageLoader from './components/common/PageLoader';

// ============================================
// LINES 10-21: Lazy Load All Pages
// ============================================
// These lines import all the pages of our website using 'lazy'
// Lazy loading means pages only load when a user visits them
// This makes the initial load much faster
// Think of it like only unpacking boxes when you need what's inside

// LINE 10: Home page
// This is the main landing page of the website
// It loads immediately when users visit the site
const Home = lazy(() => import('./pages/Home'));

// LINE 11: About page
// This page tells visitors about the organization
// It loads only when users click the "About" link
const About = lazy(() => import('./pages/About'));

// LINE 12: Events page
// This page shows upcoming events
// It loads only when users click the "Events" link
const Events = lazy(() => import('./pages/Events'));

// LINE 13: Projects page
// This page showcases completed projects
// It loads only when users click the "Projects" link
const Projects = lazy(() => import('./pages/Projects'));

// LINE 14: Team page
// This page shows team members
// It loads only when users click the "Team" link
const Team = lazy(() => import('./pages/Team'));

// LINE 15: Board page
// This page shows the board members
// It loads only when users click the "Board" link
const Board = lazy(() => import('./pages/Board'));

// LINE 16: Committees page
// This page shows different committees
// It loads only when users click the "Committees" link
const Committees = lazy(() => import('./pages/Committees'));

// LINE 17: Membership page
// This page explains membership benefits
// It loads only when users click the "Membership" link
const Membership = lazy(() => import('./pages/Membership'));

// LINE 18: Registration page
// This page allows users to register
// It loads only when users click the "Registration" link
const Registration = lazy(() => import('./pages/Registration'));

// LINE 19: Event Details page
// This page shows details about a specific event
// It loads when users click on an event
// The ':id' means it can show any event by ID
const EventDetails = lazy(() => import('./pages/EventDetails'));

// LINE 20: Event Registration page
// This page allows users to register for a specific event
// It loads when users click the "Register" button for an event
const EventRegistration = lazy(() => import('./pages/EventRegistration'));

// LINE 21: 404 Not Found page
// This page shows when users visit a URL that doesn't exist
// It loads when no other route matches
// Think of it like a "Wrong Way" sign
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * ============================================
 * LINES 24-26: Documentation Comment
 * ============================================
 * This is a JSDoc comment that explains what the App component does
 * 
 * @returns {JSX.Element} - This component returns JSX (React's HTML-like code)
 */
/**
 * Main application component
 * Provides routing and theme context to all child components
 * 
 * @returns {JSX.Element} Application root
 */

// ============================================
// LINE 29: Define App Component
// ============================================
// This line defines the App component as a function
// Function components are the modern way to write React components
// Think of it like defining a recipe that we can use over and over
function App() {
  // ============================================
  // LINES 31-58: Return Statement
  // ============================================
  // This return statement defines what the App component looks like
  // Everything inside the parentheses will be displayed on the screen
  // Think of it like the final assembled meal from the recipe

  return (
    // ============================================
    // LINE 32: Theme Provider Wrapper
    // ============================================
    // This wraps our entire app in the ThemeProvider
    // Every component inside can access the theme (light/dark mode)
    // Think of it like putting a roof over the whole house
    <ThemeProvider>
      
      {/* ============================================
          LINE 33: Router Wrapper
          ============================================
          This wraps our app in the Router
          It enables navigation between different pages
          Think of it like installing a navigation system in the house
      */}
      <Router>
        
        {/* ============================================
            LINE 34: Scroll to Top Component
            ============================================
            This automatically scrolls to the top when changing pages
            It's a self-closing component (no children)
            Think of it like an automatic elevator reset button
        */}
        <ScrollToTop />
        
        {/* ============================================
            LINE 35: Suspense Wrapper
            ============================================
            This wraps our lazy-loaded pages
            It shows a loading screen while pages are loading
            The 'fallback' prop specifies what to show while loading
            Think of it like a waiting room that appears during construction
        */}
        <Suspense fallback={<PageLoader title="Loading..." />}>
          
          {/* ============================================
              LINE 36: Routes Component
              ============================================
              This defines all the possible routes (URL paths) in our app
              Each Route is like a door that leads to a different room
              Think of it like a map of all the rooms in the house
          */}
          <Routes>
            
            {/* ============================================
                LINE 37: Main Layout Route
                ============================================
                This is a special route that wraps all other routes
                It applies the Layout component (header, footer, etc.) to all pages
                The '/' means this route matches the root URL
                Think of it like the hallway that connects all rooms
            */}
            <Route path="/" element={<Layout />}>
              
              {/* ============================================
                  LINE 39: Home Route
                  ============================================
                  This route shows the Home page
                  The 'index' prop means it's the default page for the parent route
                  Think of it like the main living room you see first
              */}
              <Route index element={<Home />} />
              
              {/* ============================================
                  LINE 41: About Route
                  ============================================
                  This route shows the About page
                  The path "about" means it shows at /about
                  Think of it like the About room in the house
              */}
              <Route path="about" element={<About />} />
              
              {/* ============================================
                  LINE 43: Events Route
                  ============================================
                  This route shows the Events page
                  The path "events" means it shows at /events
                  Think of it like the Events room in the house
              */}
              <Route path="events" element={<Events />} />
              
              {/* ============================================
                  LINE 45: Event Details Route
                  ============================================
                  This route shows details for a specific event
                  The path "events/:id" uses a parameter (:id) to match any event
                  Example: /events/1 would show event with ID 1
                  Think of it like a specific event display case
              */}
              <Route path="events/:id" element={<EventDetails />} />
              
              {/* ============================================
                  LINE 47: Event Registration Route
                  ============================================
                  This route allows registration for a specific event
                  The path "events/:id/registration" is a nested route
                  Example: /events/1/registration would register for event 1
                  Think of it like the registration desk for an event
              */}
              <Route path="events/:id/registration" element={<EventRegistration />} />
              
              {/* ============================================
                  LINE 49: Projects Route
                  ============================================
                  This route shows the Projects page
                  The path "projects" means it shows at /projects
                  Think of it like the Projects room in the house
              */}
              <Route path="projects" element={<Projects />} />
              
              {/* ============================================
                  LINE 51: Team Route
                  ============================================
                  This route shows the Team page
                  The path "team" means it shows at /team
                  Think of it like the Team room in the house
              */}
              <Route path="team" element={<Team />} />
              
              {/* ============================================
                  LINE 53: Board Route
                  ============================================
                  This route shows the Board page
                  The path "board" means it shows at /board
                  Think of it like the Board room in the house
              */}
              <Route path="board" element={<Board />} />
              
              {/* ============================================
                  LINE 55: Committees Route
                  ============================================
                  This route shows the Committees page
                  The path "committees" means it shows at /committees
                  Think of it like the Committees room in the house
              */}
              <Route path="committees" element={<Committees />} />
              
              {/* ============================================
                  LINE 57: Membership Route
                  ============================================
                  This route shows the Membership page
                  The path "membership" means it shows at /membership
                  Think of it like the Membership room in the house
              */}
              <Route path="membership" element={<Membership />} />
              
              {/* ============================================
                  LINE 59: Registration Route
                  ============================================
                  This route shows the Registration page
                  The path "registration" means it shows at /registration
                  Think of it like the Registration room in the house
              */}
              <Route path="registration" element={<Registration />} />
              
              {/* ============================================
                  LINE 61: Commented Out Contact Route
                  ============================================
                  This route is commented out (not active)
                  It would show a Contact page if uncommented
                  Think of it like a room that's under construction
              */}
              {/* <Route path="contact" element={<Contact />} /> */}
              
              {/* ============================================
                  LINE 63: 404 Not Found Route
                  ============================================
                  This route matches any URL that doesn't match the others
                  The '*' is a wildcard that matches anything
                  It shows the NotFound page for unknown URLs
                  Think of it like a "You're Lost" sign
              */}
              <Route path="*" element={<NotFound />} />
              
            {/* ============================================
                LINE 65: Close Layout Route
                ============================================
                This closes the Layout route wrapper
                All the routes inside now share the same Layout
                Think of it like closing the hallway that connects all rooms
            */}
            </Route>
            
          {/* ============================================
              LINE 67: Close Routes
              ============================================
              This closes the Routes component
              We've defined all possible routes in our app
              Think of it like completing the map of all rooms
          */}
          </Routes>
        
        {/* ============================================
            LINE 69: Close Suspense
            ============================================
            This closes the Suspense wrapper
            All lazy-loaded pages are now covered
            Think of it like finishing the waiting room setup
        */}
        </Suspense>
      
      {/* ============================================
          LINE 71: Close Router
          ============================================
          This closes the Router wrapper
          Navigation is now set up for the entire app
          Think of it like finishing the navigation system installation
      */}
      </Router>
    
    {/* ============================================
        LINE 73: Close Theme Provider
        ============================================
        This closes the ThemeProvider wrapper
        Theme context is now available to all components
        Think of it like completing the roof over the whole house
    */}
    </ThemeProvider>
  );
}

// ============================================
// LINE 77: Export App Component
// ============================================
// This makes the App component available for other files to import
// Without this, other files couldn't use our App component
// Think of it like publishing our recipe so others can use it
export default App;

/**
 * ============================================
 * SUMMARY OF WHAT THIS FILE DOES:
 * ============================================
 * 
 * 1. IMPORTS (Lines 1-7, 10-21):
 *    - Brings in React features and libraries
 *    - Imports all pages using lazy loading
 *    - Sets up routing and theme management
 * 
 * 2. APP COMPONENT (Lines 29-75):
 *    - Wraps everything in ThemeProvider (for theme)
 *    - Wraps everything in Router (for navigation)
 *    - Defines all routes (URL paths) for the website
 *    - Uses lazy loading for better performance
 * 
 * 3. ROUTING STRUCTURE (Lines 36-67):
 *    - Main route with Layout wrapper
 *    - Individual routes for each page
 *    - Special routes with parameters (:id)
 *    - 404 route for unknown URLs
 * 
 * ============================================
 * REAL-WORLD ANALOGY:
 * ============================================
 * 
 * Building a House:
 * 
 * 1. IMPORTS = Gathering materials and blueprints
 *    - Wood, nails, hammers, floor plans
 * 
 * 2. LAZY LOADING = Unpacking as needed
 *    - Only bring furniture when you enter a room
 *    - Saves time and effort
 * 
 * 3. THEME PROVIDER = Roof over the house
 *    - Covers everything with consistent theme
 * 
 * 4. ROUTER = Navigation system
 *    - Maps that guide people to different rooms
 * 
 * 5. ROUTES = Individual rooms
 *    - Each route is like a different room
 *    - Some have special features (parameters)
 * 
 * 6. SUSPENSE = Waiting room
 *    - Shows while rooms are being prepared
 * 
 * ============================================
 * HOW ROUTING WORKS:
 * ============================================
 * 
 * URL → Router → Route → Component → Page
 * │      │        │          │          │
 * │      │        │          │          └─ What user sees
 * │      │        │          └─ The page component
 * │      │        └─ Matches URL to correct route
 * │      └─ Finds the matching route
 * └─ What user types in browser
 * 
 * Examples:
 * / → Home page
 * /about → About page
 * /events → Events page
 * /events/1 → Event 1 details
 * /unknown → 404 Not Found page
 * 
 * ============================================
 * PERFORMANCE BENEFITS:
 * ============================================
 * 
 * Without Lazy Loading:
 * - User loads entire website at once
 * - Takes a long time initially
 * - Wastes bandwidth on unused pages
 * 
 * With Lazy Loading:
 * - User loads only the Home page initially
 * - Fast initial load time
 * - Other pages load when needed
 * - Better user experience
 * 
 * ============================================
 * HOW TO ADD A NEW PAGE:
 * ============================================
 * 
 * 1. Create the page component (e.g., Contact.jsx)
 * 2. Import it with lazy loading:
 *    const Contact = lazy(() => import('./pages/Contact'));
 * 3. Add a route in the Routes section:
 *    <Route path="contact" element={<Contact />} />
 * 4. Add a navigation link in the Header
 * 
 * ============================================
 * COMMON QUESTIONS:
 * ============================================
 * 
 * Q: Why do we use lazy loading?
 * A: It makes the website load faster by only loading what's needed.
 * 
 * Q: What's the difference between path and element?
 * A: path is the URL, element is what shows on the page.
 * 
 * Q: What does the '*' in the 404 route mean?
 * A: It's a wildcard that matches any URL not matched by other routes.
 * 
 * Q: Can I have routes with the same path?
 * A: No, routes must have unique paths.
 * 
 * Q: What's the difference between '/' and '*'?
 * A: '/' matches exactly the root, '*' matches anything.
 * 
 * ============================================
 */
