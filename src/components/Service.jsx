import React from "react"
import { Link } from "react-router-dom"

const Service = () => {
  return (
    <div className="service">
      <div>
        <Link to="/new-service">
          <button>Add New Service</button>
        </Link>
      </div>
      <h3>Service Name</h3>
      <p>Details about the service will be displayed here.</p>
    </div>
  )
}

export default Service
