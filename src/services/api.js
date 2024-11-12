import Axios from 'axios'

export const BASE_URL = 'http://localhost:4000'

const Client = Axios.create({ baseURL: BASE_URL })

const API_KEY = import.meta.env.REACT_APP_CURRENCY_API_KEY
const CURRENCY_API_BASE_URL = import.meta.env.REACT_APP_CURRENCY_API_BASE_URL

// Intercepts every request axios makes
Client.interceptors.request.use(
  (config) => {
    // Reads the token in localStorage
    const token = localStorage.getItem('token')
    // if the token exists, we set the authorization header
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config // We return the new config if the token exists or the default config if no token exists.
    // Provides the token to each request that passes through axios
  },
  (error) => Promise.reject(error)
)

// Currency conversion API (using ExchangeRate-API)
export const getCurrencyConversionRates = async (baseCurrency) => {
  try {
    const response = await Client.get(
      `${CURRENCY_API_BASE_URL}/${API_KEY}/latest/${baseCurrency}`
    )
    if (response.status === 200) {
      return response.data.conversion_rates // Return conversion rates for various currencies
    } else {
      throw new Error('Failed to fetch conversion rates')
    }
  } catch (error) {
    console.error('Error fetching currency rates:', error)
    throw error // Propagate the error for further handling
  }
}

export default Client
