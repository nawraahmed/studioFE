// frontend/src/components/CurrencyConverter.js
import React, { useState } from "react"
import axios from "axios"

function CurrencyConverter() {
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("AED")
  const [convertedAmount, setConvertedAmount] = useState(null)
  const [error, setError] = useState(null)

  const handleConvert = async () => {
    try {
      // Clear any previous error
      setError(null)

      // Make the API request
      const response = await axios.get(
        `http://localhost:4000/api/currency/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      )

      // Check if the response contains the convertedAmount
      if (response.data && response.data.convertedAmount) {
        setConvertedAmount(response.data.convertedAmount)
      } else {
        setError("Failed to get converted amount. Please try again.")
      }

      console.log("API response:", response.data) // Debugging line
    } catch (error) {
      console.error("Conversion error:", error)
      setError("An error occurred during conversion. Please try again.")
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Currency Converter</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />

      <div style={{ marginBottom: "10px" }}>
        <label>From: </label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="AED">AED</option>
          <option value="SAR">SAR</option>
          <option value="KWD">KWD</option>
          <option value="QAR">QAR</option>
          <option value="BHD">BHD</option>
          <option value="OMR">OMR</option>
          {/* Add more currencies as needed */}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>To: </label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="AED">AED</option>
          <option value="SAR">SAR</option>
          <option value="KWD">KWD</option>
          <option value="QAR">QAR</option>
          <option value="BHD">BHD</option>
          <option value="OMR">OMR</option>
          {/* Add more currencies as needed */}
        </select>
      </div>

      <button
        onClick={handleConvert}
        style={{ padding: "10px", width: "100%" }}
      >
        Convert
      </button>

      {/* Display Converted Amount */}
      {convertedAmount !== null && (
        <p style={{ marginTop: "20px", fontSize: "1.2em" }}>
          Converted Amount: {convertedAmount} {toCurrency}
        </p>
      )}

      {/* Display Error Message */}
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
    </div>
  )
}

export default CurrencyConverter
