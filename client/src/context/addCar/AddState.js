import React, { useReducer } from 'react';
import axios from 'axios';
import AddContext from './addContext';
import addReducer from './addReducer';
import setAuthToken from '../../utils/setAuthToken';
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

    const loadAllToCloudinary = async () => {
        let cloudinaryUrls = [];
        delete axios.defaults.headers.common['x-auth-token'];  //cross-origin error if x-auth-token is in headers.
        await Promise.all(state.photos.map(async (photo) => {
            console.log(photo);
            try {
                const data = new FormData();
                data.append("file", photo);
                data.append("upload_preset", "reserve");
                data.append("cloud_name", REACT_APP_CLOUDINARY_PRESET);
                const response = await axios.post(REACT_APP_CLOUDINARY_URL, data);
                cloudinaryUrls.push(response.data.url);
                console.log('response of cloudinay', cloudinaryUrls);
            } catch (error) {
                console.log(error);
            } finally {
                setAuthToken();
            }
        }))
        return cloudinaryUrls;
    }

    const onSubmit = async () => {
        
        try {
            const arrayPhotos = await loadAllToCloudinary();
            return { ...state, photos: arrayPhotos };
        } catch (err) {
            console.log("ERROR SENDING PHOTOS TO CLOUDINARY", err);
        }
    }

    return (
        <AddContext.Provider
            value={{
                handleInput,
                onSubmit,
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