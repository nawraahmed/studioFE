import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Client from "../services/api"
import PackageCard from "./PackageCard"
import { useTranslation } from "react-i18next" // Import useTranslation hook

const Package = () => {
  const { t } = useTranslation() // Get the t function for translations
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
        <h3>{t("all_packages")}</h3> {/* Translated heading */}
        <Link to="/new-package">
          <button>{t("add_new_package")}</button> {/* Translated button */}
        </Link>
      </div>
      <div className="grid">
        {packages.length === 0 ? (
          <p>{t("no_packages_available")}</p>
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
