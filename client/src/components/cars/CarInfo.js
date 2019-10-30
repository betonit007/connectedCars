import React from 'react';
import CarDesc from './CarDesc';

const CarInfo = ({ carInfo:[carInfo] }) => {
  
  return (
    <div className="w-full">
      <h3 className='text-lg text-center'>
        {carInfo.fullDesc}
      </h3>
      <CarDesc {...carInfo}/>
    </div>
  )
}

export default CarInfo
