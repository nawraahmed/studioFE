import { GoogleOAuthProvider } from '@react-oauth/google'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CurrencyProvider } from './contexts/CurrencyContext'
import CurrencyConverter from './components/CurrencyConverter'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.jsx'

createRoot(document.querySelector('#root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <CurrencyProvider>
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <App />
        <CurrencyConverter />
      </BrowserRouter>
    </CurrencyProvider>
  </GoogleOAuthProvider>
)
