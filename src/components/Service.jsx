import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Client from "../services/api"
import { BASE_URL } from "../services/api"
import { useLocation, useNavigate } from "react-router-dom"
import ProductPrice from "./ProductPrice"
import { useTranslation } from "react-i18next"

const Service = () => {
  const [services, setServices] = useState([])
  const [userRole, setUserRole] = useState("")

  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const { t } = useTranslation()

  useEffect(() => {
    const role = localStorage.getItem("userRole")

    if (role) {
      setUserRole(role)
    }
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
      setServices((prevServices) =>
        prevServices.filter((service) => service._id !== serviceId)
      )
      console.log("Service deleted successfully")
    } catch (error) {
      console.error("Error deleting service:", error)
    }
  }

  const handleUpdate = (serviceData) => {
    navigate("/new-service", { state: { serviceData } })
  }

  return (
    <div className="container">
      <div className="service-intro">
        <div className="service-overlay"></div>
        <div className="service-content">
          <h1 className="service-heading">Our Services</h1>
          <p className="service-description">
            Discover a range of carefully crafted services designed to elevate
            your brand.
            <br />
            From branding to mobile development, we offer solutions tailored to
            your needs.
          </p>
          {userRole === "admin" && (
            <Link to="/new-service">
              <button className="service-btn">+ Add New Service</button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid">
        {services.length === 0 ? (
          <p>No services available</p>
        ) : (
          services.map((service) => (
            <div key={service._id} className="card">
              <h3>
                {i18n.language === "ar" ? service.name_ar : service.name_en}
              </h3>
              <p>
                {i18n.language === "ar"
                  ? service.description_ar
                  : service.description_en}
              </p>
              <p>
                <strong> {t("service.price")}</strong>{" "}
                <ProductPrice priceInBHD={service.startingPrice} />
              </p>

              {userRole === "admin" && (
                <div className="actions">
                  <button onClick={() => handleDelete(service._id)}>
                    Delete Service
                  </button>
                  <button onClick={() => handleUpdate(service)}>
                    Update Service
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Service
