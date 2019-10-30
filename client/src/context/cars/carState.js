import React, { useReducer } from 'react';
import axios from 'axios';
import CarContext from './carContext';
import carReducer from './carReducer';
import {
    ADD_CAR,
    FILTER_CARS,
    CLEAR_FILTER,
    CAR_ERROR,
    GET_CARS,
    CAR_PICKED,
    CAR_UNPICKED,
    ADD_FAIL
} from '../types';

const CarState = props => {
    const initialState = {
        cars: null,
        current: null,
        filtered: null,
        error: null,
        carClicked: false,
        carInfo: null,
    };
    
    const [state, dispatch] = useReducer(carReducer, initialState);

    // Get Cars

    const getCars = async () => {
        try {
            const res = await axios.get('/api/cars');

            dispatch({ type: GET_CARS, payload: res.data })
        } catch (err) {
            dispatch({
                type: CAR_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Create Car 
    const createCar = async (car, arrayPhotos) => {

        try {
            console.log(arrayPhotos);
            car = {...car, photos: arrayPhotos };
            console.log(car);
             const res = await axios.post('/api/cars', car);
             console.log(res);
            // dispatch({
            //     type: ADD_CAR,
            //     payload: res.data
            // })
            
        } catch (err) {
            console.error('Create Car Error: ', err)
            dispatch({
                type: ADD_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    const carPicked = carInfo => {
        dispatch({ type: CAR_PICKED, payload: carInfo })
    }

    const carUnPicked = () => {
        dispatch({ type: CAR_UNPICKED })
    }

    const filterCars = text => {
        dispatch({ type: FILTER_CARS, payload: text })
    }

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    return (
      <CarContext.Provider
        value={{
            cars: state.cars,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            createCar,
            getCars,
            filterCars,
            clearFilter,
            carPicked,
            carUnPicked,
            carSelected: state.carSelected,
            carInfo: state.carInfo
        }}
      >
          {props.children}
        </CarContext.Provider>
    )
};

export default CarState;