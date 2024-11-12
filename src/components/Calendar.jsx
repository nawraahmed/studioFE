import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Client from '../services/api'
import Modal from 'react-modal'

Modal.setAppElement('#root')
const localizer = momentLocalizer(moment)

const CalendarComponent = () => {
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [serviceId, setServiceId] = useState('')
  const [services, setServices] = useState([])
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    // Get the user role from localStorage
    const role = localStorage.getItem('userRole')
    if (role) {
      setUserRole(role)
    }

    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) {
          console.error('User ID not found in localStorage')
          return
        }

        const response = await Client.get(`/userBookings/${userId}`)
        const formattedEvents = response.data.map((booking) => ({
          id: booking._id,
          title: booking.service?.name || 'Booking',
          start: new Date(booking.bookingDate),
          end: new Date(
            new Date(booking.bookingDate).getTime() + 2 * 60 * 60 * 1000
          ),
          color: '#5E6C5B' // Color for existing bookings
        }))

        setEvents([...formattedEvents])
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    }

    const fetchServices = async () => {
      try {
        const response = await Client.get('/service/services')
        setServices(response.data)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }

    fetchBookings()
    fetchServices()
  }, [])

  // Customize the event rendering to use the color property
  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.color,
      borderRadius: '8px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    }
    return {
      style: style
    }
  }

  // Render different views based on the user role
  if (userRole === 'admin') {
    return <div>admin view should be here</div>
  }

  return (
    <div>
      <h2>Booking Calendar</h2>
      <p>click any available slots to complete your booking process</p>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => {
          if (event.title.includes('Available Slot')) {
            setSelectedDate(event.start)
            setShowModal(true)
          }
        }}
      />
      {showModal && (
        <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
          <button
            className="calendar-modal-close"
            onClick={() => setShowModal(false)}
          >
            X
          </button>
          <div className="calendar-modal-header">
            <h3>Create a New Booking</h3>
          </div>
          <form className="calendar-form" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="serviceName">Service:</label>
              <select
                id="serviceName"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                required
              >
                <option value="">Select a Service</option>
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bookingDate">Booking Date:</label>
              <input
                type="datetime-local"
                id="bookingDate"
                value={selectedDate.toISOString().slice(0, 16)}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                required
              />
            </div>
            <button
              className="calendar-btn calendar-btn-submit"
              type="submit"
              onClick={handleCreateBooking}
            >
              Create Booking
            </button>
            <button
              className="calendar-btn calendar-btn-cancel"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default CalendarComponent
