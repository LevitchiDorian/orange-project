import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css'

createRoot(document.getElementById('root')as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
