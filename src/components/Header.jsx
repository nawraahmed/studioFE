import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <div className="logo">design studio</div>
      <nav className="nav-links">
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
