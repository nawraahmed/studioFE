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
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  const handlePasswordToggle = () => setIsPasswordVisible(!isPasswordVisible)
  const handleConfirmPasswordToggle = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    console.log(formValues)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isPasswordValid) {
      await RegisterUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      })
      setFormValues(initialState)
      navigate("/signin")
    } else {
      alert("Please ensure your password meets all requirements.")
    }
  }
  return (
    <div className="signin">
      <h3>CREATE A NEW ACCOUNT</h3>
      <div className="card-overlay">
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
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              value={formValues.password}
              required
            />
            <i
              onClick={handlePasswordToggle}
              className={`bi ${
                isPasswordVisible ? "bi-eye-slash" : "bi-eye"
              } password-toggle-icon`}
            ></i>
          </div>
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
            <i
              onClick={handleConfirmPasswordToggle}
              className={`bi ${
                isConfirmPasswordVisible ? "bi-eye-slash" : "bi-eye"
              } password-toggle-icon`}
            ></i>
          </div>
          <PasswordChecklist
            className="custom-checklist"
            rules={["minLength", "specialChar", "number", "match"]}
            minLength={8}
            value={formValues.password}
            valueAgain={formValues.confirmPassword}
            messages={{
              minLength: "At least 8 characters ",
              specialChar: "At least 1 special character ",
              number: "At least 1 number",

              match: "passwords match",
            }}
            iconSize={12}
            validColor={"#5e6c5b"}
            validTextColor={"#5e6c5b"}
            invalidColor={"#808080"}
            onChange={(isValid) => setIsPasswordValid(isValid)}
          />

          <button
            type="submit"
            disabled={
              !formValues.email ||
              !formValues.password ||
              !formValues.confirmPassword ||
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
