import React, { useReducer, useEffect } from 'react';
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
    UPDATE_CAR,
    CHANGE_PAGE,
    NUM_CARS
} from '../types';

const CarState = props => {
    const initialState = {
        cars: [],
        current: null,
        filtered: null,
        error: null,
        carSelected: false,
        carInfo: null,
        createModal: false,
        currentPage: 1,
        carsPerPage: 10,
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

    const changePage = page => {
        console.log('cars length',state.cars.length / state.carsPerPage)
        console.log('currentPage', state.currentPage)
        if (page === 'increment') {
            if (state.currentPage < state.cars.length / state.carsPerPage) {
                dispatch({
                    type: CHANGE_PAGE,
                    payload: state.currentPage + 1
                })
            }
        }
        else if (page === 'decrement') {
            if (state.currentPage !== 1) {
                dispatch({
                    type: CHANGE_PAGE,
                    payload: state.currentPage - 1
                })
            }
        }
        else if (Number.isInteger(page)) {
            dispatch({
                type: CHANGE_PAGE,
                payload: page
            })
        }
    }

    const changeCarsPerPage = (width) => {
        switch(true) {
            case width > 1280:
              dispatch({ type: NUM_CARS, payload: 10 })
              break;
            case (width < 1280 && width > 1024):
              dispatch({ type: NUM_CARS, payload: 8 })
              break;
            case (width < 1024 && width > 768):
              dispatch({ type: NUM_CARS, payload: 9 })
              break;
            case (width < 768):
              dispatch({ type: NUM_CARS, payload: 10 })
              break;
            default:
              dispatch({ type: NUM_CARS, payload: 10 })
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
            changePage,
            changeCarsPerPage,
            createModal: state.createModal,
            currentPage: state.currentPage,
            carsPerPage: state.carsPerPage,
            indexOfLastPost: (state.currentPage * state.carsPerPage)
        }}
      >
          {props.children}
        </CarContext.Provider>
    )
};

export default CarState;