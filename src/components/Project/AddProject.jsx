import { useState, useEffect } from "react"
import Client from "../../services/api"

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

const AddProject = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [service, setService] = useState("")
  const [userId, setUserId] = useState("")
  const [files, setFiles] = useState([])

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
    </div>
  )
}

export default AddProject
