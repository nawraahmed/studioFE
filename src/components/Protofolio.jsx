import React from 'react'
import projects from '../services/project.js'
import Carousel from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Protofolio = () => {
  return (
    <div className="protofolio-slider">
      <Carousel
        slidesToShow={3}
        infinite={true}
        autoplay={true}
        autoplaySpeed={3000}
      >
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
            />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Protofolio
