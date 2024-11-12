import React from "react"

const Profile = ({ user }) => {
  if (!user) return <p>Loading user data...</p>

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  )
}

export default Profile
