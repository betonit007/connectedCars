import React, { useState, useEffect } from 'react';

const CarCard = ({ carDesc, carPhotos, carId, carPicked }) => {

  
  return (

    <div onClick={()=>carPicked(carId)} className="cursor-pointer border border-gray-400 shadow-xl bg-white rounded m-2 hover:shadow-outline overflow-hidden md:max-w-xs">
      <div className="overflow-hidden md:h-56 m-auto">
        <img src={carPhotos[0]} alt={carDesc}/>
      </div>
      <div className="bg-gray-300 h-full">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{carDesc}</div>
          <p className="text-gray-700 text-base">
            {carDesc}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CarCard;
