import React from "react"

const PackageCard = ({ packageData }) => {
  return (
    <div>
      <h4>{packageData.name}</h4>
      <p>{packageData.description}</p>
      <p className="price">Price: {packageData.price} BD</p>
      <div>
        <h5>Included Services:</h5>
        <ul>
          {packageData.servicesIncluded.map((service) => (
            <li key={service._id}>{service.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PackageCard
