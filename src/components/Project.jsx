import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Client from "../services/api"
import Review from "./Review"
import "../static/project.css" // External CSS file for styling

const Project = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await Client.get(`/projects/project/${projectId}`)
        setProject(res.data)
      } catch (error) {
        console.error("Error fetching project:", error)
        setMessage("Failed to load project")
      }
    }

    if (projectId) {
      fetchProject()
    }

    const role = localStorage.getItem("role")
    if (role) {
      setUserRole(role)
    }
  }, [projectId])

  const handleDelete = async () => {
    try {
      await Client.delete(`/projects/project/${projectId}`)
      setMessage("Project deleted successfully")
      navigate("/portfolio-list")
    } catch (error) {
      console.error("Error deleting project:", error)
      setMessage("Failed to delete project")
    }
  }

  const deleteFile = async (filePath) => {
    try {
      await Client.delete(`/projects/project/${projectId}/delete-file`, {
        data: { filePath },
      })
      setProject((prevProject) => ({
        ...prevProject,
        files: prevProject.files.filter((file) => file !== filePath),
      }))
      setMessage("File deleted successfully")
    } catch (error) {
      console.error("Error deleting file:", error)
      setMessage("Failed to delete file")
    }
  }

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
          className="project-file-image"
        />
      )
    } else if (fileExtension === "pdf") {
      return (
        <iframe
          src={adjustedUrl}
          type="application/pdf"
          width="100%"
          height="500px"
          className="project-file-pdf"
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
    <div className="project-container">
      {message && <p className="message">{message}</p>}
      {project ? (
        <div className="project-details">
          {userRole === "admin" && (
            <button
              onClick={() => navigate(`/project/${projectId}`)}
              className="edit-button"
            >
              <i className="fa fa-edit"></i> Edit Project
            </button>
          )}
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>
            <strong>Service:</strong> {project.service?.name_en}
          </p>
          <p>
            <strong>User:</strong> {project.user?.name}
          </p>

          <div className="project-files">
            <strong>Files:</strong>
            {project.files &&
              project.files.map((file, index) => (
                <div key={index} className="file-item">
                  {renderFile(file)}
                  {userRole === "admin" && (
                    <button
                      onClick={() => deleteFile(file)}
                      className="delete-file-button"
                    >
                      <i className="fa fa-trash"></i> Delete
                    </button>
                  )}
                </div>
              ))}
          </div>

          {userRole === "admin" && (
            <div className="delete-project-container">
              <button onClick={handleDelete} className="delete-project-button">
                Delete Project
              </button>
            </div>
          )}
          <div>
            <Review projectId={projectId} />
          </div>
        </div>
      ) : (
        <p>Loading project...</p>
      )}

      <div className="reviews-container">
        <Review projectId={projectId} />
      </div>
    </div>
  )
}

export default Project
