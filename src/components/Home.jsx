import React from 'react'
import { Link } from 'react-router-dom'
import Protofolio from './Protofolio'
import '../static/home.css'

const Home = () => {
  return (
    <div className="home">
      <div className="top-section">
        <div className="text-content">
          <p className="home-p">
            Professional branding services tailored to make your
            <br />
            business stand out. Book an appointment and
            <br />
            explore our work.
          </p>

          <button className="book-session-btn">Book A Session!</button>

          <div className="separator">
            <span>_________________or_________________</span>
          </div>

          <Link to="/portfolio-list" className="portfolio-link">
            View Our Portfolio
          </Link>
        </div>

        <img
          src="https://i.pinimg.com/736x/82/fc/35/82fc3581d01d79e05be9a82f4bab6898.jpg" // Replace with your actual image path
          alt="Decorative or branding"
          className="right-image"
        />
      </div>

      <h1 className="featured-title">Featured Projects</h1>
      <Protofolio />
    </div>
  )
}

export default Home
