import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next" // Import the useTranslation hook
import axios from "axios"

const TotalBookings = () => {
  const { t } = useTranslation() // Get the translation function
  const [totalBookings, setTotalBookings] = useState(0)
  const [monthlyBookings, setMonthlyBookings] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/total-bookings")
        if (response.data) {
          setTotalBookings(response.data.totalBookings)
          setMonthlyBookings(response.data.monthlyBookings)
        }
      } catch (error) {
        console.error("Error fetching booking data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookingData()
  }, [])

  return (
    <div className="total-bookings-container">
      {loading ? (
        <p>{t("loading")}...</p> // Translated loading text
      ) : (
        <div className="admin-cards-container">
          <div className="admin-card">
            <h3>{t("all_time_bookings")}</h3> {/* Translated heading */}
            <p>{totalBookings}</p>
          </div>
          <div className="admin-card">
            <h3>{t("bookings_this_month")}</h3> {/* Translated heading */}
            <p>{monthlyBookings}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default TotalBookings
