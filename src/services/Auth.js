import Client from './api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('auth/login', data)
    console.log('Login response:', res.data) // Log to check the response structure

    // Store the token in localStorage
    localStorage.setItem('token', res.data.token)

    // Return the complete response data (user object and token)
    return res.data // Ensure this returns { user: { id, email, role }, token }
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('auth/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    throw error
  }
}
