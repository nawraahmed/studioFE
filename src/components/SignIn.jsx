import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SignInUser } from "../services/Auth"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import axios from "axios"

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()

  let initialState = { email: "", password: "" }
  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("hellos")
    const payload = await SignInUser(formValues)
    setFormValues(initialState)
    console.log(formValues)
    setUser(payload)
    console.log(setUser)
    navigate("/")
  }
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      // Send Google credential to backend
      const response = await axios.get("http://localhost:4000/auth/google", {
        token: credentialResponse.credential,
      })

      // Capture token and user data from backend response
      const { token, user } = response.data
      localStorage.setItem("token", token) // Store JWT token
      setUser(user) // Update the user state
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}` // Set token in axios header
      navigate("/") // Redirect to home page
    } catch (error) {
      console.error("Google login failed", error)
    }
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="signin col">
        <div className="card-overlay centered">
          <form className="col" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="example@example.com"
                value={formValues.email}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={formValues.password}
                required
              />
            </div>
            <button disabled={!formValues.email || !formValues.password}>
              Sign In
            </button>
          </form>

          <div style={{ marginTop: "20px" }}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => console.log("Google login failed")}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default SignIn
