import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SignInUser } from "../services/Auth"
import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"
import Client from "../services/api"
import { Link } from "react-router-dom" // Import Link from react-router-dom
import "../static/signIn.css"

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()

  let initialState = { email: "", password: "" }
  const [formValues, setFormValues] = useState(initialState)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Logging in...")

    try {
      const payload = await SignInUser(formValues)

      if (payload.token && payload.user) {
        localStorage.setItem("token", payload.token)
        localStorage.setItem("userId", payload.user.id)
        localStorage.setItem("role", payload.user.role)

        setUser(payload.user)

        console.log("User signed in successfully:", payload)

        setFormValues(initialState)

        navigate("/")
      } else {
        setErrorMessage("Invalid login details. Please try again.")
      }
    } catch (error) {
      console.log("Login error:", error)
      setErrorMessage(
        "Invalid login details. Please check your email and password."
      )
    }
  }

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const { credential } = response

      const { data } = await Client.post("/auth/google/token", {
        credential,
      })

      if (data.token) {
        localStorage.setItem("token", data.token)
        setUser(data.user)
        navigate("/")
      }
    } catch (error) {
      console.error("Google login error:", error)
    }
  }

  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <h1 className="signin-header">Sign In</h1>

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="signin-input-wrapper">
            <label htmlFor="email" className="signin-label">
              Email
            </label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
              className="signin-input"
            />
          </div>

          <div className="signin-input-wrapper">
            <label htmlFor="password" className="signin-label">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
              className="signin-input"
            />
          </div>

          <button
            type="submit"
            className="signin-button"
            disabled={!formValues.email || !formValues.password}
          >
            SIGN IN
          </button>
        </form>

        {errorMessage && <p className="signin-error-message">{errorMessage}</p>}

        {/* OR Divider */}
        <div className="signin-or-divider">
          <span>OR</span>
        </div>

        <div className="signin-google-login">

          <div style={{ width: "100%" }}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => console.log("Google Login Failed")}
              className="google-login-button" // Custom class for width control
            />
          </div>

        </div>

        <div className="signin-register-link">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="signin-register-link-text">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
