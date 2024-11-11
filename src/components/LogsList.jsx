import React, { useEffect, useState } from 'react'
import Client from '../services/api'

const LogsList = () => {
  const [logs, setLogs] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await Client.get('/logs/logs')
        setLogs(response.data)
      } catch (error) {
        setError('Error fetching logs.')
        console.error('Error fetching logs:', error)
      }
    }

    fetchLogs()
  }, [])

  const deleteLog = async (logId) => {
    try {
      await Client.delete(`/logs/logs/${logId}`)
      setLogs(logs.filter((log) => log._id !== logId))
    } catch (error) {
      setError('Error deleting log.')
      console.error('Error deleting log:', error)
    }
  }

  return (
    <div className="logs-container">
      {error && <p className="error-message">{error}</p>}
      <div className="cards-container">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div className="card" key={log._id}>
              <h4>User: {log.user ? log.user.name : 'Unknown'}</h4>
              <p>Exception: {log.exception}</p>
              <p>Type: {log.type}</p>
              <button
                className="card-button delete-button"
                onClick={() => deleteLog(log._id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))
        ) : (
          <p>No logs available.</p>
        )}
      </div>
    </div>
  )
}

export default LogsList
