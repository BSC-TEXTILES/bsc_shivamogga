import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Do NOT hide content before first paint. js-reveal is applied in use3dScroll
// only after in-viewport targets are marked is-visible (avoids NO_FCP / blank load).

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
