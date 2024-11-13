import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Client from "../services/api"
import "../static/project.css"

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
  const [loading, setLoading] = useState(true) // Added loading state

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesResponse = await Client.get("/service/services")
        console.log("Services fetched: ", servicesResponse.data) // Logging services
        setServices(servicesResponse.data)
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setLoading(false) // Stop loading once data is fetched
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
            files: projectResponse.data.files || [],
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setNewFiles((prevFiles) => [...prevFiles, ...selectedFiles])
  }

  const handleCoverImageChange = (e) => {
    const coverImage = e.target.files[0]
    setFormData((prevData) => ({ ...prevData, coverImage }))
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
    <div className="project-form-container">
      {message && <p className="message">{message}</p>}
      <h2>{isEditing ? "Edit Project" : "Add New Project"}</h2>
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="service">Service:</label>
          {loading ? (
            <p>Loading services...</p> // Display loading message
          ) : services.length === 0 ? (
            <p>No services available</p> // Display fallback message if no services
          ) : (
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
                  {service.name_en}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="coverImage">Cover Image:</label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            onChange={handleCoverImageChange}
          />
        </div>

        {isEditing && formData.coverImage && (
          <div className="current-cover">
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

        <div className="form-group">
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
          <div className="existing-files">
            <h4>Existing Files:</h4>
            <ul>
              {formData.files.map((file, index) => (
                <li key={index}>
                  {file}
                  <button
                    type="button"
                    onClick={() => handleFileRemove(file)}
                    className="remove-file-button"
                  >
                    <i className="fa fa-trash"></i> Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {newFiles.length > 0 && (
          <div className="new-files">
            <h4>New Files:</h4>
            <ul>
              {newFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="submit-button">
            {isEditing ? "Save Changes" : "Add Project"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewProject
