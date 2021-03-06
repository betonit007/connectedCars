import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    LOGIN_SUCCESS,
    SAVE_CAR,
    UNSAVE_CAR,
    SET_LOADING
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                saved: action.payload.savedCars
            }
        case UNSAVE_CAR:
                return {
                    ...state,
                    loading: false,
                    saved: state.saved.filter(car => car !== action.payload)
                }
        case SAVE_CAR:
            return {
                ...state,
                loading: false,
                saved: action.payload.savedCars
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token) //registration successful so set token to local storage
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
        case LOGIN_FAIL:
            localStorage.removeItem('token') //romove any token in storage since login failed.
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
                saved: []
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}