import React, { Fragment, useContext, useEffect, useState } from 'react';
import CarContext from '../../context/cars/carContext';
import AuthContext from '../../context/auth/authContext';
import CarCard from './CarCard';
import CarSearch from './CarSearch';

import Spinner from '../layout/Spinner';

const Cars = () => {
  const carContext = useContext(CarContext);
  const authContext = useContext(AuthContext);
  const { cars, filtered } = carContext;
  const { saveVehicle, user, saved } = authContext;

  useEffect(() => {
    carContext.getCars();
    authContext.loadUser();
    console.log('useEffect', saved);
  }, [])

  const shuffle = (array) => {
    if (true) return array
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
      <div className={!cars ? `` : (filtered ? `flex flex-wrap justify-center` : `grid`)}>   {/*No Styling if loading / use grid if not filter / use wrap if filtered */}
        {!cars ? <Spinner /> :
          (
            !filtered ?
              shuffle(cars).slice(0, 25).map(car => //shuffle array and return the first 25 cars
                (
                  <CarCard
                    key={car._id}
                    carDesc={car.fullDesc}
                    carPhotos={car.photos}
                    user={user && user._id}
                    carId={car._id}
                    saveVehicle={saveVehicle}
                    saved={saved ? saved.indexOf(car._id) > -1 : false}
                  />
                )
              )
              :
              (
                filtered.slice(0, 25).map(car => (
                  <CarCard
                    key={car._id}
                    carDesc={car.fullDesc}
                    carPhotos={car.photos}
                    user={user && user._id}
                    carId={car._id}
                    saveVehicle={saveVehicle}
                    saved={saved ? saved.indexOf(car._id) > -1 : false}
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