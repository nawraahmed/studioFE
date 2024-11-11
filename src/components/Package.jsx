import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Client from "../services/api"
import PackageCard from "./PackageCard"

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

  return (
    <div className="container">
      <div className="section-header">
        <h3>All Packages</h3>
        <Link to="/new-package">
          <button className="button">+ Add New Package</button>
        </Link>
      </div>

      {packages.length === 0 ? (
        <p>No packages available at the moment.</p>
      ) : (
        <div className="card-container">
          {packages.map((pkg) => (
            <div className="card" key={pkg._id}>
              <PackageCard packageData={pkg} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Package
