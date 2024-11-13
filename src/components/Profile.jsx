import React, { useEffect, useState } from 'react'
import Client from '../services/api'
import ChangePassword from './ChangePassword'
import '../static/profile.css'

const Profile = ({ user }) => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showChangePassword, setShowChangePassword] = useState(false)

  console.log(user)

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!user) return
      setLoading(true)
      try {
        const response = await Client.get(`/userBookings/${user.id}`)
        setBookings(response.data)
      } catch (error) {
        console.error('Error fetching booking history:', error)
        setError('Failed to load booking history.')
      } finally {
        setLoading(false)
      }
    }
    fetchUserBookings()
  }, [user])

  const handleDelete = async (bookingId) => {
    try {
      await Client.delete(`/bookings/${bookingId}`)
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      )
    } catch (error) {
      console.error('Error deleting booking:', error)
      alert('Failed to delete booking. Please try again.')
    }
  }

  const toggleChangePasswordModal = () => {
    setShowChangePassword((prev) => !prev)
  }

  if (!user) return <p>Loading user data...</p>

  const isGoogleUser = !!user.googleId

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-header">
        <div className="avatar-container">
          <img
            src="https://i.pinimg.com/736x/f7/bd/a7/f7bda742ef6583feb9149ac24bf272ee.jpg"
            alt="User Avatar"
            className="avatar"
          />
        </div>
        <div className="user-info">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      </div>

      {!isGoogleUser && (
        <button
          className="change-password-button"
          onClick={toggleChangePasswordModal}
        >
          Change Password
        </button>
      )}

      {showChangePassword && !isGoogleUser && (
        <div className="unique-change-password-modal">
          <div className="unique-modal-content">
            <button
              className="unique-close-modal"
              onClick={toggleChangePasswordModal}
            >
              &times;
            </button>
            <ChangePassword />
          </div>
        </div>
      )}

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
                  <strong>Date:</strong>{' '}
                  {new Date(booking.bookingDate).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(booking._id)}
                >
                  Delete
                </button>
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
