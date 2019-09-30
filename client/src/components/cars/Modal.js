import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import CarContext from '../../context/cars/carContext';


const Modal = props => {

    const carContext = useContext(CarContext);
    const { carUnPicked } = carContext;

    return ReactDOM.createPortal(
        <div onClick={()=>carUnPicked()} className='pin absolute flex items-center bg-black justify-center top-0 right-0 bottom-0 left-0 w-full h-full modal'>
            <div className='bg-white h-64 w-64 text-5xl rounded'>
                A MODEL
            </div>
        </div>, document.querySelector('#modal')

    );
}

export default Modal;