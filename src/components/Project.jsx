import { useState, useEffect } from "react"
import Client from "../services/api"

export const GetProjects = async () => {
  try {
    const res = await Client.get("/projects/project")
    return res.data
  } catch (error) {
    console.error("Error fetching projects:", error)
    throw error
  }
}

export const createProject = async (projectData) => {
  try {
    const res = await Client.post("/projects/project", projectData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return res.data
  } catch (error) {
    throw error
  }
}

const Project = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [service, setService] = useState("")
  const [userId, setUserId] = useState("")
  const [files, setFiles] = useState([])
  const [projects, setProjects] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const projectsData = await GetProjects()
      setProjects(projectsData)
    } catch (error) {
      console.error("Error loading projects:", error)
    }
  }

  const handleFileChange = (e) => {
    setFiles(e.target.files)
  }

  const handleCreateProject = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("service", service)
    formData.append("userId", userId)
    Array.from(files).forEach((file) => formData.append("files", file))

    try {
      const newProject = await createProject(formData)
      setMessage(newProject.message)
      loadProjects()
    } catch (error) {
      setMessage("Error creating project")
      console.error(error)
    }
  }

  const renderFile = (fileUrl) => {
    // Prefix the file path with the backend URL
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
      <h3>Create a New Project</h3>
      <form onSubmit={handleCreateProject}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Service</label>
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          />
        </div>
        <div>
          <label>User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Files</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <button type="submit">Create Project</button>
      </form>

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
          <p>User: {project.user?.username}</p>
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
