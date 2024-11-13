import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../static/header.css'
import CurrencySelector from './CurrencySelectot'

const Header = ({ user, handleLogOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  console.log(isMenuOpen)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="logo">design studio</div>

      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'}
      </button>

      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/services" onClick={closeMenu}>
          Services
        </Link>
        <Link to="/packages" onClick={closeMenu}>
          Packages
        </Link>
        {/* <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link> */}
        <Link to="/book" onClick={closeMenu}>
          Book
        </Link>

        <Link to="/admin" onClick={closeMenu}>
          Admin Dashboard
        </Link>

        {user && (
          <Link to="/profile" onClick={closeMenu}>
            Profile
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
            Sign Out
          </button>
        ) : (
          <Link to="/signin" onClick={closeMenu}>
            Sign In
          </Link>
        )}

        <CurrencySelector />
      </nav>
    </header>
  )
}

export default Header
