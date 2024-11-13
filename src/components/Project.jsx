import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import Client from "../services/api"
import Review from "./Review"

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
        data: { filePath }, // Sending filePath in the request body
      })
      // Remove the deleted file from the project state
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
      {project ? (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          {userRole === "admin" && (
            <button
              onClick={() => navigate(`/project/${projectId}`)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#007bff",
              }}
            >
              <i className="fa fa-edit"></i> Edit Project
            </button>
          )}
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>Service: {project.service?.name}</p>
          <p>User: {project.user?.name}</p>

          <div>
            <strong>Files:</strong>
            {project.files &&
              project.files.map((file, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  {renderFile(file)}
                  {userRole === "admin" && (
                    <button
                      onClick={() => deleteFile(file)}
                      style={{
                        color: "red",
                        border: "none",
                        cursor: "pointer",
                        background: "transparent",
                        padding: "5px",
                      }}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  )}
                </div>
              ))}
          </div>

          {userRole === "admin" && (
            <div>
              <button
                onClick={handleDelete}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Delete Project
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading project...</p>
      )}
      <div>
        <Review projectId={projectId} />
      </div>
    </div>
  )
}

export default Project
