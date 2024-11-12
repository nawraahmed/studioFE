// src/components/PriceDisplay.js
import React from 'react'
import { useCurrency } from '../context/CurrencyContext'

const PriceDisplay = ({ price }) => {
  const { currency, exchangeRates, loading, error } = useCurrency()

  if (loading) {
    return <p>Loading currency rates...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  // Convert the price to the selected currency
  const convertPrice = (price) => {
    if (currency === 'USD') return price // If the selected currency is USD, return the original price
    const conversionRate = exchangeRates[currency]
    if (conversionRate) {
      return (price * conversionRate).toFixed(2) // Convert price based on the conversion rate
    }
    return price // If no conversion rate found, return the original price
  }

  const convertedPrice = convertPrice(price)

  return (
    <div>
      <p>
        Price: {convertedPrice} {currency}
      </p>
    </div>
  )
}

export default PriceDisplay
