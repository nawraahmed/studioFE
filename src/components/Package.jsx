import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Client from "../services/api"
import PackageCard from "./PackageCard"
import "../static/package.css"

const Package = () => {
  const [packages, setPackages] = useState([])
  const [userRole, setUserRole] = useState("")
  useEffect(() => {
    const role = localStorage.getItem("userRole")

    if (role) {
      setUserRole(role)
    }
    const fetchPackages = async () => {
      try {
        const response = await Client.get("/package/packages")
        setPackages(response.data)
      } catch (err) {
        console.error("Error fetching packages:", err)
      }
    }
    fetchPackages()
  }, [])
  const handleDeletePackage = (packageId) => {
    setPackages(packages.filter((pkg) => pkg._id !== packageId))
  }

  return (
    <div className="container">
      <div className="headerpkg">
        <div className="headecontent">
          <h3>All Packages</h3>
          {userRole === "admin" && (
            <Link to="/new-package">
              <button className="add-btn">+ Add New Package</button>
            </Link>
          )}
        </div>
      </div>

      <div className="package-list">
        {packages.length === 0 ? (
          <p>No packages available at the moment.</p>
        ) : (
          packages.map((pkg) => (
            <PackageCard
              key={pkg._id}
              packageData={pkg}
              onDelete={handleDeletePackage}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Package
