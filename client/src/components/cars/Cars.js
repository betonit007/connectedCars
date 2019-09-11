import React, { Fragment, useContext, useEffect } from 'react';
import CarContext from '../../context/cars/carContext';
import CarCard from './CarCard';
import CarSearch from './CarSearch';

import Spinner from '../layout/Spinner';

const Cars = () => {
    const carContext = useContext(CarContext);
    const { cars, current, filtered } = carContext;

    useEffect(() => {
        carContext.getCars();
    }, [])

    return (
        <Fragment>
          <CarSearch />
        <div className='flex justify-around'>
            {!cars ? <Spinner /> : cars.map(car => 
            (
              <CarCard 
                key={car._id}
                carDesc={car.fullDesc}
                carPhotos = {car.photos}
              />
            )
            )}
        </div>
        </Fragment>
    )
}

export default Cars;