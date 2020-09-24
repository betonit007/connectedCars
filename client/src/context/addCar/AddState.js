import React, { useReducer } from 'react';
import AddContext from './addContext';
import addReducer from './addReducer';
import {
    RECIEVE_INPUT
} from '../types';

const AddState = props => {

    const initialState = {
        fullDesc: '',
        transmission: '',
        stockNo: '',
        year: 2015,
        make: '',
        model: '',
        color: '',
        cylinder: "",
        displacement: "",
        mileage: "",
        bodyType: '',
        secondDesc: '',
        trim: '',
        options: [],
        photos: [],
        mediaUrls: [],
        previewURLS: [],
    };

    const [state, dispatch] = useReducer(addReducer, initialState);

    //Set Alert
    const handleInput = (e) => {
        e.preventDefault();
        dispatch({
            type: RECIEVE_INPUT,
            payload: e.target
        });
    }


    return (
        <AddContext.Provider
            value={{
                handleInput,
                fullDesc: state.fullDesc,
                stockNo: state.stockNo,
                year: state.year,
                make: state.make,
                model: state.model,
                color: state.color,
                cylinder: state.cylinder,
                displacement: state.displacement,
                mileage: state.mileage,
                bodyType: state.bodyType,
                secondDesc: state.secondDesc,
                options: state.options,
                photos: state.photos,
                mediaUrls: state.mediaUrls,
                previewURLS: state.previewURLS,
            }}
        >
            {props.children}
        </AddContext.Provider>
    )
};
export default AddState;