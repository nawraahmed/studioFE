// // src/components/CurrencySelector.js
// import React, { useContext } from 'react';
// import CurrencyContext from '../contexts/CurrencyContext';

// const CurrencySelector = () => {
//     const { currency, changeCurrency } = useContext(CurrencyContext);

//     const handleCurrencyChange = (e) => {
//         changeCurrency(e.target.value);
//     };

//     return (
//         <div>
//             <label>Select Currency: </label>
//             <select value={currency} onChange={handleCurrencyChange}>
//                 <option value="USD">USD</option>
//                 <option value="EUR">EUR</option>
//                 <option value="AED">AED</option>
//                 <option value="SAR">SAR</option>
//                 <option value="KWD">KWD</option>
//                 <option value="QAR">QAR</option>
//                 <option value="BHD">BHD</option>
//                 <option value="OMR">OMR</option>
//             </select>
//         </div>
//     );
// };

// export default CurrencySelector;
