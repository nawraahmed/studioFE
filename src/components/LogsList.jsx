import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next" // Import the useTranslation hook
import Client from "../services/api"

const LogsList = () => {
  const { t } = useTranslation() // Get the translation function
  const [logs, setLogs] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await Client.get("/logs/logs")
        setLogs(response.data)
      } catch (error) {
        setError(t("error_fetching_logs")) // Use translated error message
        console.error("Error fetching logs:", error)
      }
    }

    fetchLogs()
  }, [])

  const deleteLog = async (logId) => {
    try {
      await Client.delete(`/logs/logs/${logId}`)
      setLogs(logs.filter((log) => log._id !== logId))
    } catch (error) {
      setError(t("error_deleting_log")) // Use translated error message
      console.error("Error deleting log:", error)
    }
  }

  return (
    <div className="logs-container">
      {error && <p className="admin-error-message">{error}</p>}
      <div className="admin-cards-container">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div className="admin-card" key={log._id}>
              <h4>
                {t("user")}: {log.user ? log.user.name : t("unknown_user")}
              </h4>{" "}
              {/* Translated user text */}
              <p>
                {t("exception")}: {log.exception}
              </p>{" "}
              {/* Translated exception label */}
              <p>
                {t("type")}: {log.type}
              </p>{" "}
              {/* Translated type label */}
              <button
                className="admin-card-button admin-delete-button"
                onClick={() => deleteLog(log._id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))
        ) : (
          <p>{t("no_logs_available")}</p>
        )}
      </div>
    </div>
  )
}

export default LogsList
