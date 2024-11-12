import React, { useState } from 'react'
import projects from '../services/project.js'

const PortfolioList = () => {
  const [selectedService, setSelectedService] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)

  const services = [
    'All',
    ...new Set(projects.map((project) => project.service))
  ]

  const filteredProjects =
    selectedService === 'All'
      ? projects
      : projects.filter((project) => project.service === selectedService)

  const openModal = (project) => {
    setCurrentProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentProject(null)
  }

  return (
    <div className="portfolio-list">
      <div className="portfolio-header">
        <h2>Our Portfolio</h2>

        <div className="filter">
          <label htmlFor="service-filter">Filter by Service:</label>
          <select
            id="service-filter"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="portfolio-items">
        {filteredProjects.map((project, index) => (
          <div key={index} className="portfolio-item">
            <div className="image-container">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
            </div>
            <h3 className="project-title">{project.title}</h3>
            <button
              className="view-details-button"
              onClick={() => openModal(project)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && currentProject && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-left">
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="modal-image"
              />
            </div>
            <div className="modal-right">
              <h3 className="modal-title">{currentProject.title}</h3>
              <p className="modal-service-type">
                Service Type: {currentProject.service}
              </p>
              <p className="modal-description">{currentProject.description}</p>
              <button className="view-project-button">View Project</button>
            </div>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default PortfolioList
