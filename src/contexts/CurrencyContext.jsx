// src/contexts/CurrencyContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'
import { getCurrencyConversionRates } from '../services/api'

export const CurrencyContext = createContext()

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD')
  const [exchangeRates, setExchangeRates] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency)
  }

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setLoading(true)
      setError(null)

      try {
        const rates = await getCurrencyConversionRates(currency)
        setExchangeRates(rates)
      } catch (error) {
        setError('Unable to fetch currency conversion rates')
      } finally {
        setLoading(false)
      }
    }

    fetchExchangeRates()
  }, [currency])

  return (
    <CurrencyContext.Provider
      value={{ currency, changeCurrency, exchangeRates, loading, error }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

// Named export for the useCurrency hook
export const useCurrency = () => useContext(CurrencyContext)
