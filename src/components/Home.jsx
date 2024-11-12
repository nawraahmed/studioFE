import React from 'react'
import { Link } from 'react-router-dom'
import Protofolio from './Protofolio'

const Home = () => {
  return (
    <div className="home">
      <Link to="/portfolio-list" className="portfolio-link">
        View Our Portfolio
      </Link>
      <h1>Featured Projects</h1>
      <Protofolio />
    </div>
  )
}

export default Home
