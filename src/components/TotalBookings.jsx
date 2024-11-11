import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TotalBookings = () => {
  const [totalBookings, setTotalBookings] = useState(0)
  const [monthlyBookings, setMonthlyBookings] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/total-bookings')
        if (response.data) {
          setTotalBookings(response.data.totalBookings)
          setMonthlyBookings(response.data.monthlyBookings)
        }
      } catch (error) {
        console.error('Error fetching booking data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookingData()
  }, [])

  return (
    <div className="total-bookings-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="cards-container">
          <div className="card">
            <h3>All-Time Bookings</h3>
            <p>{totalBookings}</p>
          </div>
          <div className="card">
            <h3>Bookings This Month</h3>
            <p>{monthlyBookings}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default TotalBookings
