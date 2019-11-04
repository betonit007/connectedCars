import {
    SET_ALERT,
    FILTER_CARS,
    CLEAR_FILTER,
    GET_CARS,
    CAR_PICKED,
    CAR_UNPICKED,
    ADD_CAR,
    CREATE_MODAL,
    UPDATE_CAR
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_CAR:
            return {
                ...state,
                cars: [...state.cars, action.payload],
                loading: false
            }
        case GET_CARS:
            return {
                ...state,
                cars: action.payload,
                loading: false
            }
        case FILTER_CARS:
            return {
                ...state,
                filtered: state.cars.filter(car => {
                    const regex = new RegExp(`${action.payload}`, 'gi'); //match wether upper or lower case
                    return car.fullDesc.match(regex);
                })
            }
        case UPDATE_CAR:
            const newCarArray = state.cars.reduce((acc, car) => {
              if (action.payload._id !== car._id) {
                  return {...acc, car}
              } else { 
                  return [...acc, action.payload]
              }
            }, [])
            return {
                ...state,
                car: newCarArray
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        case CAR_PICKED:
            return {
                ...state,
                carSelected: true,
                carInfo: state.cars.filter(car => car._id === action.payload)
            }
        case CAR_UNPICKED:
            return {
                ...state,
                carSelected: false,
                carInfo: null
            }
        case CREATE_MODAL:
            return {
                ...state,
                createModal: action.payload
            }
        default:
            return state;
    }
}