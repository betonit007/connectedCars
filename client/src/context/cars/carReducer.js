import {
    SET_ALERT,
    FILTER_CARS,
    CLEAR_FILTER,
    GET_CARS,
    CAR_PICKED,
    CAR_UNPICKED
} from '../types';

export default (state, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
}