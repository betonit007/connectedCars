import {
  SET_ALERT,
  CLEAR_CURRENT,
  UPDATE_CURRENT,
  FILTER_CARS,
  CLEAR_FILTER,
  SET_CURRENT,
  GET_CARS
} from '../types';

export default (state, action) => {
    switch(action.type) {
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
        default:
            return state;
    }
}