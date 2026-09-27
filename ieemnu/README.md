# IEEE University Student Branch Website

A modern, professional website for IEEE University Student Branch built with React, Vite, GSAP animations, and Tailwind CSS. Features a fully responsive design, dark mode support, and exceptional performance.

![IEEE Logo](https://www.ieee.org/content/dam/ieee-org/ieee/web/org/assets/images/ieee-logo.png)

## 🚀 Features

- **Modern Tech Stack**: React 18+ with Vite for lightning-fast development
- **Smooth Animations**: GSAP (GreenSock) for professional scroll-triggered animations
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Dark Mode**: Fully functional light/dark theme with localStorage persistence
- **Accessibility**: WCAG AA compliant with ARIA labels and keyboard navigation
- **Performance Optimized**: Lazy loading, code splitting, and optimized bundle size
- **SEO Friendly**: Semantic HTML and meta tags for better search engine visibility
- **Production Ready**: Comprehensive documentation and maintainable architecture

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Deployment](#-deployment)
- [Customization](#-customization)
- [Component Documentation](#-component-documentation)
- [Performance](#-performance)
- [Accessibility](#-accessibility)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠 Tech Stack

### Core
- **React 18+** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing

### Styling & Animation
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Professional-grade animation library
- **Lucide React** - Beautiful icon library

### Code Quality
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **JSDoc** - Documentation comments

## 📁 Project Structure

```
ieee-web-react/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── common/       # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Textarea.jsx
│   │   ├── layout/       # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   └── sections/     # Page-specific sections
│   ├── pages/            # Route pages
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Events.jsx
│   │   ├── Projects.jsx
│   │   ├── Team.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useScrollAnimation.js
│   │   └── useMediaQuery.js
│   ├── context/          # React Context
│   │   └── ThemeContext.jsx
│   ├── constants/        # Constants and configuration
│   │   └── index.js
│   ├── utils/            # Helper functions
│   ├── styles/           # Global styles
│   ├── assets/           # Images, icons, fonts
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global CSS with Tailwind
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ieee-web-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 💻 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Development Workflow

1. **Start the dev server**: `npm run dev`
2. **Make your changes**: Edit files in `src/`
3. **See changes instantly**: Vite's HMR updates the browser automatically
4. **Test responsiveness**: Use browser dev tools to test different screen sizes
5. **Check accessibility**: Use browser accessibility tools

### Hot Module Replacement (HMR)

Vite provides instant HMR for React components. Changes appear immediately without full page reload, preserving application state.

## 🏗 Building for Production

### Build Command

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory with:
- Minified JavaScript and CSS
- Optimized images
- Code splitting for better performance
- Source maps for debugging

### Preview Production Build

```bash
npm run preview
```

Test the production build locally before deployment.

### Build Optimization

The build process includes:
- **Tree shaking** - Removes unused code
- **Code splitting** - Splits code into smaller chunks
- **Asset optimization** - Compresses images and assets
- **CSS purging** - Removes unused CSS classes

## 🚢 Deployment

### Netlify (Recommended)

1. Push code to GitHub/GitLab
2. Connect repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

### GitHub Pages

1. Install gh-pages: `npm install -D gh-pages`
2. Add to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Update `vite.config.js` with base path
4. Run: `npm run build && npm run deploy`

### Other Platforms

The built files in `dist/` can be deployed to any static hosting service:
- AWS S3 + CloudFront
- Firebase Hosting
- Cloudflare Pages
- DigitalOcean App Platform

## 🎨 Customization

### Updating Branch Information

Edit `src/constants/index.js`:

```javascript
export const BRANCH_INFO = {
  name: 'Your Branch Name',
  university: 'Your University',
  email: 'your-email@university.edu',
  // ... other info
};
```

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  ieee: {
    blue: '#00629B',      // Primary IEEE blue
    'blue-dark': '#004A75',
    'blue-light': '#0080C9',
  },
  // Add your custom colors
}
```

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`:
   ```javascript
   <Route path="new-page" element={<NewPage />} />
   ```
3. Add navigation link in `src/constants/index.js`

### Modifying Animations

Edit animation settings in `src/constants/index.js`:

```javascript
export const ANIMATION_CONFIG = {
  duration: 0.8,
  ease: 'power3.out',
  stagger: 0.1,
};
```

## 📚 Component Documentation

### Common Components

#### Button
```jsx
<Button 
  variant="primary"    // primary, secondary, outline, ghost
  size="md"           // sm, md, lg
  leftIcon={<Icon />}
  rightIcon={<Icon />}
  loading={false}
  disabled={false}
  fullWidth={false}
>
  Click Me
</Button>
```

#### Card
```jsx
<Card 
  variant="elevated"  // default, elevated, bordered
  hoverable={true}
>
  <CardHeader>Header Content</CardHeader>
  <CardBody>Body Content</CardBody>
  <CardFooter>Footer Content</CardFooter>
</Card>
```

#### Input
```jsx
<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  error="Error message"
  required={true}
/>
```

### Custom Hooks

#### useScrollAnimation
```jsx
const ref = useScrollAnimation({
  animation: { y: 0, opacity: 1, duration: 1 },
  scrollTrigger: { start: 'top 80%' }
});

return <div ref={ref}>Animated content</div>;
```

#### useMediaQuery
```jsx
const isMobile = useMediaQuery('(max-width: 768px)');
// or use predefined hooks
const isMobile = useIsMobile();
const isTablet = useIsTablet();
const isDesktop = useIsDesktop();
```

#### useTheme
```jsx
const { theme, toggleTheme, isDark } = useTheme();
```

## ⚡ Performance

### Lighthouse Scores (Target)

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

### Optimization Techniques

1. **Code Splitting**: Routes are lazy-loaded
2. **Image Optimization**: WebP format with lazy loading
3. **CSS Optimization**: Tailwind purges unused styles
4. **Bundle Size**: Tree-shaking removes unused code
5. **Caching**: Service worker for offline support (optional)

### Performance Tips

- Use `React.memo()` for expensive components
- Implement virtual scrolling for long lists
- Optimize images before uploading
- Use CDN for static assets
- Enable compression on server

## ♿ Accessibility

### Features

- **Semantic HTML**: Proper use of HTML5 elements
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Indicators**: Visible focus states
- **Color Contrast**: WCAG AA compliant
- **Reduced Motion**: Respects `prefers-reduced-motion`

### Testing Accessibility

1. Use browser DevTools Lighthouse
2. Test with screen readers (NVDA, JAWS, VoiceOver)
3. Navigate using only keyboard
4. Check color contrast ratios
5. Test with browser extensions (axe, WAVE)

## 🤝 Contributing

### Development Guidelines

1. Follow existing code style
2. Add JSDoc comments to functions
3. Test responsive design on multiple devices
4. Ensure accessibility standards
5. Update documentation for new features

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit pull request with description

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **IEEE** - For the brand guidelines and inspiration
- **React Team** - For the amazing framework
- **Vite Team** - For the blazing-fast build tool
- **GSAP** - For professional animation capabilities
- **Tailwind CSS** - For the utility-first CSS framework

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Contact: ieee@university.edu
- Visit: [IEEE Official Website](https://www.ieee.org)

## 🔄 Version History

- **v1.0.0** - Initial release with all core features

---

**Built with ❤️ by IEEE Student Branch**
