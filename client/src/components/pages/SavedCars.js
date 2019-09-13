import React, { Fragment, useContext, useEffect } from 'react';
import CarContext from '../../context/cars/carContext';
import AuthContext from '../../context/auth/authContext';

const HomeCars = () => {
   const carContext = useContext(CarContext);
   const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    },[])

    return (
        <div>
           Saved Cars
        </div>
    )
}

export default HomeCars;