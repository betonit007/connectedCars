import React, { Fragment, useContext, useEffect } from 'react';
import CarContext from '../../context/cars/carContext';
import AuthContext from '../../context/auth/authContext';
import CarCard from './CarCard';
import CarSearch from './CarSearch';

import Spinner from '../layout/Spinner';

const Cars = () => {
    const carContext = useContext(CarContext);
    const authContext = useContext(AuthContext);
    const { cars, current, filtered } = carContext;

    useEffect(() => {
        
        carContext.getCars();
        authContext.loadUser();
    }, [])

    const shuffle = a => {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
  }
    if (filtered !== null && filtered.length === 0) {
      return (
        <Fragment>
          <CarSearch />
          <p className='w-full flex justify-center text-red-600'>No vehicles found, please revise your search!</p>
        </Fragment>
      )
    }
    return (
        <Fragment>
          <CarSearch />
        <div className='flex justify-around'>
            {!cars ? <Spinner /> : 
              (
                !filtered ? 
                  shuffle(cars).slice(0, 25).map(car => //shuffle array and return the first 25 cars
                    (
                      <CarCard 
                        key={car._id}
                        carDesc={car.fullDesc}
                        carPhotos = {car.photos}
                      />
                     )
                  )
                  :
                  (
                  filtered.slice(0, 25).map(car => (
                      <CarCard
                      key={car._id}
                      carDesc={car.fullDesc}
                      carPhotos = {car.photos}
                      />
                      )
                    )
                  )
              )
            }
        </div>
        </Fragment>
    )
}

export default Cars;