// src/components/LogsList.jsx

import React, { useEffect, useState } from 'react'
import axios from 'axios'

const LogsList = () => {
  const [logs, setLogs] = useState([])
  const [error, setError] = useState(null)

  // Fetch logs from the API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/api/logs')
        setLogs(response.data)
      } catch (error) {
        setError('Error fetching logs.')
        console.error('Error fetching logs:', error)
      }
    }

    fetchLogs()
  }, [])

  // Delete a specific log by ID
  const deleteLog = async (logId) => {
    try {
      await axios.delete(`/api/logs/${logId}`)
      setLogs(logs.filter((log) => log._id !== logId)) // Remove log from state
    } catch (error) {
      setError('Error deleting log.')
      console.error('Error deleting log:', error)
    }
  }

  return (
    <div>
      <h2>Logs</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {logs.length > 0 ? (
        <ul>
          {logs.map((log) => (
            <li
              key={log._id}
              style={{
                marginBottom: '1em',
                borderBottom: '1px solid #ddd',
                paddingBottom: '1em'
              }}
            >
              <p>
                <strong>User ID:</strong> {log.user}
              </p>
              <p>
                <strong>Exception:</strong> {log.exception}
              </p>
              <p>
                <strong>Type:</strong> {log.type}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(log.createdAt).toLocaleString()}
              </p>
              <button
                onClick={() => deleteLog(log._id)}
                style={{ color: 'red' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No logs found.</p>
      )}
    </div>
  )
}

export default LogsList
