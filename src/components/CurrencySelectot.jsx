// src/components/CurrencySelector.js

import React from 'react'
import { useCurrency } from '../contexts/CurrencyProvider'

const CurrencySelector = () => {
  const { currency, setCurrency, rates } = useCurrency()

  return (
    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
      {Object.keys(rates).map((cur) => (
        <option key={cur} value={cur}>
          {cur}
        </option>
      ))}
    </select>
  )
}

export default CurrencySelector
