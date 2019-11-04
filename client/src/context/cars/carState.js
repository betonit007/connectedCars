import React, { useReducer } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
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
    ADD_FAIL,
    CREATE_MODAL,
    UPDATE_CAR
} from '../types';

const CarState = props => {
    const initialState = {
        cars: null,
        current: null,
        filtered: null,
        error: null,
        carSelected: false,
        carInfo: null,
        createModal: false
    };
    
    const [state, dispatch] = useReducer(carReducer, initialState);

    // Get Cars

    const getCars = async () => {
        try {
            const res = await axios.get('/api/cars');
            console.log(res);
            dispatch({ type: GET_CARS, payload: res.data })
        } catch (err) {
            dispatch({
                type: CAR_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Create Car 
    const createCar = async (car) => {

        car.photos = car.photos.reverse(); //reverse order of photos to get first submitted to beginning of array

        try {
            const res = await axios.post('/api/cars', car);
            dispatch({
                type: UPDATE_CAR,
                payload: res.data
            })
            return res;

        } catch (err) {
            console.error('Create Car Error: ', err)
            dispatch({
                type: ADD_FAIL,
                payload: err.response.data.msg
            })
        } 
    }

    //update photoArray for showcase vehicle
    const updatePhotoArray = async (car, showCaseUrl) => {
        
        //move show case photo to beginning of photos array
        car.photos = car.photos.filter(url => url !== showCaseUrl);  //remove showcase url
        car.photos.unshift(showCaseUrl); //add to beginning of array

        try {
            const res = await axios.put('/api/cars', car);
            dispatch({
                type: ADD_CAR,
                payload: res.data
            })

        } catch (err) {
            console.error('Error updating photo array: ', err)
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

    const triggerCreateModal = (trueFalse) => {
        dispatch({ type: CREATE_MODAL, payload: trueFalse });
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
            carInfo: state.carInfo,
            triggerCreateModal,
            updatePhotoArray,
            createModal: state.createModal
        }}
      >
          {props.children}
        </CarContext.Provider>
    )
};

export default CarState;