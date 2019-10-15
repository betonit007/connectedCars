import React, { Fragment, useContext, useEffect } from 'react';
import CarContext from '../../context/cars/carContext';
import AuthContext from '../../context/auth/authContext';
import CarSearch from '../cars/CarSearch';
import CarCard from '../cars/CarCard';
import Modal from '../cars/Modal';

import Spinner from '../layout/Spinner';

const HomeCars = () => {
    const carContext = useContext(CarContext);
    const authContext = useContext(AuthContext);
    const { saveVehicle, user, saved } = authContext;
    const { cars, carPicked, carSelected } = carContext;

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            {carSelected && <Modal />}
            <div className="flex flex-wrap justify-center">
                {!cars ? <Spinner /> :
                    (
                        cars.filter(car => saved.indexOf(car._id) > -1 ).map(car => //shuffle array and return the first 25 cars
                            (
                                <CarCard
                                    key={car._id}
                                    carDesc={car.fullDesc}
                                    carPhotos={car.photos}
                                    user={user && user._id}
                                    carId={car._id}
                                    saveVehicle={saveVehicle}
                                    saved={saved ? saved.indexOf(car._id) > -1 : false}
                                    carPicked={carPicked}
                                />
                            )
                        )
                    )
                }
            </div>
        </Fragment>
    )
}
export default HomeCars;