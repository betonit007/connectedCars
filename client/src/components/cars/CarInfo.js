import React from 'react'
  
const CarInfo = ({ carInfo:[carInfo] }) => {
    console.log(carInfo)


    return ( 
            <div>
              <h3 className='text-lg'>
                  {carInfo.fullDesc}
              </h3>
            </div>
    )
}

export default CarInfo
