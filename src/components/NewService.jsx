import React, { useState } from "react"
import Client from "../services/api"
import { useNavigate } from "react-router-dom"

const AddService = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startingPrice: 0,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Client.post(`service/createService`, {
        ...formData,
      })
      console.log("Service created successfully")
      navigate("/services")
      setFormData({
        name: "",
        description: "",
        startingPrice: 0,
      })
    } catch (error) {
      console.error("Error creating service:", error)
    }
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Service Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            className="form-input"
            value={formData.description}
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
        <button type="submit">Save Service</button>
      </form>
    </div>
  )
}

export default AddService
