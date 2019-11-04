import React, { useState, useContext } from 'react';
import arrow from '../layout/img/rightArrow.png';
import CarContext from '../../context/cars/carContext';


const CreatePicScroller = ({ car }) => {
    console.log(car);

    const { updatePhotoArray } = useContext(CarContext);

    
    const [picPosition, setPicPosition] = useState(0)

    const togglePicUp = () => {

        if (car.photos[picPosition + 1]) {
            setPicPosition(picPosition + 1)
        } else { setPicPosition(0) };
    }

    const togglePicDown = () => {
        if (picPosition !== 0) {
            setPicPosition(picPosition - 1)
        } else if (picPosition === 0) {
            setPicPosition((car.photos.length - 1));
        }
        else { setPicPosition(0) };
    }


    return (
        <>
            <div className='flex w-full' style={{ backgroundImage: `url("${car.photos[picPosition]}")`, backgroundSize: `contain`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="w-1/5 flex items-end opacity-25 cursor-pointer hover:opacity-100">
                    <img className="rotate180" src={arrow} alt="select right" onClick={() => togglePicDown()} />
                </div>
                <div className='w-3/5 block text-base text-center'>
                      <button className='btn-blue mt-1' onClick={()=>updatePhotoArray(car, car.photos[picPosition])}>Make Showcase Photo</button>
                </div>
                <div className="w-1/5 flex items-end opacity-25 cursor-pointer hover:opacity-100" onClick={() => togglePicUp()}>
                    <img src={arrow} alt="select right" />
                </div>
            </div>
        </>
    )
}

export default CreatePicScroller
