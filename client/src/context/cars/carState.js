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
    CAR_UNPICKED
} from '../types';

const CarState = props => {
    const initialState = {
        cars: null,
        current: null,
        filtered: null,
        error: null,
        carClicked: false
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

    const carPicked = carInfo => {
        dispatch({ type: CAR_PICKED, payload: 'test' })
    }

    const carUnPicked = () => {
        dispatch({ type: CAR_UNPICKED, payload: 'test' })
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
            getCars,
            filterCars,
            clearFilter,
            carPicked,
            carUnPicked,
            carSelected: state.carSelected
        }}
      >
          {props.children}
        </CarContext.Provider>
    )
};

export default CarState;