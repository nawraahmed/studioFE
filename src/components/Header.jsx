import { useState } from "react"
import { Link } from "react-router-dom"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  console.log(isMenuOpen)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <header className="header">
      <div className="logo">design studio</div>

      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? "✕" : "☰"}
      </button>

      <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/packages">Packages</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/book">Book</Link>
      </nav>
    </header>
  )
}

export default Header
