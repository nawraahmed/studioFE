import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RegisterUser } from "../services/Auth"
import PasswordChecklist from "react-password-checklist"
const Register = () => {
  let navigate = useNavigate()

  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }
  const [formValues, setFormValues] = useState(initialState)
  const [errorMessage, setErrorMessage] = useState("")
  const [isPasswordValid, setIsPasswordValid] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage("Passwords do not match.")
      return
    }

    try {
      // Attempt to register the user
      await RegisterUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      })
      setFormValues(initialState)
      navigate("/signin")
    } catch (error) {
      // Set error message based on response from the backend
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data) // This should be "A user with that email has already been registered!"
      } else {
        setErrorMessage("Registration failed. Please try again.")
      }
    }
  }

  return (
    <div className="signin col">
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="John Smith"
              value={formValues.name}
              required
            />
          </div>
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
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
            {formValues.confirmPassword &&
              formValues.password !== formValues.confirmPassword && (
                <p className="error-message">Passwords do not match.</p>
              )}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <PasswordChecklist
            className="custom-checklist"
            rules={["minLength", "specialChar", "number"]}
            minLength={8}
            value={formValues.password}
            valueAgain={formValues.confirmPassword}
            messages={{
              minLength: "At least 8 characters ",
              specialChar: "At least 1 special character ",
              number: "At least 1 number",
            }}
            iconSize={12}
            validColor={"#5e6c5b"}
            validTextColor={"#5e6c5b"}
            invalidColor={"#808080"}
            onChange={(isValid) => setIsPasswordValid(isValid)}
          />

          <button
            disabled={
              !formValues.email ||
              !formValues.password ||
              formValues.password !== formValues.confirmPassword ||
              !isPasswordValid
            }
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
