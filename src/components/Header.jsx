import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../static/header.css'
import CurrencySelector from './CurrencySelectot'
import { useTranslation } from "react-i18next" // Import useTranslation

const Header = ({ user, handleLogOut }) => {
  const { i18n } = useTranslation() // Get i18n instance from the hook
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Function to change language
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang) // Switch the language dynamically
  }

  return (
    <header className="header">
      <div className="logo">design studio</div>

      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'}
      </button>

      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>
          {i18n.t("home") || "Home"} {/* Using i18n.t() to get translation */}
        </Link>
        <Link to="/services" onClick={closeMenu}>
          {i18n.t("services") || "Services"}
        </Link>
        <Link to="/packages" onClick={closeMenu}>
          {i18n.t("packages") || "Packages"}
        </Link>
        {/* <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link> */}
        <Link to="/book" onClick={closeMenu}>
          {i18n.t("book") || "Book"}
        </Link>
        <Link to="/admin" onClick={closeMenu}>
          {i18n.t("admin_dashboard") || "Admin Dashboard"}
        </Link>

        {user && (
          <Link to="/profile" onClick={closeMenu}>
            {i18n.t("profile") || "Profile"}
          </Link>
        )}

        {/* {user && user.role === 'admin' && (
          <Link to="/admin" onClick={closeMenu}>
            Admin Dashboard
          </Link>
        )} */}

        {user ? (
          <button
            onClick={() => {
              handleLogOut()
              closeMenu()
            }}
          >
            {i18n.t("sign_out") || "Sign Out"}
          </button>
        ) : (
          <Link to="/signin" onClick={closeMenu}>
            {i18n.t("sign_in") || "Sign In"}
          </Link>
        )}
{/* Language Toggle Buttons */}
<div className="language-switcher">
          <button onClick={() => changeLanguage("en")}>English</button>
          <button onClick={() => changeLanguage("ar")}>العربية</button>
        </div>
        <CurrencySelector />
      </nav>
    </header>
  )
}

export default Header
