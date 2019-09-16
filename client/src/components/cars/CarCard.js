import React from 'react';

const CarCard = ({ carDesc, carPhotos, user, saveVehicle, carId }) => {
 
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
        <button onClick={() => saveVehicle(carId, user)}>Save Car</button>
      </div>
    </div>
  )
}

export default CarCard;
