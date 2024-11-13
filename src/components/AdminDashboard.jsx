import React, { useState, useNavigate } from 'react'
import LogsList from './LogsList'
import UserManagement from './UserManagement'
import TotalBookings from './TotalBookings'

const AdminDashboard = () => {
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

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-navigation">
        <button
          className={`navigation-button ${
            selectedSection === 'UserManagement' ? 'active' : ''
          }`}
          onClick={() => setSelectedSection('UserManagement')}
        >
          User Management
        </button>
        <button
          className={`navigation-button ${
            selectedSection === 'TotalBookings' ? 'active' : ''
          }`}
          onClick={() => setSelectedSection('TotalBookings')}
        >
          Total Bookings
        </button>
        <button
          className={`navigation-button ${
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

export default AdminDashboard
