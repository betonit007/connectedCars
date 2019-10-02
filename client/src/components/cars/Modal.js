import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import CarContext from '../../context/cars/carContext';
import PicScroller from './PicScroller';


const Modal = () => {
    
    const carContext = useContext(CarContext);
    const { carUnPicked, carInfo } = carContext;
    console.log(carInfo);

    return ReactDOM.createPortal(
        <div onClick={()=>carUnPicked()} className='absolute flex items-center bg-black justify-center top-0 right-0 bottom-0 left-0 w-full h-full modal'>
            <div onClick={(e)=>e.stopPropagation()}className='flex flex-col justify-around bg-white modalVport text-5xl rounded'>
                <div className='h-full flex justify-center' >
                    {carInfo ? <PicScroller pics={carInfo[0].photos} /> : <span>Loading....</span>}
                </div>
                <div className='bg-gray-300 h-64 flex justify-center'>
                    Bottom
                </div>
            </div>
        </div>, document.querySelector('#modal')

    );
}

export default Modal;