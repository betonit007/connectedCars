import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import CarContext from '../../context/cars/carContext';
import AuthContext from '../../context/auth/authContext';
import AddContext from '../../context/addCar/addContext';
import Spinner from '../layout/Spinner';
import PreviewModal from './PreviewModal';


const CreateCar = (props) => {

  const carContext = useContext(CarContext);
  const authContext = useContext(AuthContext);
  const addContext = useContext(AddContext);

  const { isAuthenticated } = authContext;
  const { createCar, cars } = carContext;
  const { handleInput, onSubmit } = addContext;

  const [loading, setLoading] = useState(false);
  const [createModal, setCreateModal] = useState(null);
  const [nextStockNum, setNextStockNum] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/');
    }
    let nextStockNum = cars.reduce((acc, car) => {
      console.log(car.stockNo);
      if (car.stockNo > acc) {
        return car.stockNo
      } else return acc
    }, 0)
    setNextStockNum(nextStockNum + 1);
  }, [])

  const handleAddCar = async (e) => {
    e.preventDefault();
    setLoading(true);
    let allCarData = await onSubmit();
    allCarData.stockNo = nextStockNum
    let res = await createCar(allCarData);
    console.log('car created', res);
    setLoading(false);
    setCreateModal(res.data);
  }

  if (loading) {
    return (
      <>
        <Spinner />
        <div className="text-center">Adding Car to Database...</div>
      </>
    )
  }
  return (
    <>
      {
        createModal &&
        <PreviewModal
          car={createModal}
        />
      }
      <div className="w-full">
        <div className="text-2xl text-center m-4">Create A New Car</div>
        <form onSubmit={handleAddCar} className="m-auto bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4 lg:w-3/4">
          <div className='mb-4 w-full'>
            <label className='block text-gray-700 text-sm font-bold mb-2' >Full Description</label>
            <input className='shadow appearance-none border-rounded w-full'
              type='text'
              name='fullDesc'
              value={addContext.fullDesc}
              onChange={handleInput}
              required
            />
          </div>
          <div className='flex secondRow'>
            <div className='mb-4 w-full md:w-1/3 ml-2'>
              <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Year</label>
              <input className='shadow appearance-none border-rounded w-full'
                type='number'
                name='year'
                value={addContext.year}
                onChange={handleInput}
                required
              />
            </div>

            <div className='mb-4 w-full md:w-1/3 ml-2'>
              <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Make</label>
              <input className='shadow appearance-none border-rounded w-full'
                type='text'
                name='make'
                value={addContext.make}
                onChange={handleInput}
                required
              />
            </div>
            <div className='mb-4 w-full md:w-1/3'>
              <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Model</label>
              <input className='shadow appearance-none border-rounded w-full'
                type='text'
                name='model'
                value={addContext.model}
                onChange={handleInput}
                required
              />
            </div>
          </div>
          <div className='flex thirdRow'>
            <div className='mb-4 w-full md:w-1/3'>
              <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Transmission</label>
              <input className='shadow appearance-none border-rounded w-full'
                type='text'
                name='transmission'
                defaultValue={handleInput}
                required
              />
            </div>
            <div className='mb-4 w-full md:w-1/3 ml-2'>
              <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Color</label>
              <input className='shadow appearance-none border-rounded w-full'
                type='text'
                name='color'
                value={addContext.color}
                onChange={handleInput}
                required
              />

            </div>

            <div className='mb-4 w-full md:w-1/3 ml-2'>
              <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Trim</label>
              <input className='shadow appearance-none border-rounded w-full'
                type='text'
                name='trim'
                value={addContext.trim}
                onChange={handleInput}
                required
              />
            </div>
          </div>
          <div className='flex fourthRow'>
            <div className='mb-4 w-full md:w-1/3'>
              <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Mileage</label>
              <input className='shadow appearance-none border-rounded w-full'
                type='text'
                name='mileage'
                value={addContext.mileage}
                onChange={handleInput}
                required
              />
            </div>
            <div className='mb-4 w-full md:w-1/3 ml-2'>
              <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Displacement</label>
              <input className='shadow appearance-none border-rounded w-full'
                type='number'
                name='displacement'
                value={addContext.displacement}
                onChange={handleInput}
                required
              />
            </div>
            <div className='mb-4 w-full md:w-1/3 ml-2'>
              <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Body Type</label>
              <input className='shadow appearance-none border-rounded w-full'
                type='text'
                name='bodyType'
                value={addContext.bodyType}
                onChange={handleInput}
                required
              />
            </div>
          </div>
          <div className='mb-4 w-full'>
            <label className='block text-gray-700 text-sm font-bold mb-2' >Secondary Description</label>
            <input className='shadow appearance-none border-rounded w-full'
              type='text'
              name='secondDesc'
              value={addContext.secondDesc}
              onChange={handleInput}
              required
            />
          </div>
          {addContext.photos.length > 0 &&
            <div className='flex flex-wrap justify-around'>
              {addContext.photos.map((url, index) => (
                <img className='h-20 p-1' key={index} src={window.URL.createObjectURL(url)} />
              ))}
            </div>
          }
          <div className="flex w-full items-center justify-center bg-grey-lighter">
            <label className="flex flex-col items-center p-1 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-500">
              <svg className="w-16 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">Select Photos</span>
              <input type='file' name='photos' className="hidden" onChange={handleInput} />
            </label>
          </div>
          <input
            type='submit'
            value='Create Car'
            className='btn-blue'
          />
        </form>
      </div>
    </>
  )
}

export default CreateCar
