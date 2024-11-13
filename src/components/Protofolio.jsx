import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Client from "../services/api" // Your API service
import Carousel from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Protofolio = () => {
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await Client.get("/projects/project")
        setProjects(res.data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      }
    }

    fetchProjects()
  }, [])

  // Handle when a project is clicked to view its details
  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`) // Navigate to the project details page
  }

  return (
    <div className="protofolio-slider">
      <Carousel
        slidesToShow={3}
        infinite={true}
        autoplay={true}
        autoplaySpeed={3000}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            onClick={() => handleProjectClick(project._id)} // Make the whole card clickable
            style={{ cursor: "pointer" }} // Optional: make the cursor a pointer to indicate it's clickable
          >
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
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Protofolio
