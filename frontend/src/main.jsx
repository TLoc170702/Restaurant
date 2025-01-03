import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthWrapper } from './Components/context/auth.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthWrapper>
  </StrictMode>,
)
