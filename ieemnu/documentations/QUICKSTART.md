# Quick Start Guide

Get your IEEE Student Branch website up and running in minutes!

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A code editor (VS Code recommended)

## Installation (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages including React, Vite, Tailwind CSS, GSAP, and more.

### 2. Start Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### 3. Open in Browser

Navigate to `http://localhost:5173` and you should see your IEEE website!

## Customization (10 minutes)

### Update Branch Information

Edit `src/constants/index.js`:

```javascript
export const BRANCH_INFO = {
  name: 'IEEE University Student Branch',  // ← Change this
  university: 'Your University Name',      // ← Change this
  established: '2020',                     // ← Change this
  email: 'ieee@university.edu',            // ← Change this
  phone: '+1 (555) 123-4567',             // ← Change this
  address: '123 University Ave...',        // ← Change this
};
```

### Update Social Media Links

In the same file:

```javascript
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/your-page',    // ← Update
  twitter: 'https://twitter.com/your-handle',    // ← Update
  linkedin: 'https://linkedin.com/company/...',  // ← Update
  instagram: 'https://instagram.com/...',        // ← Update
  github: 'https://github.com/...',              // ← Update
};
```

### Update Team Members

Edit the `EXECUTIVE_BOARD` array in `src/constants/index.js`:

```javascript
export const EXECUTIVE_BOARD = [
  {
    id: 1,
    name: 'Your Name',              // ← Change
    position: 'Chairperson',        // ← Change
    bio: 'Your bio here...',        // ← Change
    linkedin: 'https://...',        // ← Change
    email: 'your@email.edu',        // ← Change
  },
  // Add more members...
];
```

### Update Events

Edit `UPCOMING_EVENTS` in `src/constants/index.js`:

```javascript
export const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'Your Event Name',
    date: '2024-02-15',
    time: '2:00 PM - 5:00 PM',
    location: 'Event Location',
    description: 'Event description...',
    category: 'Workshop',
  },
  // Add more events...
];
```

## Testing (5 minutes)

### Test Responsive Design

1. Open browser DevTools (F12)
2. Click device toolbar icon
3. Test on different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1024px+)

### Test Dark Mode

Click the moon/sun icon in the header to toggle between light and dark modes.

### Test Navigation

Click through all pages:
- Home
- About
- Events
- Projects
- Team
- Contact

## Building for Production (2 minutes)

### Create Production Build

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Test the production build locally before deployment.

## Deployment (10 minutes)

### Option 1: Netlify (Easiest)

1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

Done! Your site is live.

### Option 2: Vercel

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel auto-detects settings
5. Click "Deploy"

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install -D gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

3. Update `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   npm run build && npm run deploy
   ```

## Common Tasks

### Add a New Page

1. Create file in `src/pages/`:
   ```jsx
   // src/pages/NewPage.jsx
   const NewPage = () => {
     return <div>New Page Content</div>;
   };
   export default NewPage;
   ```

2. Add route in `src/App.jsx`:
   ```jsx
   import NewPage from './pages/NewPage';
   
   // In Routes:
   <Route path="new-page" element={<NewPage />} />
   ```

3. Add to navigation in `src/constants/index.js`:
   ```javascript
   export const NAV_ITEMS = [
     // ... existing items
     { path: '/new-page', label: 'New Page' },
   ];
   ```

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  ieee: {
    blue: '#00629B',      // ← Change primary color
    'blue-dark': '#004A75',
    'blue-light': '#0080C9',
  },
}
```

### Add Images

1. Place images in `public/` folder
2. Reference in components:
   ```jsx
   <img src="/your-image.jpg" alt="Description" />
   ```

## Troubleshooting

### Port Already in Use

If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Build Errors

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Styles Not Updating

1. Stop dev server (Ctrl+C)
2. Delete `.vite` folder
3. Restart: `npm run dev`

## Next Steps

1. **Customize Content**: Update all text and data in `src/constants/index.js`
2. **Add Images**: Replace placeholder images with real photos
3. **Test Thoroughly**: Check all pages on different devices
4. **Deploy**: Choose a hosting platform and deploy
5. **Monitor**: Set up analytics (Google Analytics, etc.)

## Getting Help

- **Documentation**: See [README.md](./README.md)
- **Project Structure**: See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- **Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Issues**: Open an issue on GitHub

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [GSAP Documentation](https://greensock.com/docs/)
- [IEEE Branding Guidelines](https://www.ieee.org/about/help/branding.html)

---

**Congratulations! Your IEEE Student Branch website is ready to go! 🎉**

For detailed documentation, see the full [README.md](./README.md).
