import React, { useState, useEffect } from 'react'
import CalendarComponent from './Calendar'
import AdminCalendar from './AdminCalendar'

const CalendarWrapper = () => {
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    // Fetch the user role from localStorage or an API
    const role = localStorage.getItem('role')
    if (role) {
      console.log(`user role: ${role}`)
      setUserRole(role)
    }
  }, [])

  // Render the appropriate calendar based on the user role
  return (
    <div>
      {userRole === 'admin' ? (
        <AdminCalendar />
      ) : userRole === 'user' ? (
        <CalendarComponent />
      ) : (
        <p>Loading...</p> // Optional loading state if userRole isn't set yet
      )}
    </div>
  )
}

export default CalendarWrapper
