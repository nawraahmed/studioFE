import React, { useState } from "react"
import Client from "../services/api"
import { BASE_URL } from "../services/api"

const AddService = () => {
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
      if (response.status === 200) {
        console.log("Service created successfully")
        // Optional: reset form data or navigate after success
        setFormData({
          name: "",
          description: "",
          startingPrice: 0,
        })
      }
    } catch (error) {
      console.error("Error creating service:", error)
    }
  }

  return (
    <div className="service">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Service Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
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
          <label htmlFor="startingPrice">Starting Price:</label>
          <input
            type="number"
            name="startingPrice"
            id="startingPrice"
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
