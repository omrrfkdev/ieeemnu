# 📚 IEEE Web React - Documentation

Welcome to the project documentation! This guide will help you understand every part of the codebase.

---

## 🗂️ Documentation Index

### 📄 Page Documentation
Each page has detailed documentation explaining components, concepts, and React features:

| Page | File | Description |
|------|------|-------------|
| [Home](./HOME_PAGE.md) | `src/pages/Home.jsx` | Landing page with hero, stats, events |
| [Board](./BOARD_PAGE.md) | `src/pages/Board.jsx` | Board members with skeleton loading |
| [Team](./TEAM_PAGE.md) | `src/pages/Team.jsx` | Team members with 3D lanyard cards |
| [Events](./EVENTS_PAGE.md) | `src/pages/Events.jsx` | Events with 3D dome gallery |
| [Committees](./COMMITTEES_PAGE.md) | `src/pages/Committees.jsx` | Committees with alternating layouts |
| [About](./ABOUT_PAGE.md) | `src/pages/About.jsx` | About page with mission/vision |
| [Projects](./PROJECTS_PAGE.md) | `src/pages/Projects.jsx` | Project showcase |
| [Contact](./CONTACT_PAGE.md) | `src/pages/Contact.jsx` | Contact form |

### 🏗️ Architecture Documentation

| Document | Description |
|----------|-------------|
| [App Architecture](./APP_ARCHITECTURE.md) | How the app is structured, routing, lazy loading |
| [React Fundamentals](./REACT_FUNDAMENTALS.md) | React basics for beginners |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repo
git clone <repo-url>
cd IEEE_WEB_REACT

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🎯 Key Concepts Used in This Project

### 1. React Features
- **Functional Components** - All components are functions
- **Hooks** - useState, useEffect, useRef, useCallback, useMemo, memo
- **Context API** - For theme (dark mode)
- **React.lazy + Suspense** - Code splitting for faster loads

### 2. Performance Optimizations
- **Image Preloading** - Load images before showing page
- **Skeleton Loaders** - Show loading state while content loads
- **Memoization** - Prevent unnecessary re-renders
- **GPU Acceleration** - Smooth animations with transform-gpu

### 3. Core Web Vitals
- **LCP** (Largest Contentful Paint) - Fast initial render
- **FID** (First Input Delay) - Responsive interactions
- **CLS** (Cumulative Layout Shift) - No layout jumping

### 4. Animation Libraries
- **GSAP** - Professional-grade animations
- **ScrollTrigger** - Scroll-based animations
- **CSS Animations** - Simple continuous animations

### 5. Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Dark Mode** - Full dark mode support
- **Responsive Design** - Mobile-first approach

---

## 📁 Project Structure

```
IEEE_WEB_REACT/
├── public/                 # Static assets
│   ├── members/           # Member photos
│   ├── committees/        # Committee images
│   └── events/            # Event photos
├── src/
│   ├── components/
│   │   ├── common/        # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── PageLoader.jsx
│   │   │   └── ScrollToTop.jsx
│   │   ├── layout/        # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   └── animations/    # Animation components
│   │       ├── ScrollFloat.jsx
│   │       ├── ScrollReveal.jsx
│   │       ├── CountUp.jsx
│   │       └── ...
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Board.jsx
│   │   ├── Team.jsx
│   │   └── ...
│   ├── hooks/             # Custom hooks
│   │   ├── usePageLoader.js
│   │   └── useScrollAnimation.js
│   ├── context/           # React Context
│   │   └── ThemeContext.jsx
│   ├── constants/         # Static data
│   │   └── index.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── docs/                  # Documentation (you are here!)
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🎓 Learning Path

If you're new to React, follow this order:

1. **Start Here** → [React Fundamentals](./REACT_FUNDAMENTALS.md)
2. **Understand the App** → [App Architecture](./APP_ARCHITECTURE.md)
3. **Study Simple Pages** → [About](./ABOUT_PAGE.md), [Projects](./PROJECTS_PAGE.md)
4. **Study Complex Pages** → [Board](./BOARD_PAGE.md), [Team](./TEAM_PAGE.md)
5. **Learn Forms** → [Contact](./CONTACT_PAGE.md)
6. **Advanced Animations** → [Events](./EVENTS_PAGE.md), [Committees](./COMMITTEES_PAGE.md)

---

## 🛠️ Common Tasks

### Adding a New Page

1. Create `src/pages/NewPage.jsx`
2. Add lazy import in `App.jsx`
3. Add Route in `App.jsx`
4. Add link in Header

### Adding a New Component

1. Create in appropriate folder (`common/`, `animations/`, etc.)
2. Export from the file
3. Import where needed

### Adding Dark Mode Support

Use Tailwind's `dark:` prefix:
```jsx
className="bg-white dark:bg-gray-900 text-black dark:text-white"
```

### Adding Animations

Use GSAP or CSS:
```jsx
// GSAP
gsap.to(element, { opacity: 1, y: 0, duration: 0.5 });

// CSS
className="animate-pulse"
```

---

## 🤝 Contributing

1. Read the documentation first
2. Follow existing code patterns
3. Use meaningful commit messages
4. Test on mobile and desktop
5. Check dark mode works

---

## 📞 Need Help?

- Read the page-specific documentation
- Check React Fundamentals guide
- Look at similar components in the codebase

---

Happy coding! 🚀
