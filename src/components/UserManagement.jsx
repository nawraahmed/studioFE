import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next" // Import the useTranslation hook
import Client from "../services/api"
import axios from "axios"

const UserManagement = () => {
  const { t } = useTranslation() // Get the translation function
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [selectedUserBookings, setSelectedUserBookings] = useState({})
  const [loading, setLoading] = useState(false)
  const [showBookings, setShowBookings] = useState({})

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users")
        setUsers(response.data)
      } catch (err) {
        console.error("Error fetching users:", err)
        setError(t("fetch_users_error")) // Translation key for error
      }
    }
    fetchUsers()
  }, [t])

  const deleteUser = async (userId) => {
    try {
      await Client.delete(`/api/users/${userId}`)
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
    } catch (err) {
      console.error("Error deleting user:", err)
      setError(t("delete_user_error")) // Translation key for error
    }
  }

  const getUserBookings = async (userId) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `http://localhost:4000/userBookings/${userId}`
      )
      setSelectedUserBookings((prevBookings) => ({
        ...prevBookings,
        [userId]: response.data.length ? response.data : t("no_bookings_found"), // Translation for "No bookings found"
      }))
    } catch (error) {
      console.error("Error fetching bookings:", error)
      setError(t("fetch_bookings_error")) // Translation key for error
    } finally {
      setLoading(false)
    }
  }

  const toggleBookings = (userId) => {
    setShowBookings((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }))
  }

  return (
    <div className="user-management-container">
      {error && <p className="admin-error-message">{error}</p>}
      <div className="admin-cards-container">
        {users.length ? (
          users.map((user) => (
            <div className="admin-card" key={user._id}>
              <h3>{user.name}</h3>
              <button
                className="admin-card-button"
                onClick={() => {
                  getUserBookings(user._id)
                  toggleBookings(user._id)
                }}
              >
                {showBookings[user._id]
                  ? t("hide_booking_history")
                  : t("view_booking_history")}{" "}
              </button>
              <button
                className="admin-card-button admin-delete-button"
                onClick={() => deleteUser(user._id)}
              >
                <i className="fas fa-trash"></i> {t("delete_user")}{" "}
                {/* Translated text */}
              </button>
              {showBookings[user._id] && selectedUserBookings[user._id] && (
                <div className="admin-booking-history">
                  <h4>{t("booking_history")}</h4> {/* Translated heading */}
                  {loading ? (
                    <p>{t("loading")}...</p> // Translated loading text
                  ) : Array.isArray(selectedUserBookings[user._id]) ? (
                    <div className="admin-booking-list">
                      {selectedUserBookings[user._id].map((booking) => (
                        <div className="admin-booking-card" key={booking._id}>
                          <div>
                            <strong>{t("service")}:</strong>{" "}
                            {booking.service.name} {/* Translated label */}
                          </div>
                          <div>
                            <strong>{t("date")}:</strong>{" "}
                            {new Date(booking.bookingDate).toLocaleString()}{" "}
                            {/* Translated label */}
                          </div>
                          <div>
                            <strong>{t("status")}:</strong> {booking.status}{" "}
                            {/* Translated label */}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{selectedUserBookings[user._id]}</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>{t("no_users_found")}</p>
        )}
      </div>
    </div>
  )
}

export default UserManagement
