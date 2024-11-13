// src/context/CurrencyProvider.js

import React, { useState, useEffect, createContext, useContext } from 'react'

const CurrencyContext = createContext()

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('BHD') // Default currency is Bahraini Dinar
  const [rates, setRates] = useState({ BHD: 1 }) // Initialize rates with BHD as base

  useEffect(() => {
    // Fetch exchange rates from BHD to multiple currencies
    async function fetchExchangeRates() {
      try {
        const response = await fetch(
          'https://api.exchangerate-api.com/v4/latest/BHD'
        )
        const data = await response.json()
        setRates(data.rates) // Store rates to convert from BHD to other currencies
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error)
      }
    }
    fetchExchangeRates()
  }, [])

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => useContext(CurrencyContext)
