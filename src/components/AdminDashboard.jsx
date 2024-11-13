import React, { useState } from "react"
import { useTranslation } from "react-i18next" // Import the useTranslation hook
import LogsList from "./LogsList"
import UserManagement from "./UserManagement"
import TotalBookings from "./TotalBookings"

const AdminDashboard = () => {
  const { t } = useTranslation() // Get the t function for translations
  const [selectedSection, setSelectedSection] = useState("UserManagement") // Default to 'UserManagement'

  const renderSection = () => {
    switch (selectedSection) {
      case "UserManagement":
        return <UserManagement />
      case "TotalBookings":
        return <TotalBookings />
      case "LogsList":
        return <LogsList />
      default:
        return null
    }
  }

  return (
    <div className="dashboard-container">
      <h1>{t("admin_dashboard")}</h1> {/* Translate Admin Dashboard title */}
      <div className="dashboard-navigation">
        <button
          className={`navigation-button ${
            selectedSection === "UserManagement" ? "active" : ""
          }`}
          onClick={() => setSelectedSection("UserManagement")}
        >
          {t("user_management")}{" "}
          {/* Translate button text for User Management */}
        </button>
        <button
          className={`navigation-button ${
            selectedSection === "TotalBookings" ? "active" : ""
          }`}
          onClick={() => setSelectedSection("TotalBookings")}
        >
          {t("total_bookings")} {/* Translate button text for Total Bookings */}
        </button>
        <button
          className={`navigation-button ${
            selectedSection === "LogsList" ? "active" : ""
          }`}
          onClick={() => setSelectedSection("LogsList")}
        >
          {t("logs")} {/* Translate button text for Logs */}
        </button>
      </div>
      <div className="dashboard-sections">{renderSection()}</div>
    </div>
  )
}

export default AdminDashboard
