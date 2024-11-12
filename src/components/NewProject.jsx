import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Client from "../services/api"

const NewProject = () => {
  const navigate = useNavigate()
  const initialState = {
    title: "",
    description: "",
    service: "",
    files: [],
  }

  const [formData, setFormData] = useState(initialState)
  const [services, setServices] = useState([])
  const [message, setMessage] = useState("")

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
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, files: e.target.files }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formDataToSubmit = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "files") {
        formDataToSubmit.append(key, value)
      }
    })

    Array.from(formData.files).forEach((file) => {
      formDataToSubmit.append("files", file)
    })

    try {
      const token = localStorage.getItem("token")
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
        navigate("/projects")
      } else {
        setMessage("Failed to create project")
      }

      setFormData(initialState)
    } catch (error) {
      console.error("Error uploading form and file:", error)
      setMessage("Error uploading form and file.")
    }
  }

  return (
    <div className="add-project">
      {message && <p>{message}</p>}
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
          <label htmlFor="files">Upload Files:</label>
          <input
            type="file"
            name="files"
            id="files"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Save Project</button>
      </form>
    </div>
  )
}

export default NewProject
