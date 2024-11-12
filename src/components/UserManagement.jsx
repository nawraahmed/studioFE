import React, { useEffect, useState } from 'react'
import Client from '../services/api'
import axios from 'axios'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [selectedUserBookings, setSelectedUserBookings] = useState({})
  const [loading, setLoading] = useState(false)
  const [showBookings, setShowBookings] = useState({})

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users')
        setUsers(response.data)
      } catch (err) {
        console.error('Error fetching users:', err)
        setError('Failed to fetch users.')
      }
    }
    fetchUsers()
  }, [])

  const deleteUser = async (userId) => {
    try {
      await Client.delete(`/api/users/${userId}`)
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
    } catch (err) {
      console.error('Error deleting user:', err)
      setError('Failed to delete user.')
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
        [userId]: response.data.length ? response.data : 'No bookings found'
      }))
    } catch (error) {
      console.error('Error fetching bookings:', error)
      setError('Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }

  const toggleBookings = (userId) => {
    setShowBookings((prev) => ({
      ...prev,
      [userId]: !prev[userId]
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
                  ? 'Hide Booking History'
                  : 'View Booking History'}
              </button>
              <button
                className="admin-card-button admin-delete-button"
                onClick={() => deleteUser(user._id)}
              >
                <i className="fas fa-trash"></i>
              </button>
              {showBookings[user._id] && selectedUserBookings[user._id] && (
                <div className="admin-booking-history">
                  <h4>Booking History</h4>
                  {loading ? (
                    <p>Loading...</p>
                  ) : Array.isArray(selectedUserBookings[user._id]) ? (
                    <div className="admin-booking-list">
                      {selectedUserBookings[user._id].map((booking) => (
                        <div className="admin-booking-card" key={booking._id}>
                          <div>
                            <strong>Service:</strong> {booking.service.name}
                          </div>
                          <div>
                            <strong>Date:</strong>{' '}
                            {new Date(booking.bookingDate).toLocaleString()}
                          </div>
                          <div>
                            <strong>Status:</strong> {booking.status}
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
          <p>No users found.</p>
        )}
      </div>
    </div>
  )
}

export default UserManagement
