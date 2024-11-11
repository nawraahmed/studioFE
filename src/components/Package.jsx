import React from "react"
import { Link } from "react-router-dom"

const Package = () => {
  return (
    <div className="package">
      <div>
        <Link to="/new-package">
          <button>Add New Package</button>
        </Link>
      </div>
      <h3>Package Name</h3>
      <p>Description and details of the package will be listed here.</p>
    </div>
  )
}

export default Package
