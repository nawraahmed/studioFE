// Project.js
import { useState, useEffect } from "react"
import Client from "../services/api"

const Project = () => {
  const [projects, setProjects] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    const GetProjects = async () => {
      try {
        const res = await Client.get("/projects/project")
        setProjects(res.data)
      } catch (error) {
        console.error("Error fetching projects:", error)
        setMessage("Failed to load projects")
      }
    }

    GetProjects()
  }, [])

  const renderFile = (fileUrl) => {
    const adjustedUrl = `http://localhost:4000/${fileUrl.replace(
      /^public[\\/]+/,
      ""
    )}`
    const fileExtension = adjustedUrl.split(".").pop().toLowerCase()

    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      return (
        <img
          src={adjustedUrl}
          alt="project-file"
          style={{ maxWidth: "40%", height: "40%" }}
        />
      )
    } else if (fileExtension === "pdf") {
      return (
        <iframe
          src={adjustedUrl}
          type="application/pdf"
          width="100%"
          height="500px"
          style={{ border: "none" }}
          title="PDF Preview"
        ></iframe>
      )
    } else {
      return (
        <a href={adjustedUrl} target="_blank" rel="noopener noreferrer">
          {fileUrl}
        </a>
      )
    }
  }

  return (
    <div>
      {message && <p>{message}</p>}
      <h3>All Projects</h3>
      {projects.map((project) => (
        <div
          key={project._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>Service: {project.service?.name}</p>
          <p>User: {project.user?.name}</p>
          <div>
            <strong>Files:</strong>
            {project.files.map((file, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                {renderFile(file)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Project
