import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Client from "../services/api"
import { BASE_URL } from "../services/api"

const Service = () => {
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

  const handleDelete = async (serviceId) => {
    console.log(serviceId)

    try {
      await Client.delete(`service/services/${serviceId}`)
      // Update the state by removing the deleted service
      setServices((prevServices) =>
        prevServices.filter((service) => service._id !== serviceId)
      )
      console.log("Service deleted successfully")
    } catch (error) {
      console.error("Error deleting service:", error)
    }
  }

  return (
    <div className="container">
      <div className="add-service">
        <Link to="/new-service">
          <button>Add New Service</button>
        </Link>
      </div>

      <div className="grid">
        {services.length === 0 ? (
          <p>No services available</p>
        ) : (
          services.map((service) => (
            <div key={service._id} className="card">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p>
                <strong>Starting from</strong> {service.startingPrice}
              </p>
              <button onClick={() => handleDelete(service._id)}>
                Delete Service
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Service
