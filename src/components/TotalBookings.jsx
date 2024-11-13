// src/components/TotalBookings.js

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

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

  // Prepare data for the chart
  const data = {
    labels: ['All-Time Bookings', 'Monthly Bookings'],
    datasets: [
      {
        label: 'Bookings',
        data: [totalBookings, monthlyBookings],
        backgroundColor: ['#4CAF50', '#FF5722'],
        borderColor: ['#388E3C', '#D32F2F'],
        borderWidth: 1
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to allow custom height
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 10 // Smaller font size for legend
          }
        }
      },
      title: {
        display: true,
        text: 'Total and Monthly Bookings',
        font: {
          size: 14 // Smaller font for title
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10 // Smaller font size for x-axis
          }
        },
        grid: {
          display: false // Disable grid lines on x-axis
        }
      },
      y: {
        ticks: {
          font: {
            size: 10 // Smaller font size for y-axis
          },
          beginAtZero: true
        },
        grid: {
          display: false // Disable grid lines on y-axis
        }
      }
    }
  }

  return (
    <div className="total-bookings-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="admin-cards-container">
            <div className="admin-card">
              <h3>All-Time Bookings</h3>
              <p>{totalBookings}</p>
            </div>
            <div className="admin-card">
              <h3>Bookings This Month</h3>
              <p>{monthlyBookings}</p>
            </div>
          </div>
          <div className="chart-container">
            <Bar data={data} options={options} />
          </div>
        </div>
      )}
    </div>
  )
}

export default TotalBookings
