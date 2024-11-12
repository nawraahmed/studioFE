import React, { useEffect, useState } from "react"
import Client from "../services/api"
import ChangePassword from "./ChangePassword"

const Profile = ({ user }) => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  console.log(user)

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!user) return // Exit if user is not available
      setLoading(true)
      try {
        const response = await Client.get(`/userBookings/${user.id}`)
        setBookings(response.data)
      } catch (error) {
        console.error("Error fetching booking history:", error)
        setError("Failed to load booking history.")
      } finally {
        setLoading(false)
      }
    }
    fetchUserBookings()
  }, [user])

  if (!user) return <p>Loading user data...</p>

  // Check if the user is a Google sign-in user (no need to change password)
  const isGoogleUser = !!user.googleId

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      {/* Render ChangePassword only if the user is not a Google sign-in user */}
      {!isGoogleUser && <ChangePassword />}

      <div className="booking-history">
        <h3>Booking History</h3>
        {loading ? (
          <p>Loading booking history...</p>
        ) : error ? (
          <p>{error}</p>
        ) : bookings.length ? (
          <div className="booking-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-item">
                <p>
                  <strong>Service:</strong> {booking.service.name}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(booking.bookingDate).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  )
}

export default Profile