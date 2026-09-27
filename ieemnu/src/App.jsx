/**
 * Main App Component
 * Sets up routing and theme provider for the application
 * Uses React.lazy for code-splitting - each page loads only when needed
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import ScrollToTop from './components/common/ScrollToTop';
import Layout from './components/layout/Layout';
import PageLoader from './components/common/PageLoader';

// Lazy load all pages - only loads when user navigates to them
const Home = lazy(() => import('./pages/Home'));
const Events = lazy(() => import('./pages/Events'));
const Board = lazy(() => import('./pages/Board'));
const Committees = lazy(() => import('./pages/Committees'));
const Membership = lazy(() => import('./pages/Membership'));
const Registration = lazy(() => import('./pages/Registration'));
const FAQ = lazy(() => import('./pages/FAQ'));
const EventDetails = lazy(() => import('./pages/EventDetails'));
const EventRegistration = lazy(() => import('./pages/EventRegistration'));
const Enigma = lazy(() => import('./pages/Enigma'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Admin = lazy(() => import('./pages/Admin'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const MiniGame = lazy(() => import('./pages/MiniGame'));
const Thanks = lazy(() => import('./pages/Thanks'));

/**
 * Main application component
 * Provides routing and theme context to all child components
 * 
 * @returns {JSX.Element} Application root
 */
function App() {
  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="events" element={<Events />} />
              <Route path="events/:id" element={<EventDetails />} />
              <Route path="events/:id/registration" element={<EventRegistration />} />
              <Route path="board" element={<Board />} />
              <Route path="committees" element={<Committees />} />
              <Route path="membership" element={<Membership />} />
              <Route path="enigma" element={<Thanks />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="registration" element={<Registration />} />
              {/* <Route path="contact" element={<Contact />} /> */}
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="minigame" element={<MiniGame />} />
              <Route path="thanks" element={<Thanks />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/admin" element={<Layout />}>
              <Route index element={<Admin />} />
            </Route>
          </Routes>
        </Router>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}

export default App;
