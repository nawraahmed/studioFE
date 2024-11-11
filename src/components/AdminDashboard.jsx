import React, { useState, useNavigate } from 'react'
import LogsList from './LogsList'
import UserManagement from './UserManagement'
import TotalBookings from './TotalBookings'

const AdminDashboard = ({ user }) => {
  const [selectedSection, setSelectedSection] = useState('UserManagement') // Default to 'UserManagement'

  const renderSection = () => {
    switch (selectedSection) {
      case 'UserManagement':
        return <UserManagement />
      case 'TotalBookings':
        return <TotalBookings />
      case 'LogsList':
        return <LogsList />
      default:
        return null
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/') // Redirect to homepage if not an admin
    }
  }, [user, navigate])

  if (user?.role === 'admin') {
    return (
      <div className="dashboard-container">
        <h1>Admin Dashboard</h1>

        <div className="dashboard-navigation">
          <button
            className={`nav-button ${
              selectedSection === 'UserManagement' ? 'active' : ''
            }`}
            onClick={() => setSelectedSection('UserManagement')}
          >
            User Management
          </button>
          <button
            className={`nav-button ${
              selectedSection === 'TotalBookings' ? 'active' : ''
            }`}
            onClick={() => setSelectedSection('TotalBookings')}
          >
            Total Bookings
          </button>
          <button
            className={`nav-button ${
              selectedSection === 'LogsList' ? 'active' : ''
            }`}
            onClick={() => setSelectedSection('LogsList')}
          >
            Logs
          </button>
        </div>

        <div className="dashboard-sections">{renderSection()}</div>
      </div>
    )
  }
  return null // Render nothing if user is not admin
}

export default AdminDashboard
