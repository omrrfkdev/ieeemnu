/**
 * Application Entry Point
 * Renders the root React component
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initWebVitals, markPerformance } from './utils/webVitals'

// Mark app start
markPerformance('app-start');

// Initialize Web Vitals tracking
if (import.meta.env.PROD) {
  initWebVitals();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Mark app rendered
markPerformance('app-rendered');
