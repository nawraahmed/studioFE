// import React, { createContext, useContext, useEffect, useState } from 'react'
// import axios from 'axios'

// // Create the context
// const CurrencyContext = createContext()

// // Custom hook to use the context
// export const useCurrency = () => useContext(CurrencyContext)

// // CurrencyProvider component to wrap the app and provide context values
// export const CurrencyProvider = ({ children }) => {
//   const [selectedCurrency, setSelectedCurrency] = useState('KWD') // Default currency
//   const [rates, setRates] = useState({})
//   const [loading, setLoading] = useState(false)

//   // Fetch exchange rates when the component mounts or when the selected currency changes
//   useEffect(() => {
//     const fetchRates = async () => {
//       setLoading(true)
//       try {
//         const response = await axios.get(`http://localhost:5000/api/rates/KWD`) // Base currency is KWD
//         setRates(response.data.conversion_rates)
//       } catch (error) {
//         console.error('Error fetching exchange rates:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchRates()
//   }, [])

//   // Method to convert price based on selected currency
//   const convertPrice = (price) => {
//     if (rates[selectedCurrency]) {
//       return (price * rates[selectedCurrency]).toFixed(2)
//     }
//     return price
//   }

//   return (
//     <CurrencyContext.Provider
//       value={{
//         selectedCurrency,
//         setSelectedCurrency,
//         rates,
//         loading,
//         convertPrice
//       }}
//     >
//       {children}
//     </CurrencyContext.Provider>
//   )
// }
