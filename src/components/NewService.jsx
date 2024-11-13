import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Client from "../services/api"

const NewService = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const serviceData = location.state?.serviceData

  const [formData, setFormData] = useState({
    name_en: serviceData?.name_en || "",
    name_ar: serviceData?.name_ar || "",
    description_en: serviceData?.description_en || "",
    description_ar: serviceData?.description_ar || "",
    startingPrice: serviceData?.startingPrice || 0,
  })

  useEffect(() => {
    if (serviceData) {
      console.log("Editing existing service:", formData)
    } else {
      console.log("Creating a new service")
    }
  }, [serviceData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (serviceData) {
        await Client.put(`service/services/${serviceData._id}`, formData)
        console.log("Service updated successfully")
      } else {
        await Client.post("service/createService", formData)
        console.log("Service created successfully")
      }
      navigate("/services")
    } catch (error) {
      console.error("Error submitting service:", error)
    }
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name_en">
            Service Name (English):
          </label>
          <input
            type="text"
            name="name_en"
            id="name_en"
            className="form-input"
            value={formData.name_en}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="name_ar">
            Service Name (Arabic):
          </label>
          <input
            type="text"
            name="name_ar"
            id="name_ar"
            className="form-input"
            value={formData.name_ar}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description_en">
            Description (English):
          </label>
          <textarea
            name="description_en"
            id="description_en"
            className="form-textarea"
            value={formData.description_en}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description_ar">
            Description (Arabic):
          </label>
          <textarea
            name="description_ar"
            id="description_ar"
            className="form-textarea"
            value={formData.description_ar}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="startingPrice">
            Starting Price:
          </label>
          <input
            type="number"
            name="startingPrice"
            id="startingPrice"
            className="form-input"
            value={formData.startingPrice}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">
          {serviceData ? "Update Service" : "Create Service"}
        </button>
      </form>
    </div>
  )
}

export default NewService
