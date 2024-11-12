import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()

  let initialState = { email: '', password: '' }
  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Logging in...')

    // Send login request and get the response payload
    const payload = await SignInUser(formValues)

    // Check if the payload contains a token and user object
    if (payload.token && payload.user) {
      // Store token, userId, and role in localStorage
      localStorage.setItem('token', payload.token)
      localStorage.setItem('userId', payload.user.id)
      localStorage.setItem('role', payload.user.role)

      // Set the user state in the parent component (e.g., App component)
      setUser(payload.user)

      console.log('User signed in successfully:', payload)

      // Reset form values
      setFormValues(initialState)

      // Redirect to homepage or desired page
      navigate('/')
    } else {
      console.log('Error: No token or user object returned')
    }
  }

  return (
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
      </div>
    </div>
  )
}

export default SignIn
