import React, { useContext, useRef, useEffect } from 'react';
import CarContext from '../../context/cars/carContext';

const CarSearch = () => {

    useEffect(() => {
        clearFilter();
    },[])
    
    const carContext = useContext(CarContext);
    const text = useRef('');

    const { filterCars, clearFilter } = carContext;

    const onChange = e => {
        if (text.current.value !== '') {
            filterCars(e.target.value)
        } else {
            clearFilter();
        }
    }

    return (
        <form className='flex justify-center'>
           <input className="appearance-none block w-3/4 bg-grey-100 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Describe your dream car!"
             ref={text}  
             onChange = {onChange}
             />
        </form>
    )
}

export default CarSearch;
        