import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Client from "../services/api"

const NewProject = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()

  const initialState = {
    title: "",
    description: "",
    service: "",
    files: [],
    coverImage: null,
  }

  const [formData, setFormData] = useState(initialState)
  const [services, setServices] = useState([])
  const [message, setMessage] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [newFiles, setNewFiles] = useState([])

  // Fetch available services and project data if editing an existing project
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesResponse = await Client.get("/service/services")
        setServices(servicesResponse.data)
      } catch (error) {
        console.error("Error fetching services:", error)
      }
    }
    fetchServices()

    if (projectId) {
      setIsEditing(true)
      const fetchProject = async () => {
        try {
          const projectResponse = await Client.get(
            `/projects/project/${projectId}`
          )
          setFormData({
            title: projectResponse.data.title,
            description: projectResponse.data.description,
            service: projectResponse.data.service?._id || "",
            files: projectResponse.data.files || [], //
            coverImage: projectResponse.data.cover || null,
          })
        } catch (error) {
          console.error("Error fetching project:", error)
          setMessage("Failed to load project")
        }
      }
      fetchProject()
    }
  }, [projectId])

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setNewFiles((prevFiles) => [...prevFiles, ...selectedFiles])
  }

  const handleCoverImageChange = (e) => {
    const coverImage = e.target.files[0] // Only one file should be selected for cover image
    setFormData((prevData) => ({ ...prevData, coverImage }))
  }

  const handleFileRemove = async (filePath) => {
    try {
      await Client.delete(`/projects/project/${projectId}/delete-file`, {
        data: { filePath },
      })
      setFormData((prevProject) => ({
        ...prevProject,
        files: prevProject.files.filter((file) => file !== filePath),
      }))
      setMessage("File deleted successfully")
    } catch (error) {
      console.error("Error deleting file:", error)
      setMessage("Failed to delete file")
    }
  }

  const handleCancel = () => {
    isEditing ? navigate(`/projects/${projectId}`) : navigate(`/portfolio-list`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formDataToSubmit = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "files" && key !== "coverImage") {
        formDataToSubmit.append(key, value)
      }
    })
    if (formData.coverImage) {
      formDataToSubmit.append("cover", formData.coverImage)
    }

    formData.files.forEach((file) => {
      formDataToSubmit.append("files", file)
    })

    newFiles.forEach((file) => {
      formDataToSubmit.append("files", file)
    })

    try {
      const token = localStorage.getItem("token")

      if (isEditing) {
        const response = await Client.put(
          `/projects/project/${projectId}`,
          formDataToSubmit,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.status === 200) {
          setMessage("Project updated successfully")
          navigate(`/projects/${response.data.project._id}`)
        } else {
          setMessage("Failed to update project")
        }
      } else {
        const response = await Client.post(
          "/projects/project",
          formDataToSubmit,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.status === 201) {
          setMessage("Project created successfully")
          navigate(`/projects/${response.data.project._id}`)
        } else {
          setMessage("Failed to create project")
        }
      }

      setFormData(initialState)
      setNewFiles([])
    } catch (error) {
      console.error("Error submitting form:", error)
      setMessage("Error submitting project.")
    }
  }

  return (
    <div className="project-form">
      {message && <p>{message}</p>}
      <h2>{isEditing ? "Edit Project" : "Add New Project"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Project Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="service">Service:</label>
          <select
            name="service"
            id="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="coverImage">Cover Image:</label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            onChange={handleCoverImageChange}
          />
        </div>

        {isEditing && formData.coverImage && (
          <div>
            <h4>Current Cover Image:</h4>
            <img
              src={`http://localhost:4000/${formData.coverImage.replace(
                /^public[\\/]+/,
                ""
              )}`}
              alt="Cover"
              width="200"
            />
          </div>
        )}

        <div>
          <label htmlFor="files">Upload Files:</label>
          <input
            type="file"
            name="files"
            id="files"
            multiple
            onChange={handleFileChange}
          />
        </div>

        {isEditing && formData.files.length > 0 && (
          <div>
            <h4>Existing Files:</h4>
            <ul>
              {formData.files.map((file, index) => (
                <li key={index}>
                  {renderFile(file)}
                  <span>
                    {file}{" "}
                    <button
                      type="button"
                      onClick={() => handleFileRemove(file)}
                      style={{
                        color: "red",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                    >
                      <i className="fa fa-trash"></i> Remove
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {newFiles.length > 0 && (
          <div>
            <h4>New Files:</h4>
            <ul>
              {newFiles.map((file, index) => (
                <li key={index}>
                  <span>{file.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit">
          {isEditing ? "Save Changes" : "Add Project"}
        </button>

        <button
          type="button"
          onClick={handleCancel}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default NewProject
