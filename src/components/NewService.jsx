import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Client from "../services/api"
import { useTranslation } from "react-i18next" // Import useTranslation hook

const NewService = () => {
  const { t } = useTranslation() // Get the t function for translations
  const navigate = useNavigate()
  const location = useLocation()
  const serviceData = location.state?.serviceData

  // Initialize the form data with multilingual support for name and description
  const [formData, setFormData] = useState({
    name: {
      en: serviceData?.name?.en || "",
      ar: serviceData?.name?.ar || "",
    },
    description: {
      en: serviceData?.description?.en || "",
      ar: serviceData?.description?.ar || "",
    },
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
    const [field, lang] = name.split(".") // Extract field name and language (e.g., "name.en")

    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        [lang]: value,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const servicePayload = {
        name: formData.name, // { en: 'English name', ar: 'Arabic name' }
        description: formData.description, // { en: 'English description', ar: 'Arabic description' }
        startingPrice: formData.startingPrice,
      }

      if (serviceData) {
        // Update the existing service
        await Client.put(`service/services/${serviceData._id}`, servicePayload)
        console.log("Service updated successfully")
      } else {
        // Create a new service
        await Client.post("service/createService", servicePayload)
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
          <label className="form-label" htmlFor="name-en">
            {t("service_name")} {/* Translate "Service Name" */}
          </label>
          <input
            type="text"
            name="name.en" // Name for English
            id="name-en"
            className="form-input"
            value={formData.name.en}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="name-ar">
            {t("service_name_ar")} {/* Translate "Service Name (Arabic)" */}
          </label>
          <input
            type="text"
            name="name.ar" // Name for Arabic
            id="name-ar"
            className="form-input"
            value={formData.name.ar}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description-en">
            {t("description")} {/* Translate "Description" */}
          </label>
          <textarea
            name="description.en" // Description for English
            id="description-en"
            className="form-textarea"
            value={formData.description.en}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description-ar">
            {t("description_ar")} {/* Translate "Description (Arabic)" */}
          </label>
          <textarea
            name="description.ar" // Description for Arabic
            id="description-ar"
            className="form-textarea"
            value={formData.description.ar}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="startingPrice">
            {t("starting_price")} {/* Translate "Starting Price" */}
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
          {serviceData ? t("update_service") : t("create_service")}{" "}
          {/* Translate buttons */}
        </button>
      </form>
    </div>
  )
}

export default NewService
