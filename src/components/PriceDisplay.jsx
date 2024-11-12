// // src/components/PriceDisplay.js
// import React, { useContext } from 'react';
// import CurrencyContext from '../contexts/CurrencyContext';

// const PriceDisplay = ({ basePrice }) => {
//     const { currency, exchangeRate } = useContext(CurrencyContext);

//     // Calculate converted price
//     const convertedPrice = (basePrice * exchangeRate).toFixed(2);

//     return (
//         <p>
//             Price: {convertedPrice} {currency}
//         </p>
//     );
// };

// export default PriceDisplay;
