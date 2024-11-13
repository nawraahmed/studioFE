import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Client from "../services/api"
import { BASE_URL } from "../services/api"
import { useNavigate } from "react-router-dom"
import ProductPrice from "./ProductPrice"
import { useTranslation } from "react-i18next" // Import useTranslation hook

const Service = () => {
  const { t } = useTranslation()
  const [services, setServices] = useState([])
  const navigate = useNavigate()

  // Fetch services from the API
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

  // Delete a service
  const handleDelete = async (serviceId) => {
    try {
      await Client.delete(`service/services/${serviceId}`)
      setServices((prevServices) =>
        prevServices.filter((service) => service._id !== serviceId)
      )
      console.log("Service deleted successfully")
    } catch (error) {
      console.error("Error deleting service:", error)
    }
  }

  // Update a service
  const handleUpdate = (serviceData) => {
    navigate("/new-service", { state: { serviceData } })
  }

  return (
    <div className="container">
      <div className="add-service">
        <Link to="/new-service">
          <button>{t("add_new_service")}</button>{" "}
          {/* Translate "Add New Service" */}
        </Link>
      </div>

      <div className="grid">
        {services.length === 0 ? (
          <p>{t("no_services_available")}</p>
        ) : (
          services.map((service) => (
            <div key={service._id} className="card">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p>
                <strong>{t("starting_from")}</strong>{" "}
                <ProductPrice priceInBHD={service.startingPrice} />
              </p>
              <button onClick={() => handleDelete(service._id)}>
                {t("delete_service")} {/* Translate "Delete Service" */}
              </button>
              <button onClick={() => handleUpdate(service)}>
                {t("update_service")} {/* Translate "Update Service" */}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Service
