import React, { useState, useEffect } from "react"
import Client from "../services/api"

const NewPackage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    servicesIncluded: [],
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
      const response = await Client.post(`package/createPackage`, {
        ...formData,
      })
      if (response.status === 200) {
        navigate("/packages")
      }
    } catch (err) {
      console.log(err)
    }
    console.log("Package data submitted:", formData)
  }
  return (
    <div className="package">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Package Name:</label>
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
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Services Included:</label>
          <div
            className="services-list"
            style={{ maxHeight: "150px", overflowY: "auto" }}
          >
            {services.map((service) => (
              <div key={service._id}>
                <input
                  type="checkbox"
                  id={service._id}
                  checked={formData.servicesIncluded.includes(service._id)}
                  onChange={() => handleServiceChange(service._id)}
                />
                <label htmlFor={service._id}>{service.name}</label>
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
