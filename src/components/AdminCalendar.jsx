import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Client from '../services/api'

moment.locale('en')
const localizer = momentLocalizer(moment)

const AdminCalendar = () => {
  const [events, setEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [timeSlots, setTimeSlots] = useState([])
  const [selectedSlots, setSelectedSlots] = useState([])

  useEffect(() => {
    fetchAvailableSlots()
  }, [])

  const fetchAvailableSlots = async () => {
    try {
      const response = await Client.get('/slot/slots')
      const data = response.data.map((slot) => ({
        id: slot._id,
        title: slot.title,
        start: new Date(slot.start),
        end: new Date(slot.end),
        color: slot.color || '#85C1E9'
      }))

      if (data.length === 0) {
        alert('No available slots booked')
      }

      setEvents(data)
    } catch (error) {
      console.error('Error fetching available slots:', error)
    }
  }

  const handleSelectDay = (date) => {
    setSelectedDate(date)
    generateTimeSlots(date)
  }

  const generateTimeSlots = (date) => {
    const allSlots = [
      { start: 8, end: 9 },
      { start: 9, end: 10 },
      { start: 10, end: 11 },
      { start: 11, end: 12 },
      { start: 13, end: 14 },
      { start: 14, end: 15 },
      { start: 15, end: 16 },
      { start: 16, end: 17 }
    ]

    const availableSlots = allSlots.filter((slot) => {
      const startHour = slot.start
      return !events.some(
        (event) =>
          event.start.getFullYear() === date.getFullYear() &&
          event.start.getMonth() === date.getMonth() &&
          event.start.getDate() === date.getDate() &&
          event.start.getHours() === startHour
      )
    })

    setTimeSlots(
      availableSlots.map((slot) => ({
        title: `Available Slot ${slot.start}:00 - ${slot.end}:00`,
        start: new Date(date.setHours(slot.start, 0, 0, 0)),
        end: new Date(date.setHours(slot.end, 0, 0, 0)),
        color: '#85C1E9'
      }))
    )
  }

  // Toggle selecting a time slot
  const handleSelectSlot = (slot) => {
    const isAlreadySelected = selectedSlots.some(
      (selected) => selected.start.getTime() === slot.start.getTime()
    )

    if (isAlreadySelected) {
      setSelectedSlots((prevSlots) =>
        prevSlots.filter(
          (selected) => selected.start.getTime() !== slot.start.getTime()
        )
      )
      setTimeSlots((prevSlots) => [...prevSlots, slot])
    } else {
      setSelectedSlots((prevSlots) => [...prevSlots, slot])
      setTimeSlots((prevSlots) =>
        prevSlots.filter(
          (available) => available.start.getTime() !== slot.start.getTime()
        )
      )
    }
  }

  const dayPropGetter = (date) => {
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      return {
        style: {
          backgroundColor: '#FFD700'
        }
      }
    }
    return {}
  }

  const handleSaveSlots = async () => {
    if (selectedDate) {
      try {
        const newSlots = selectedSlots.map((slot) => ({
          title: slot.title,
          start: slot.start.toISOString(),
          end: slot.end.toISOString(),
          color: slot.color
        }))
        await Promise.all(
          newSlots.map((slot) => Client.post('/slot/createSlot', slot))
        )

        alert('Slots saved successfully!')
        fetchAvailableSlots()
        setSelectedDate(null)
        setSelectedSlots([])
      } catch (error) {
        console.error('Error saving slots:', error)
      }
    } else {
      alert('Please select a date and time slots to save.')
    }
  }

  return (
    <div className="admin-calendar-container">
      <div className="calendar-section">
        <h2>Available Slots</h2>
        <Calendar
          localizer={localizer}
          events={events}
          selectable
          defaultView={Views.MONTH}
          views={['month', 'day', 'agenda']}
          style={{ height: '500px' }}
          onSelectSlot={({ start }) => handleSelectDay(start)}
          dayPropGetter={dayPropGetter}
          formats={{
            dayHeaderFormat: 'MMM DD',
            dayRangeHeaderFormat: ({ start, end }) =>
              `${moment(start).format('MMM DD')} - ${moment(end).format(
                'MMM DD'
              )}`
          }}
        />
      </div>

      {selectedDate && (
        <div className="time-slots-section">
          <h3>Pick A Timing</h3>
          <div className="time-slots-list">
            {timeSlots.map((slot, index) => (
              <div
                key={index}
                className="time-slot"
                onClick={() => handleSelectSlot(slot)}
              >
                {slot.title}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="selected-slots-section">
        <h3>Selected Slots</h3>
        <ul>
          {selectedSlots.map((slot, index) => (
            <li key={index}>
              <span>{`${slot.title} - ${moment(slot.start).format(
                'HH:mm'
              )}`}</span>
              <button onClick={() => handleSelectSlot(slot)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={handleSaveSlots} className="save-slots-button">
          Save Slots
        </button>
      </div>
    </div>
  )
}

export default AdminCalendar
