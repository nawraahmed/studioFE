import { GoogleOAuthProvider } from "@react-oauth/google"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "@fortawesome/fontawesome-free/css/all.min.css"
import App from "./App.jsx"
import "./i18n"

createRoot(document.querySelector("#root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
)
