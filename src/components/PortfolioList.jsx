import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Client from "../services/api"

const PortfolioList = () => {
  const [projects, setProjects] = useState([])
  const [selectedService, setSelectedService] = useState("All")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await Client.get("/projects/project")
        setProjects(res.data)
      } catch (error) {
        console.error("Error fetching projects:", error)
        setMessage("Failed to load projects")
      }
    }

    fetchProjects()
  }, [])

  // Get unique services for filter dropdown
  const services = [
    "All",
    ...new Set(
      projects.map((project) => project.service?.name || project.service)
    ),
  ]

  // Filtered projects based on selected service
  const filteredProjects =
    selectedService === "All"
      ? projects
      : projects.filter(
          (project) =>
            (project.service?.name || project.service) === selectedService
        )

  // Modal functions
  const openModal = (project) => {
    setCurrentProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentProject(null)
  }

  const viewProjectDetails = () => {
    if (currentProject) {
      navigate(`/projects/${currentProject._id}`)
      closeModal()
    }
  }

  const handleAddProject = () => {
    navigate("/projects")
  }

  return (
    <div className="portfolio-list">
      <div className="portfolio-header">
        <h2>Our Portfolio</h2>

        {message && <p className="error-message">{message}</p>}
        <div className="filter">
          <label htmlFor="service-filter">Filter by Service:</label>
          <select
            id="service-filter"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            {services.map((service, index) => (
              <option key={`${service}-${index}`} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="portfolio-items">
        {filteredProjects.length === 0 ? (
          <p>No projects available at the moment.</p>
        ) : (
          filteredProjects.map((project) => (
            <div key={project._id} className="portfolio-item">
              <div className="image-container">
                <img
                  src={
                    project.cover
                      ? `http://localhost:4000/${project.cover.replace(
                          /^public[\\/]+/,
                          ""
                        )}`
                      : "path/to/default-image.jpg"
                  }
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
          ))
        )}
        <button
          className="add-project-button"
          onClick={handleAddProject}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add New Project
        </button>
      </div>

      {isModalOpen && currentProject && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-left">
              <img
                src={`http://localhost:4000/${currentProject.cover.replace(
                  /^public[\\/]+/,
                  ""
                )}`}
                alt={currentProject.title}
                className="modal-image"
              />
            </div>
            <div className="modal-right">
              <h3 className="modal-title">{currentProject.title}</h3>
              <p className="modal-service-type">
                Service Type:{" "}
                {currentProject.service?.name || "Unknown Service"}
              </p>
              <p className="modal-description">{currentProject.description}</p>
              <button
                className="view-project-button"
                onClick={viewProjectDetails}
              >
                View Project
              </button>
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
