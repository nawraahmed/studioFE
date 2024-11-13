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
  const [selectedSlotId, setSelectedSlotId] = useState(null)
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    // Set user role from localStorage
    const role = localStorage.getItem('userRole')

    if (role) {
      setUserRole(role)
    }

    // Fetch all required data concurrently

    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) {
          console.error('User ID not found in localStorage')
          return
        }

        // Fetch bookings separately and handle potential empty responses or errors
        let formattedBookings = []
        try {
          const bookingsResponse = await Client.get(`/userBookings/${userId}`)
          formattedBookings = bookingsResponse.data.map((booking) => ({
            id: booking._id,
            title: booking.service?.name || 'Booking',
            start: new Date(booking.bookingDate),
            end: new Date(
              new Date(booking.bookingDate).getTime() + 2 * 60 * 60 * 1000
            ),
            color: '#5E6C5B' // Color for existing bookings
          }))
        } catch (error) {
          console.warn('No bookings found or error fetching bookings:', error)
        }

        // Fetch services and slots without relying on user bookings
        const [servicesResponse, slotsResponse] = await Promise.all([
          Client.get('/service/services'),
          Client.get('/slot/slots')
        ])

        // Format and set available slots data
        const formattedSlots = slotsResponse.data.map((slot) => ({
          id: slot._id,
          title: slot.title,
          start: new Date(slot.start),
          end: new Date(slot.end),
          color: slot.color || '#85C1E9'
        }))

        // Combine bookings and slots into events
        setEvents([...formattedBookings, ...formattedSlots])
        console.log('Services Response:', servicesResponse.data)
        setServices(servicesResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
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

  const handleCreateBooking = async () => {
    try {
      // Logic for creating a new booking
      if (!serviceId || !selectedDate) {
        alert('Please select a service and date')
        return
      }

      const userId = localStorage.getItem('userId')

      if (!userId) {
        alert('User ID not found')

        return
      }

      console.log(serviceId)

      const response = await Client.post('/createBooking', {
        user: userId,
        service: serviceId,
        bookingDate: selectedDate,
        status: 'pending'
      })

      alert('Booking created successfully!')

      setShowModal(false)

      // Refresh bookings after creation

      const newBooking = {
        id: response.data._id,
        title: response.data.service?.name || 'Booking',
        start: new Date(response.data.bookingDate),
        end: new Date(
          new Date(response.data.bookingDate).getTime() + 2 * 60 * 60 * 1000
        ),

        color: '#5E6C5B'
      }

      // Remove the selected slot using the correct slot ID
      if (selectedSlotId) {
        await Client.delete(`/slot/slots/${selectedSlotId}`) // Use the slot ID
      }

      // Update the state to remove the deleted slot and add the new booking
      setEvents((prevEvents) => {
        return [
          ...prevEvents.filter((event) => event.id !== selectedSlotId), // Remove the slot by ID
          newBooking // Add the new booking
        ]
      })
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Failed to create booking. Please try again.')
    }
  }

  return (
    <div>
      <h2>Booking Calendar</h2>

      <p>Click any available slot to complete your booking process</p>

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
            setSelectedSlotId(event.id) // Capture the slot ID
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
                value={
                  selectedDate ? selectedDate.toISOString().slice(0, 16) : ''
                }
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                required
                readOnly
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
