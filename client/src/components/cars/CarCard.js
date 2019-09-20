import React, { useState, useEffect } from 'react';

const CarCard = ({ carDesc, carPhotos, user, saveVehicle, carId, saved }) => {
  
 const renderSavedButton = () => {
    if (!user) {
      return null
    }
    else if (saved) {
      return <button>Saved</button>
    }
    else return <button onClick={() => saveVehicle(carId, user)}>Save Car</button>
  }

  return (

    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={carPhotos[0]} alt={carDesc} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{carDesc}</div>
        <p className="text-gray-700 text-base">
          {carDesc}
        </p>
      </div>
      <div className="px-6 py-4">
        {renderSavedButton()}
      </div>
    </div>
  )
}

export default CarCard;
