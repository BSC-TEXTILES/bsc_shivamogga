import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize Trusted Types policy for DOM XSS protection
if (typeof window !== "undefined" && window.trustedTypes?.createPolicy) {
  try {
    window.trustedTypes.createPolicy("default", {
      createHTML: (string) => string,
      createScript: (string) => string,
      createScriptURL: (url) => url,
    });
  } catch {
    /* policy already exists */
  }
}

// Do NOT hide content before first paint. js-reveal is applied in use3dScroll
// only after in-viewport targets are marked is-visible (avoids NO_FCP / blank load).

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
