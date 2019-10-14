import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import CarContext from '../../context/cars/carContext';
import AuthContext from '../../context/auth/authContext'
import PicScroller from './PicScroller';
import CarInfo from './CarInfo';


const Modal = () => {
    
    const carContext = useContext(CarContext);
    const authContext = useContext(AuthContext);
    const { carUnPicked, carInfo } = carContext;
    const { saved, saveVehicle, user } = authContext;
  

    return ReactDOM.createPortal(
        <div onClick={()=>carUnPicked()} className='absolute flex items-center bg-black justify-center top-0 right-0 bottom-0 left-0 w-full h-full modal'>
            <div onClick={(e)=>e.stopPropagation()}className='flex flex-col justify-around bg-white modalVport text-5xl rounded'>
                <div className='h-full flex justify-center' >
                    {carInfo ? 
                               <PicScroller 
                                 carUnPicked={carUnPicked} 
                                 pics={carInfo[0].photos} 
                                 saved={saved}
                                 saveVehicle={saveVehicle}
                                 carInfo={carInfo}
                                 user = {user}
                                /> 
                                :
                                <span>Loading....</span>
                    }
                </div>
                <div className='bg-gray-300 h-64 flex justify-center'>
                  <CarInfo
                    carInfo={carInfo}
                  />
                </div>
            </div>
        </div>, document.querySelector('#modal')

    );
}

export default Modal;