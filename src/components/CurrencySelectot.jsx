// src/components/CurrencySelector.jsx
import React from 'react'
import { useCurrency } from '../contexts/CurrencyContext' // Named import

const CurrencySelector = () => {
  const { changeCurrency } = useCurrency() // Using the useCurrency hook

  return (
    <select onChange={(e) => changeCurrency(e.target.value)}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="JPY">JPY</option>
      {/* Add more currencies as needed */}
    </select>
  )
}

export default CurrencySelector
