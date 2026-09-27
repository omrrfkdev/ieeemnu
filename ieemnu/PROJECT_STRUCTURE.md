# IEEE Website Project Structure

This document provides a detailed overview of the project structure, explaining the purpose of each directory and key files.

## Directory Structure

```
ieee-web-react/
├── public/                          # Static assets served directly
│   └── (images, fonts, etc.)
│
├── src/                             # Source code
│   ├── components/                  # React components
│   │   ├── common/                 # Reusable UI components
│   │   │   ├── Button.jsx          # Button component with variants
│   │   │   ├── Card.jsx            # Card container component
│   │   │   ├── Input.jsx           # Form input component
│   │   │   └── Textarea.jsx        # Textarea component
│   │   │
│   │   ├── layout/                 # Layout components
│   │   │   ├── Header.jsx          # Site header with navigation
│   │   │   ├── Footer.jsx          # Site footer
│   │   │   └── Layout.jsx          # Main layout wrapper
│   │   │
│   │   └── sections/               # Page-specific sections (future)
│   │
│   ├── pages/                      # Route pages
│   │   ├── Home.jsx                # Homepage with hero and stats
│   │   ├── About.jsx               # About page with mission/vision
│   │   ├── Events.jsx              # Events listing page
│   │   ├── Projects.jsx            # Projects showcase page
│   │   ├── Team.jsx                # Team members page
│   │   ├── Contact.jsx             # Contact form page
│   │   └── NotFound.jsx            # 404 error page
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useScrollAnimation.js   # GSAP scroll animations
│   │   └── useMediaQuery.js        # Responsive breakpoint hooks
│   │
│   ├── context/                    # React Context providers
│   │   └── ThemeContext.jsx        # Theme (light/dark) context
│   │
│   ├── constants/                  # Application constants
│   │   └── index.js                # All constants and config
│   │
│   ├── utils/                      # Utility functions (future)
│   ├── styles/                     # Additional styles (future)
│   ├── assets/                     # Images, icons, fonts
│   │
│   ├── App.jsx                     # Main App component with routing
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles with Tailwind
│
├── .eslintrc.cjs                   # ESLint configuration
├── .gitignore                      # Git ignore rules
├── CONTRIBUTING.md                 # Contribution guidelines
├── package.json                    # Project dependencies and scripts
├── postcss.config.js               # PostCSS configuration
├── PROJECT_STRUCTURE.md            # This file
├── README.md                       # Main documentation
├── tailwind.config.js              # Tailwind CSS configuration
└── vite.config.js                  # Vite build configuration
```

## Key Files Explained

### Configuration Files

#### `vite.config.js`
Vite build tool configuration. Handles:
- React plugin setup
- Build optimization
- Development server settings

#### `tailwind.config.js`
Tailwind CSS configuration. Defines:
- Custom color palette (IEEE blue, accent colors)
- Custom animations
- Dark mode settings
- Content paths for purging

#### `postcss.config.js`
PostCSS configuration for processing CSS:
- Tailwind CSS plugin
- Autoprefixer for browser compatibility

#### `.eslintrc.cjs`
ESLint configuration for code quality:
- React-specific rules
- Code style enforcement
- Best practices

### Source Code Structure

#### `src/main.jsx`
Application entry point that:
- Renders the root React component
- Wraps app in StrictMode
- Mounts to DOM element

#### `src/App.jsx`
Main application component that:
- Sets up React Router
- Provides ThemeContext
- Defines all routes
- Wraps pages in Layout

#### `src/index.css`
Global styles including:
- Tailwind directives
- Custom CSS variables
- Base styles
- Utility classes
- Accessibility styles

### Components

#### Common Components (`src/components/common/`)

**Button.jsx**
- Versatile button component
- Multiple variants (primary, secondary, outline, ghost)
- Multiple sizes (sm, md, lg)
- Loading states
- Icon support
- Can render as Link or other components

**Card.jsx**
- Container component for content
- Multiple variants (default, elevated, bordered)
- Hover effects
- Includes CardHeader, CardBody, CardFooter sub-components

**Input.jsx**
- Form input component
- Label and error message support
- Validation states
- Accessible with ARIA attributes

**Textarea.jsx**
- Multi-line text input
- Similar features to Input
- Resizable

#### Layout Components (`src/components/layout/`)

**Header.jsx**
- Site navigation header
- Responsive mobile menu
- Theme toggle button
- Sticky on scroll
- Active link highlighting

**Footer.jsx**
- Site footer with multiple sections
- Quick links
- Contact information
- Social media links
- Newsletter signup

**Layout.jsx**
- Main layout wrapper
- Includes Header and Footer
- Outlet for page content

### Pages (`src/pages/`)

Each page is a complete route component:

**Home.jsx**
- Hero section with animations
- Statistics display
- About preview
- Featured events
- Call-to-action sections

**About.jsx**
- Mission and vision
- Branch history
- Core values
- Executive board profiles

**Events.jsx**
- Upcoming events listing
- Past events archive
- Event filtering
- Registration CTAs

**Projects.jsx**
- Project showcase
- Technology tags
- Awards and achievements
- GitHub links

**Team.jsx**
- Executive committee profiles
- Member benefits
- Team statistics
- Join CTA

**Contact.jsx**
- Contact form with validation
- Contact information
- Office hours
- Map placeholder

**NotFound.jsx**
- 404 error page
- Navigation options

### Hooks (`src/hooks/`)

**useScrollAnimation.js**
Custom hooks for GSAP animations:
- `useScrollAnimation` - Animate single element on scroll
- `useStaggerAnimation` - Animate multiple elements with stagger
- `useParallax` - Parallax scroll effect

**useMediaQuery.js**
Responsive design hooks:
- `useMediaQuery` - Generic media query hook
- `useIsMobile` - Mobile breakpoint
- `useIsTablet` - Tablet breakpoint
- `useIsDesktop` - Desktop breakpoint
- `useIsLargeScreen` - Large screen breakpoint

### Context (`src/context/`)

**ThemeContext.jsx**
Theme management:
- Light/dark mode state
- Toggle function
- localStorage persistence
- System preference detection

### Constants (`src/constants/`)

**index.js**
All application constants:
- `BRANCH_INFO` - Branch contact information
- `SOCIAL_LINKS` - Social media URLs
- `NAV_ITEMS` - Navigation menu items
- `STATS` - Homepage statistics
- `EXECUTIVE_BOARD` - Team member data
- `UPCOMING_EVENTS` - Event data
- `PAST_EVENTS` - Past event data
- `PROJECTS` - Project data
- `MEMBER_BENEFITS` - Membership benefits
- `ANIMATION_CONFIG` - GSAP animation settings

## Component Architecture

### Design Principles

1. **Single Responsibility**: Each component has one clear purpose
2. **Composition**: Build complex UIs from simple components
3. **Reusability**: Common components used across pages
4. **Accessibility**: WCAG AA compliant with ARIA labels
5. **Performance**: Lazy loading and code splitting

### Component Patterns

#### Container/Presentational Pattern
- Layout components handle structure
- Page components handle data and logic
- Common components are purely presentational

#### Compound Components
- Card with CardHeader, CardBody, CardFooter
- Allows flexible composition

#### Render Props Pattern
- Custom hooks return refs and state
- Components use hooks for behavior

## Styling Architecture

### Tailwind CSS Approach

1. **Utility-First**: Use Tailwind utilities for most styling
2. **Custom Classes**: Only when needed for complex styles
3. **Responsive**: Mobile-first with responsive modifiers
4. **Dark Mode**: `dark:` prefix for dark mode styles
5. **Custom Theme**: Extended with IEEE brand colors

### Color System

```javascript
colors: {
  ieee: {
    blue: '#00629B',      // Primary brand color
    'blue-dark': '#004A75',
    'blue-light': '#0080C9',
  },
  accent: {
    teal: '#00A9CE',
    orange: '#FF6B35',
    purple: '#6A4C93',
  }
}
```

## Animation Strategy

### GSAP Integration

1. **Scroll Triggers**: Animate on scroll into view
2. **Stagger Effects**: Sequential animations
3. **Performance**: GPU-accelerated transforms
4. **Accessibility**: Respect `prefers-reduced-motion`

### Animation Patterns

- **Fade In**: Opacity 0 to 1
- **Slide Up**: TranslateY with opacity
- **Stagger**: Delayed sequential animations
- **Parallax**: Scroll-based position changes

## State Management

### Local State
- Component-specific state with `useState`
- Form state in Contact page

### Context State
- Theme state (light/dark mode)
- Shared across entire app

### Future Considerations
- Add Redux/Zustand for complex state
- Add React Query for server state

## Routing Strategy

### React Router Setup
- BrowserRouter for clean URLs
- Nested routes with Layout
- 404 fallback route

### Route Structure
```
/           -> Home
/about      -> About
/events     -> Events
/projects   -> Projects
/team       -> Team
/contact    -> Contact
/*          -> NotFound (404)
```

## Performance Optimizations

1. **Code Splitting**: Routes loaded on demand
2. **Lazy Loading**: Images load as needed
3. **Tree Shaking**: Unused code removed
4. **CSS Purging**: Unused Tailwind classes removed
5. **Minification**: Production build minified

## Accessibility Features

1. **Semantic HTML**: Proper element usage
2. **ARIA Labels**: Screen reader support
3. **Keyboard Navigation**: Full keyboard access
4. **Focus Indicators**: Visible focus states
5. **Color Contrast**: WCAG AA compliant
6. **Reduced Motion**: Animation preferences respected

## Future Enhancements

### Planned Features
- [ ] Blog section
- [ ] Member portal with authentication
- [ ] Event registration system
- [ ] Photo gallery
- [ ] Newsletter integration
- [ ] Search functionality

### Technical Improvements
- [ ] Add TypeScript
- [ ] Add unit tests (Jest, React Testing Library)
- [ ] Add E2E tests (Playwright, Cypress)
- [ ] Add Storybook for component documentation
- [ ] Implement service worker for offline support
- [ ] Add analytics integration

## Development Workflow

1. **Feature Branch**: Create branch for new feature
2. **Development**: Build and test locally
3. **Linting**: Run ESLint before commit
4. **Testing**: Test on multiple devices/browsers
5. **Pull Request**: Submit for review
6. **Review**: Address feedback
7. **Merge**: Merge to main branch
8. **Deploy**: Automatic deployment on merge

## Build Process

### Development Build
```bash
npm run dev
```
- Fast HMR (Hot Module Replacement)
- Source maps for debugging
- No optimization

### Production Build
```bash
npm run build
```
- Minified JavaScript and CSS
- Optimized images
- Code splitting
- Tree shaking
- Source maps (optional)

### Output
- Build files in `dist/` directory
- Ready for static hosting
- Optimized for performance

---

For more information, see:
- [README.md](./README.md) - Main documentation
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
