import AwesomeCalendar from 'react-awesome-calendar'
import { useState } from 'react'

const Calendar = () => {
  // Sample event data to display on the calendar
  const [events, setEvents] = useState([
    {
      id: 1,
      color: '#5E6C5B',
      from: '2024-11-15T10:00:00+00:00',
      to: '2024-11-15T12:00:00+00:00',
      title: 'Branding Consultation'
    },
    {
      id: 2,
      color: '#F4EFE6',
      from: '2024-11-20T14:00:00+00:00',
      to: '2024-11-20T15:30:00+00:00',
      title: 'Product Photography Session'
    }
  ])

  return (
    <div>
      <h2 className="custom-heading">Calendar</h2>

      <AwesomeCalendar events={events} />
    </div>
  )
}

export default Calendar
