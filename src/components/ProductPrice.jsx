// src/components/ProductPrice.js

import React from 'react'
import { useCurrency } from '../contexts/CurrencyProvider'

const ProductPrice = ({ priceInBHD }) => {
  const { rates, currency } = useCurrency()
  const conversionRate = rates[currency] || 1 // Default to 1 if rate not found
  const convertedPrice = (priceInBHD * conversionRate).toFixed(2)

  return (
    <p>
      {convertedPrice} {currency}
    </p>
  )
}

export default ProductPrice
