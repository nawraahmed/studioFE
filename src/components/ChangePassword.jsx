import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match')
      return
    }

    const data = { currentPassword, newPassword, confirmPassword }

    try {
      const response = await axios.post(
        'http://localhost:4000/auth/change-password',
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      setMessage(response.data.message)
      navigate('/admin')
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Something went wrong')
      } else {
        setError('Error updating password')
      }
    }
  }

  return (
    <div className="change-password-container">
      <h2 className="change-password-title">Change Password</h2>

      {message && <div className="change-password-success">{message}</div>}
      {error && <div className="change-password-error">{error}</div>}

      <form onSubmit={handleSubmit} className="change-password-form">
        <div className="change-password-form-group">
          <label htmlFor="currentPassword" className="change-password-label">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="change-password-input"
            required
          />
        </div>

        <div className="change-password-form-group">
          <label htmlFor="newPassword" className="change-password-label">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="change-password-input"
            required
          />
        </div>

        <div className="change-password-form-group">
          <label htmlFor="confirmPassword" className="change-password-label">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="change-password-input"
            required
          />
        </div>

        <button type="submit" className="change-password-button">
          Change Password
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
