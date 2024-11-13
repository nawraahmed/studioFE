import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Client from "../services/api"
import PackageCard from "./PackageCard"
import "../static/package.css"

const Package = () => {
  const [packages, setPackages] = useState([])

  useEffect(() => {
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
      <div className="add-service">
        <h3>All Packages</h3>
        <Link to="/new-package">
          <button>+ Add New Package</button>
        </Link>
      </div>
      <div className="grid">
        {packages.length === 0 ? (
          <p>No packages available at the moment.</p>
        ) : (
          packages.map((pkg) => (
            <div key={pkg._id}>
              <PackageCard packageData={pkg} onDelete={handleDeletePackage} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Package
