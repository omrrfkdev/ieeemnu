/**
 * ============================================
 * ANNOTATED CODE: Button.jsx
 * ============================================
 * This is a reusable button component for the website.
 * Think of this as a universal remote control - one button can do many things.
 * It can be different colors, sizes, and have icons.
 * It can also render as different elements (button, link, etc.)
 * ============================================
 */

// ============================================
// LINE 1: Import forwardRef
// ============================================
// This line imports 'forwardRef' from React
// forwardRef is a special tool that lets us pass refs (references) to components
// Refs are like direct references to DOM elements (useful for focus, animations, etc.)
// Think of it like a direct line of communication to the button element
import { forwardRef } from 'react';

/**
 * ============================================
 * LINES 4-18: Documentation Comment
 * ============================================
 * This is a JSDoc comment that explains the Button component
 * 
 * @param {Object} props - Component props (properties passed to component)
 * @param {React.ReactNode} props.children - Button content (text or elements inside)
 * @param {string} props.variant - Button style variant (primary, secondary, outline, ghost)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {boolean} props.loading - Whether button is in loading state
 * @param {React.ReactNode} props.leftIcon - Icon to display on the left
 * @param {React.ReactNode} props.rightIcon - Icon to display on the right
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler (function to run when clicked)
 * @param {React.ElementType} props.as - Component to render as (default: 'button')
 * @returns {JSX.Element} Button component
 */
/**
 * Button component with multiple style variants
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button style variant (primary, secondary, outline, ghost)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {boolean} props.loading - Whether button is in loading state
 * @param {React.ReactNode} props.leftIcon - Icon to display on the left
 * @param {React.ReactNode} props.rightIcon - Icon to display on the right
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler
 * @param {React.ElementType} props.as - Component to render as (default: 'button')
 * @returns {JSX.Element} Button component
 */

// ============================================
// LINE 20: Define Button Component
// ============================================
// This defines the Button component using forwardRef
// forwardRef allows the component to receive a ref prop
// The component receives props and ref as parameters
// Think of it like defining a button that can be referenced directly
const Button = forwardRef(({
  // ============================================
  // LINE 21: Children prop
  // ============================================
  // This is the content inside the button tags
  // It can be text, other elements, or a mix
  // Example: <Button>Click me</Button> → children = "Click me"
  children,
  
  // ============================================
  // LINE 22: Variant prop (default: 'primary')
  // ============================================
  // This determines the button's style
  // Options: 'primary', 'secondary', 'outline', 'ghost'
  // Example: <Button variant="secondary">Submit</Button>
  variant = 'primary',
  
  // ============================================
  // LINE 23: Size prop (default: 'md')
  // ============================================
  // This determines the button's size
  // Options: 'sm' (small), 'md' (medium), 'lg' (large)
  // Example: <Button size="lg">Large Button</Button>
  size = 'md',
  
  // ============================================
  // LINE 24: Full width prop (default: false)
  // ============================================
  // This determines if the button takes full width
  // When true, the button stretches to fill its container
  // Example: <Button fullWidth>Full Width</Button>
  fullWidth = false,
  
  // ============================================
  // LINE 25: Disabled prop (default: false)
  // ============================================
  // This determines if the button is disabled
  // Disabled buttons can't be clicked and look different
  // Example: <Button disabled>Can't Click</Button>
  disabled = false,
  
  // ============================================
  // LINE 26: Loading prop (default: false)
  // ============================================
  // This determines if the button is in a loading state
  // Loading buttons show a spinner and can't be clicked
  // Example: <Button loading>Loading...</Button>
  loading = false,
  
  // ============================================
  // LINE 27: Left icon prop
  // ============================================
  // This is an icon to display on the left side of the text
  // It's optional (no icon if not provided)
  // Example: <Button leftIcon={<Icon />}>With Icon</Button>
  leftIcon,
  
  // ============================================
  // LINE 28: Right icon prop
  // ============================================
  // This is an icon to display on the right side of the text
  // It's optional (no icon if not provided)
  // Example: <Button rightIcon={<Arrow />}>Next</Button>
  rightIcon,
  
  // ============================================
  // LINE 29: Class name prop (default: empty string)
  // ============================================
  // This allows adding custom CSS classes
  // Useful for additional styling not covered by variants
  // Example: <Button className="custom-class">Styled</Button>
  className = '',
  
  // ============================================
  // LINE 30: On click prop
  // ============================================
  // This is a function that runs when the button is clicked
  // It's optional (no action if not provided)
  // Example: <Button onClick={() => alert('Clicked!')}>Click</Button>
  onClick,
  
  // ============================================
  // LINE 31: As prop (default: 'button')
  // ============================================
  // This determines what HTML element to render as
  // Can be 'button', 'a' (link), or any other component
  // Useful when you need a link that looks like a button
  // Example: <Button as="a" href="/page">Link Button</Button>
  as: Component = 'button',
  
  // ============================================
  // LINE 32: Type prop (default: 'button')
  // ============================================
  // This sets the HTML type attribute for button elements
  // Common values: 'button', 'submit', 'reset'
  // 'button' = normal button (default)
  // 'submit' = submits a form
  // 'reset' = resets a form
  // Example: <Button type="submit">Submit Form</Button>
  type = 'button',
  
  // ============================================
  // LINE 33: Spread operator for other props
  // ============================================
  // This collects all other props not explicitly listed
  // It allows passing additional HTML attributes
  // Example: id="my-button", data-custom="value", etc.
  ...props
}, ref) => { // This is the ref passed from forwardRef

  // ============================================
  // LINES 36-38: Base Styles
  // ============================================
  // These are the base styles that all buttons have
  // Let's break down each class:
  //
  // 'inline-flex' = Display as inline flex container
  // 'items-center' = Center items vertically
  // 'justify-center' = Center items horizontally
  // 'font-medium' = Medium font weight
  // 'transition-all' = Smooth transition for all properties
  // 'duration-200' = Transition takes 200 milliseconds
  // 'focus:outline-none' = Remove outline on focus (for custom focus styles)
  // 'focus:ring-2' = Add ring (border) on focus, 2px thick
  // 'focus:ring-offset-2' = Add ring offset (space between ring and button)
  // 'disabled:opacity-50' = Reduce opacity to 50% when disabled
  // 'disabled:cursor-not-allowed' = Show "not allowed" cursor when disabled
  //
  // Think of this as the base coat of paint on all buttons
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // ============================================
  // LINES 40-44: Variant Styles
  // ============================================
  // These are the styles for each button variant
  // Each variant has different colors and effects
  
  const variants = {
    // ============================================
    // LINE 41: Primary variant
    // ============================================
    // Main action button with blue color
    // - 'bg-ieee-blue' = IEEE blue background
    // - 'text-white' = White text
    // - 'hover:bg-ieee-blue-dark' = Darker blue on hover
    // - 'focus:ring-ieee-blue' = Blue focus ring
    // - 'dark:bg-ieee-blue-light' = Lighter blue in dark mode
    primary: 'bg-ieee-blue text-white hover:bg-ieee-blue-dark focus:ring-ieee-blue dark:bg-ieee-blue-light',
    
    // ============================================
    // LINE 42: Secondary variant
    // ============================================
    // Secondary action button with teal color
    // - 'bg-accent-teal' = Teal background
    // - 'text-white' = White text
    // - 'hover:bg-accent-teal/90' = 90% opacity teal on hover
    // - 'focus:ring-accent-teal' = Teal focus ring
    secondary: 'bg-accent-teal text-white hover:bg-accent-teal/90 focus:ring-accent-teal',
    
    // ============================================
    // LINE 43: Outline variant
    // ============================================
    // Outline button with blue border
    // - 'border-2' = 2px border
    // - 'border-ieee-blue' = Blue border
    // - 'text-ieee-blue' = Blue text
    // - 'hover:bg-ieee-blue' = Blue background on hover
    // - 'hover:text-white' = White text on hover
    // - 'focus:ring-ieee-blue' = Blue focus ring
    // - 'dark:border-ieee-blue-light' = Lighter blue border in dark mode
    // - 'dark:text-ieee-blue-light' = Lighter blue text in dark mode
    outline: 'border-2 border-ieee-blue text-ieee-blue hover:bg-ieee-blue hover:text-white focus:ring-ieee-blue dark:border-ieee-blue-light dark:text-ieee-blue-light',
    
    // ============================================
    // LINE 44: Ghost variant
    // ============================================
    // Minimal button with transparent background
    // - 'text-ieee-blue' = Blue text
    // - 'hover:bg-ieee-blue/10' = 10% opacity blue background on hover
    // - 'focus:ring-ieee-blue' = Blue focus ring
    // - 'dark:text-ieee-blue-light' = Lighter blue text in dark mode
    ghost: 'text-ieee-blue hover:bg-ieee-blue/10 focus:ring-ieee-blue dark:text-ieee-blue-light',
  };

  // ============================================
  // LINES 46-48: Size Styles
  // ============================================
  // These are the styles for each button size
  // Each size has different padding and text size
  
  const sizes = {
    // ============================================
    // LINE 47: Small size
    // ============================================
    // - 'px-3' = 12px horizontal padding
    // - 'py-1.5' = 6px vertical padding
    // - 'text-sm' = Small text size
    // - 'rounded-md' = Medium border radius
    sm: 'px-3 py-1.5 text-sm rounded-md',
    
    // ============================================
    // LINE 48: Medium size
    // ============================================
    // - 'px-4' = 16px horizontal padding
    // - 'py-2' = 8px vertical padding
    // - 'text-base' = Base (normal) text size
    // - 'rounded-lg' = Large border radius
    md: 'px-4 py-2 text-base rounded-lg',
    
    // ============================================
    // LINE 49: Large size
    // ============================================
    // - 'px-6' = 24px horizontal padding
    // - 'py-3' = 12px vertical padding
    // - 'text-lg' = Large text size
    // - 'rounded-lg' = Large border radius
    lg: 'px-6 py-3 text-lg rounded-lg',
  };

  // ============================================
  // LINES 52-57: Combine Classes
  // ============================================
  // This combines all the style classes into one string
  // It uses template literals and trim() to remove extra spaces
  // It replaces multiple spaces with a single space
  
  const buttonClasses = `
    ${baseStyles}        // Base styles (line 37)
    ${variants[variant]} // Variant styles (line 40-44)
    ${sizes[size]}       // Size styles (line 46-49)
    ${fullWidth ? 'w-full' : ''} // Full width if true
    ${className}         // Custom classes (line 29)
  `.trim().replace(/\s+/g, ' '); // Remove extra spaces

  // ============================================
  // LINES 60-91: Content to Render
  // ============================================
  // This defines what content to display inside the button
  // It can include a loading spinner, icons, and the children
  
  const content = (
    <>
      {/* ============================================
          LINE 61-81: Loading Spinner
          ============================================
          This shows a spinning icon when the button is loading
          The '&&' means: only show if 'loading' is true
          Think of it like: "If loading, show this"
      */}
      {loading && (
        // ============================================
        // LINE 62-79: Spinner SVG
        // ============================================
        // This is an SVG (Scalable Vector Graphics) element
        // It's a spinning circle animation
        // Let's break down the attributes:
        //
        // 'className' = CSS classes for styling
        // 'animate-spin' = Spinning animation
        // '-ml-1' = Negative left margin (adjusts spacing)
        // 'mr-2' = Right margin (spacing between spinner and text)
        // 'h-4 w-4' = Height and width of 16px
        // 'xmlns' = XML namespace (required for SVG)
        // 'fill' = Fill color ('none' = transparent)
        // 'viewBox' = Coordinate system for SVG
        // 'aria-hidden' = Hide from screen readers (it's decorative)
        //
        // Think of it like a rotating loading symbol
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {/* ============================================
              LINE 66-71: Outer circle
              ============================================
              This is the outer circle of the spinner
              - 'className' = CSS classes
              - 'opacity-25' = 25% opacity (partially transparent)
              - 'cx' = Center X coordinate
              - 'cy' = Center Y coordinate
              - 'r' = Radius
              - 'stroke' = Stroke color ('currentColor' = uses text color)
              - 'strokeWidth' = Stroke width (4px)
          */}
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          
          {/* ============================================
              LINE 73-78: Inner arc
              ============================================
              This is the inner arc of the spinner
              - 'className' = CSS classes
              - 'opacity-75' = 75% opacity (partially transparent)
              - 'fill' = Fill color ('currentColor' = uses text color)
              - 'd' = Path data (defines the arc shape)
          */}
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {/* ============================================
          LINE 82: Left icon (if not loading)
          ============================================
          This shows the left icon if:
          1. Not loading (we show the spinner instead)
          2. Left icon is provided
          - 'mr-2' = Right margin (spacing between icon and text)
          Think of it like: "If not loading and there's a left icon, show it"
      */}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      
      {/* ============================================
          LINE 83: Children (button content)
          ============================================
          This shows the button's main content
          This is the text or elements between the Button tags
          Think of it like the main label on the button
      */}
      {children}
      
      {/* ============================================
          LINE 84: Right icon (if not loading)
          ============================================
          This shows the right icon if:
          1. Not loading
          2. Right icon is provided
          - 'ml-2' = Left margin (spacing between text and icon)
          Think of it like: "If not loading and there's a right icon, show it"
      */}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );

  // ============================================
  // LINES 87-89: Button Props
  // ============================================
  // This adds props that only apply when rendering as a button
  // We don't add these when rendering as a link or other element
  
  const buttonProps = Component === 'button' ? {
    // ============================================
    // LINE 88: Type attribute
    // ============================================
    // Sets the HTML type attribute for button elements
    // 'disabled' = Adds disabled attribute if button is disabled or loading
    type, 
    disabled: disabled || loading
  } : {};

  // ============================================
  // LINES 92-100: Render Button
  // ============================================
  // This renders the actual button or link element
  
  return (
    // ============================================
    // LINE 93: Component Element
    // ============================================
    // This renders the component (button, link, etc.)
    // The 'Component' variable determines what to render
    // Think of it like: "Render this element type"
    <Component
      // ============================================
      // LINE 94: Ref
      // ============================================
      // This passes the ref to the component
      // Refs are like direct references to DOM elements
      // Useful for focus, animations, etc.
      ref={ref}
      
      // ============================================
      // LINE 95: Class name
      // ============================================
      // This applies all the combined styles
      // This is the CSS classes we built above (lines 52-57)
      className={buttonClasses}
      
      // ============================================
      // LINE 96: On click
      // ============================================
      // This sets the click handler function
      // When clicked, this function runs
      onClick={onClick}
      
      // ============================================
      // LINE 97: ARIA busy
      // ============================================
      // This tells screen readers if the button is busy/loading
      // Helps accessibility for users with disabilities
      // 'aria-busy' = "true" when loading, "false" otherwise
      aria-busy={loading}
      
      // ============================================
      // LINE 98: Spread button props
      // ============================================
      // This adds the button-specific props (type, disabled)
      // Only applies when rendering as a button
      {...buttonProps}
      
      // ============================================
      // LINE 99: Spread other props
      // ============================================
      // This adds any additional props passed to the component
      // Useful for additional HTML attributes
      {...props}
    >
      {/* ============================================
          LINE 100: Content
          ============================================
          This renders the button content
          This includes the spinner, icons, and children
          (defined in lines 60-91)
      */}
      {content}
      
    {/* ============================================
        LINE 101: Close Component
        ============================================
        This closes the Component element
        We've finished rendering the button/link
        Think of it like finishing the button assembly
    */}
    </Component>
  );
});

// ============================================
// LINE 104: Display Name
// ============================================
// This sets the display name for the component
// This is helpful for debugging and React DevTools
// Without this, it would show as "Anonymous"
// Think of it like giving the button a name for identification
Button.displayName = 'Button';

// ============================================
// LINE 106: Export Button Component
// ============================================
// This makes the Button component available for other files to import
// Without this, other files couldn't use our Button component
// Think of it like publishing our button design so others can use it
export default Button;

/**
 * ============================================
 * SUMMARY OF WHAT THIS FILE DOES:
 * ============================================
 * 
// 1. IMPORTS (Line 1):
//    - Imports forwardRef for passing refs
// 
// 2. BUTTON COMPONENT (Lines 20-102):
//    - Creates a reusable button component
//    - Supports multiple variants (primary, secondary, outline, ghost)
//    - Supports multiple sizes (sm, md, lg)
//    - Supports loading state with spinner
//    - Supports icons (left and right)
//    - Can render as different elements (button, link, etc.)
//    - Fully accessible with ARIA attributes
// 
// 3. STYLE SYSTEM (Lines 36-49):
//    - Base styles for all buttons
//    - Variant styles for different appearances
//    - Size styles for different sizes
// 
// 4. RENDERING (Lines 92-101):
//    - Combines all styles into classes
//    - Renders content (spinner, icons, children)
//    - Applies accessibility attributes
// 
// ============================================
 * REAL-WORLD ANALOGY:
 * ============================================
 * 
// Universal Remote Control:
// 
// 1. BUTTON COMPONENT = The remote
//    - One device that can do many things
// 
// 2. VARIANTS = Different buttons on the remote
//    - Volume up (primary)
//    - Mute (secondary)
//    - Menu (outline)
//    - Info (ghost)
// 
// 3. SIZES = Different button sizes
//    - Small buttons (sm)
//    - Medium buttons (md)
//    - Large buttons (lg)
// 
// 4. LOADING = Processing indicator
//    - Shows when the remote is thinking
// 
// 5. ICONS = Button labels
//    - Volume icon (+)
//    - Power icon (⏻)
//    - Mute icon (🔇)
// 
// 6. FULL WIDTH = Stretch button
//    - Button takes full width of remote
// 
// 7. AS PROP = Different functions
//    - Can be a button or a link
// 
// ============================================
 * HOW TO USE THE BUTTON:
 * ============================================
 * 
// Basic usage:
// <Button>Click me</Button>
// 
// Different variants:
// <Button variant="primary">Primary</Button>
// <Button variant="secondary">Secondary</Button>
// <Button variant="outline">Outline</Button>
// <Button variant="ghost">Ghost</Button>
// 
// Different sizes:
// <Button size="sm">Small</Button>
// <Button size="md">Medium</Button>
// <Button size="lg">Large</Button>
// 
// With icons:
// <Button leftIcon={<Icon />}>With Icon</Button>
// <Button rightIcon={<Arrow />}>Next</Button>
// 
// Loading state:
// <Button loading>Loading...</Button>
// 
// Disabled state:
// <Button disabled>Can't Click</Button>
// 
// Full width:
// <Button fullWidth>Full Width</Button>
// 
// As a link:
// <Button as="a" href="/page">Link Button</Button>
// 
// Submit button:
// <Button type="submit">Submit</Button>
// 
// With onClick handler:
// <Button onClick={() => alert('Clicked!')}>Click</Button>
// 
// Custom classes:
// <Button className="custom-class">Custom</Button>
// 
// ============================================
 * TAILWIND CSS CLASSES EXPLAINED:
 * ============================================
 * 
// Padding (p, px, py):
// - px-3 = padding-left and padding-right: 0.75rem (12px)
// - py-2 = padding-top and padding-bottom: 0.5rem (8px)
// 
// Border radius (rounded):
// - rounded-md = medium border radius (0.375rem / 6px)
// - rounded-lg = large border radius (0.5rem / 8px)
// 
// Text size (text):
// - text-sm = small text (0.875rem / 14px)
// - text-base = base text (1rem / 16px)
// - text-lg = large text (1.125rem / 18px)
// 
// Font weight (font):
// - font-medium = medium weight (500)
// 
// Flexbox (flex, items-center, justify-center):
// - flex = display: flex
// - items-center = align-items: center
// - justify-center = justify-content: center
// 
// Width (w):
// - w-full = width: 100%
// 
// Opacity:
// - opacity-50 = opacity: 0.5 (50%)
// - opacity-75 = opacity: 0.75 (75%)
// 
// Transition (transition, duration):
// - transition-all = transition all properties
// - duration-200 = transition duration 200ms
// 
// Hover (hover:):
// - hover:bg-blue-600 = blue background on hover
// - hover:text-white = white text on hover
// 
// Focus (focus:):
// - focus:outline-none = remove outline on focus
// - focus:ring-2 = add 2px ring on focus
// 
// Disabled (disabled:):
// - disabled:opacity-50 = 50% opacity when disabled
// 
// Dark mode (dark:):
// - dark:bg-gray-900 = dark background in dark mode
// - dark:text-white = white text in dark mode
// 
// ============================================
 * HOW LOADING STATE WORKS:
 * ============================================
 * 
// When loading is true:
// 1. Button shows spinner instead of icons
// 2. Button is disabled (can't be clicked)
// 3. Button shows 'aria-busy="true"' for accessibility
// 
// When loading is false:
// 1. Button shows icons (if provided)
// 2. Button can be clicked (unless disabled is true)
// 3. Button shows 'aria-busy="false"'
// 
// ============================================
 * HOW FORWARD REF WORKS:
 * ============================================
 * 
// forwardRef allows parent components to access the DOM element:
// 
// Parent component:
// const buttonRef = useRef();
// <Button ref={buttonRef}>Click me</Button>
// 
// Now parent can access the button element:
// buttonRef.current.focus(); // Focus the button
// buttonRef.current.click(); // Click the button programmatically
// 
// This is useful for:
// - Setting focus on load
// - Programmatic clicks
// - Integrating with third-party libraries
// 
// ============================================
 * ACCESSIBILITY FEATURES:
 * ============================================
 * 
// 1. FOCUS STYLES:
//    - Visible focus ring for keyboard navigation
//    - 'focus:ring-2' adds a ring around the button
// 
// 2. ARIA BUSY:
//    - 'aria-busy' tells screen readers when button is loading
//    - Helps users understand when they need to wait
// 
// 3. DISABLED STATE:
//    - 'disabled' attribute prevents keyboard activation
//    - Visual feedback (opacity-50)
//    - 'disabled:cursor-not-allowed' shows not-allowed cursor
// 
// 4. ICONS:
//    - Icons are decorative (aria-hidden="true")
//    - Text provides the accessible label
// 
// ============================================
 * HOW TO CUSTOMIZE THE BUTTON:
 * ============================================
 * 
// Add a new variant:
// const variants = {
//   primary: '...',
//   secondary: '...',
//   danger: 'bg-red-600 text-white hover:bg-red-700',
// };
// 
// Add a new size:
// const sizes = {
//   sm: '...',
//   md: '...',
//   lg: '...',
//   xl: 'px-8 py-4 text-xl rounded-lg',
// };
// 
// Change the spinner:
// Replace the SVG with a different loading indicator
// 
// Add more props:
// const Button = forwardRef(({
//   // existing props...
//   rounded, // custom border radius
//   shadow,  // add shadow
//   ...props
// }) => {
//   // ...
// });
// 
// ============================================
 * COMMON QUESTIONS:
 * ============================================
 * 
// Q: Why use forwardRef?
// A: To allow parent components to access the button's DOM element.
// 
// Q: What's the difference between disabled and loading?
// A: Both prevent clicking, but loading shows a spinner.
// 
// Q: Can I use the button as a link?
// A: Yes, use the 'as' prop: <Button as="a" href="/page">Link</Button>
// 
// Q: Why combine classes with template literals?
// A: To dynamically build the class string based on props.
// 
// Q: What does 'trim().replace(/\s+/g, ' ')' do?
// A: Removes extra spaces and trims the string.
// 
// Q: Can I add custom styles?
// A: Yes, use the 'className' prop to add custom classes.
// 
// Q: What's the '...props' for?
// A: To pass additional HTML attributes to the button.
// 
// ============================================
 */
