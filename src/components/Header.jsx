import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../static/header.css"
import CurrencySelector from "./CurrencySelectot"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "./LanguageSwitcher"

const Header = ({ user, handleLogOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userRole, setUserRole] = useState(null)

  const { t } = useTranslation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const role = localStorage.getItem("role")
    if (role) {
      setUserRole(role)
    }
  }, [])

  return (
    <header className="header">
      <div className="logo"> {t("nav.logo")}</div>

      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? "✕" : "☰"}
      </button>

      <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          {t("nav.home")}
        </Link>
        <Link to="/services" onClick={closeMenu}>
          {t("nav.services")}
        </Link>
        <Link to="/packages" onClick={closeMenu}>
          {t("nav.packages")}
        </Link>
        {/* <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link> */}
        <Link to="/book" onClick={closeMenu}>
          {t("nav.book")}
        </Link>

        {user && userRole === "admin" && (
          <Link to="/admin" onClick={closeMenu}>
            {t("nav.admin_dashboard")}
          </Link>
        )}

        {user && (
          <Link to="/profile" onClick={closeMenu}>
            {t("nav.profile")}
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
            {t("nav.sign_out")}
          </button>
        ) : (
          <Link to="/signin" onClick={closeMenu}>
            {t("nav.sign_in")}
          </Link>
        )}

        <CurrencySelector />
        <LanguageSwitcher />
      </nav>
    </header>
  )
}

export default Header
