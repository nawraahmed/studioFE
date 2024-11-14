import React, { useState, useEffect } from "react"
import Client from "../services/api"
import { useNavigate } from "react-router-dom"
import ProductPrice from "./ProductPrice"
import "../static/package.css"

const PackageCard = ({ packageData, onDelete }) => {
  const [userRole, setUserRole] = useState("")
  useEffect(() => {
    const role = localStorage.getItem("userRole")

    if (role) {
      setUserRole(role)
    }
    checkAndDeletePackage(packageData._id, packageData.servicesIncluded)
  }, [packageData.servicesIncluded])

  const navigate = useNavigate()

  const [isActive, setIsActive] = useState(packageData.isActive)

  const handleDelete = async (packageId) => {
    try {
      const response = await Client.delete(`/package/packages/${packageId}`)
      if (response.status === 200) {
        onDelete(packageId)
      }
    } catch (error) {
      console.error("Failed to delete package:", error)
    }
  }

  const handleUpdate = () => {
    navigate("/new-package", { state: { packageData } })
  }
  const handleBookNow = () => {
    navigate("/book")
  }

  const handleToggle = async () => {
    try {
      const response = await Client.put(
        `/package//packages/${packageData._id}/toggle`
      )
      if (response.status === 200) {
        setIsActive(!isActive)
      }
    } catch (error) {
      console.error("Failed to toggle package activation:", error)
    }
  }
  const checkAndDeletePackage = async (packageId, servicesIncluded) => {
    if (servicesIncluded.length < 2) {
      console.log(
        "Package has fewer than two services, deleting the package..."
      )
      await handleDelete(packageId)
    }
  }

  return (
    <div>
      <div className="price-box">
        <strong>Price: {packageData.price} BHD</strong>
      </div>
      <div className="card package">
        {userRole === "admin" && (
          <div>
            <div className="toggle-switch" onClick={handleToggle}>
              <input
                type="checkbox"
                checked={isActive}
                onChange={handleToggle}
                style={{ display: "none" }}
              />
              <span className={`slider ${isActive ? "active" : ""}`}></span>
            </div>
          </div>
        )}
        <h3>{packageData.name}</h3>
        <p>{packageData.description}</p>
        <div>
          <h4>Included Services:</h4>
          <ul>
            {packageData.servicesIncluded.map((service) => (
              <li key={service._id}>{service.name_en}</li>
            ))}
          </ul>
        </div>
        <div className="action-group">
          {userRole === "admin" && (
            <div>
              <button onClick={() => handleDelete(packageData._id)}>
                Delete Package
              </button>
              <button onClick={handleUpdate}>Update Package</button>
            </div>
          )}
          <button onClick={handleBookNow}>Book Now</button>
        </div>
      </div>
    </div>
  )
}

export default PackageCard
