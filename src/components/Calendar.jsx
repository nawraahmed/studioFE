import AwesomeCalendar from 'react-awesome-calendar'
import { useState, useEffect } from 'react'
import Client from '../services/api'

const Calendar = () => {
  const [events, setEvents] = useState([])

  // Retrieve the user role from localStorage
  const userRole = localStorage.getItem('role')
  console.log('User role:', userRole) // Log the user role

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Retrieve the user ID from localStorage
        const userId = localStorage.getItem('userId')

        if (!userId) {
          console.error('User ID not found in localStorage')
          return
        }

        const response = await Client.get(`/userBookings/${userId}`)

        // Map the response data to match the format expected by AwesomeCalendar
        const formattedEvents = response.data.map((booking) => ({
          id: booking._id, // Assuming each booking has a unique _id
          color: '#5E6C5B', // Set a default color or customize as needed
          from: new Date(booking.bookingDate).toISOString(),
          to: new Date(
            new Date(booking.bookingDate).getTime() + 2 * 60 * 60 * 1000
          ).toISOString(), // Adjust the end time as needed
          title: booking.serviceName || 'Booking' // Replace with the appropriate property
        }))

        setEvents(formattedEvents)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    }

    fetchBookings()
  }, [])

  return (
    <div>
      <h2 className="custom-heading">Calendar</h2>

      <AwesomeCalendar events={events} />
    </div>
  )
}

export default Calendar
