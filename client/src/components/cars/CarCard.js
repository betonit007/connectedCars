import React, { useState, useEffect } from 'react';

const CarCard = ({ car, carPicked }) => {
  
  return (

    <div onClick={()=>carPicked(car._id)} className="cursor-pointer border border-gray-400 shadow-xl bg-white rounded m-2 hover:shadow-outline overflow-hidden md:max-w-xs">
      <div >
        <img className="h-full w-full" src={car.photos[0]} alt={car.fullDesc}/>
      </div>
      <div className="bg-gray-300 h-full w-full">
        <div className="px-3 py-2">
          <div className='text-gray-600 flex'>
            <div className='pr-1'>{car.year}</div><div>{car.make}</div>
          </div>
          <div className='text-gray-600 flex'>
            <div className='pr-1'>{car.model}</div>
          </div>
          <div className='text-gray-600'></div>
          <div className='text-gray-600'></div>
        </div>
      </div>
    </div>
  )
}

export default CarCard;
