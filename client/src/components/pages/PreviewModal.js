import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import CreatePicScroller from './CreatePicScroller';
import CarContext from '../../context/cars/carContext';


const PreviewModal = ({ car, setCreateModal, history }) => {
    console.log(car)
    const carContext = useContext(CarContext);
    const { triggerCreateModal } = carContext;

    return ReactDOM.createPortal(
        <div className='absolute flex items-center bg-black justify-center top-0 right-0 bottom-0 left-0 w-full h-full modal'>
            <div className='flex flex-col justify-around bg-white modalVport text-5xl rounded'>
                <div className='h-full flex justify-center' >
                    {car ?
                        <CreatePicScroller
                            car={car}
                        />
                        :
                        <span>Loading....</span>
                    }
                </div>
                <div className='bg-gray-400 h-64 flex justify-center'>
                    <p className='text-lg'>{car.fullDesc}</p>
                </div>
                <div className='text-lg text-center p-2'>
                    <input
                        onClick={() => {
                            setCreateModal(false)
                            history.push("/cars")
                        }}
                        type='submit'
                        value='Confirm'
                        className='btn-blue cursor-pointer'
                    />
                </div>
            </div>
        </div>, document.querySelector('#modal')

    );
}

export default PreviewModal;