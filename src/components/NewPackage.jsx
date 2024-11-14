import React, { useState, useEffect } from "react"
import Client from "../services/api"
import { useLocation, useNavigate } from "react-router-dom"
import "../static/package.css"

const NewPackage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const packageData = location.state?.packageData

  const [formData, setFormData] = useState({
    name: packageData?.name || "",
    description: packageData?.description || "",
    price: packageData?.price || 0,
    servicesIncluded:
      packageData?.servicesIncluded.map((service) => service._id) || [],
  })

  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await Client.get(`service/services`)
        setServices(response.data)
      } catch (error) {
        console.error("Error fetching services:", error)
      }
    }
    fetchServices()
    console.log(formData)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleServiceChange = (serviceId) => {
    setFormData((prevData) => ({
      ...prevData,
      servicesIncluded: prevData.servicesIncluded.includes(serviceId)
        ? prevData.servicesIncluded.filter((id) => id !== serviceId)
        : [...prevData.servicesIncluded, serviceId],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = packageData
        ? await Client.put(`package/packages/${packageData._id}`, formData)
        : await Client.post("package/createPackage", formData)

      navigate("/packages")
    } catch (error) {
      console.error("Error submitting package:", error)
    }
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Package Name:
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
            className="form-textarea"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="price">
            Price:
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="form-input"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Services Included:</label>
          <div className="services-list">
            {services.map((service) => (
              <div key={service._id} className="service-item">
                <input
                  type="checkbox"
                  id={service._id}
                  checked={formData.servicesIncluded.includes(service._id)}
                  onChange={() => handleServiceChange(service._id)}
                  className="form-checkbox"
                />
                <label htmlFor={service._id} className="service-label">
                  {service.name_en}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Save Package</button>
      </form>
    </div>
  )
}
export default NewPackage
