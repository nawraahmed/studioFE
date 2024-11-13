// src/components/CurrencySelector.jsx
import React from 'react'
import { useCurrency } from '../contexts/CurrencyProvider'

const CurrencySelector = () => {
  const { currency, setCurrency, rates } = useCurrency()

  return (
    <div className="currency-selector">
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        {Object.keys(rates).map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CurrencySelector
