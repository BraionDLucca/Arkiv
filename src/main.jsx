import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App"
import RecommendedList from "./components/RecommendedList"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* O certo é App */}
  </StrictMode>,
)
