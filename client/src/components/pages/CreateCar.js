import React, { useState, useContext, useEffect } from 'react';
import CarContext from '../../context/cars/carContext';
import AuthContext from '../../context/auth/authContext';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import { set } from 'mongoose';


const CreateCar = (props) => {

  const carContext = useContext(CarContext);
  const authContext = useContext(AuthContext);

  const { isAuthenticated } = authContext;
  const { createCar } = carContext;

  const { cars } = carContext;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/');
    }
    let nextStockNumber = cars.reduce((acc, car) => {
      if (car.stockNo > acc) {
        return car.stockNo
      } else {
        return acc
      }
    }, 0)

    setCar({ ...car, stockNo: nextStockNumber + 1 });
  }, [])

  const INITIAL_STATE = {
    fullDesc: '1',
    stockNo: "19",
    year: 2015,
    make: '1',
    model: '1',
    color: '1',
    cylinder: "1",
    displacement: "1",
    mileage: "1",
    bodyType: '1',
    secondDesc: '1',
    options: [],
    photos: [],
    mediaUrls: []
  }

  const [ car, setCar ] = useState(INITIAL_STATE)


  // const onSubmit = e => {
  //   e.preventDefault();
  //   createCar(car);

  // }



  const onChange = e => {
    const { name, value, files } = e.target;
    console.log("Name: ", name);
    console.log("Value: ", value)
    console.log("Files: ", files);
    if (name === 'photos') {

      setCar({ ...car, photos: [...car.photos, files[0]] })
    }
    else {
      setCar({ ...car, [name]: value })
    }
  }

  const loadAllToCloudinary = async () => {
    let cloudinaryUrls = [];
    delete axios.defaults.headers.common['x-auth-token'];
    await Promise.all(car.photos.map(async (photo) => {
      console.log(photo);
      try {
        const data = new FormData();
        data.append("file", photo);
        data.append("upload_preset", "reserve");
        data.append("cloud_name", "dmhvg04zl");
        const response = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
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


  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      //setLoading(true);
      //setError('');
      const arrayPhotos = await loadAllToCloudinary();
      createCar(car, arrayPhotos);
    } catch (err) {
      console.log("ERROR SENDING PHOTOS TO CLOUDINARY", err);
    }
  }

  return (
    <div className="w-full">
      <div className="text-2xl text-center m-4">Create A New Car</div>
      <form onSubmit={onSubmit} className="m-auto bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4 lg:w-3/4">
        <div className='mb-4 w-full'>
          <label className='block text-gray-700 text-sm font-bold mb-2' >Full Description</label>
          <input className='shadow appearance-none border-rounded w-full'
            type='text'
            name='fullDesc'
            value={car.fullDesc}
            onChange={onChange}
            required
          />
        </div>
        <div className='flex secondRow'>
          <div className='mb-4 w-full md:w-1/3'>
            <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Stock Number</label>
            <input className='shadow appearance-none border-rounded w-full'
              type='number'
              name='stockNo'
              value={car.stockNo}
              onChange={onChange}
              required
            />
          </div>
          <div className='mb-4 w-full md:w-1/3 ml-2'>
            <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Year</label>
            <input className='shadow appearance-none border-rounded w-full'
              type='number'
              name='year'
              value={car.year}
              onChange={onChange}
              required
            />
          </div>

          <div className='mb-4 w-full md:w-1/3 ml-2'>
            <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Make</label>
            <input className='shadow appearance-none border-rounded w-full'
              type='text'
              name='make'
              value={car.make}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className='flex thirdRow'>
          <div className='mb-4 w-full md:w-1/3'>
            <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Model</label>
            <input className='shadow appearance-none border-rounded w-full'
              type='text'
              name='model'
              value={car.model}
              onChange={onChange}
              required
            />
          </div>
          <div className='mb-4 w-full md:w-1/3 ml-2'>
            <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Color</label>
            <input className='shadow appearance-none border-rounded w-full'
              type='text'
              name='color'
              value={car.color}
              onChange={onChange}
              required
            />

          </div>

          <div className='mb-4 w-full md:w-1/3 ml-2'>
            <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Cylinder</label>
            <input className='shadow appearance-none border-rounded w-full'
              type='number'
              name='cylinder'
              value={car.cylinder}
              onChange={onChange}
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
              value={car.mileage}
              onChange={onChange}
              required
            />
          </div>
          <div className='mb-4 w-full md:w-1/3 ml-2'>
            <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Displacement</label>
            <input className='shadow appearance-none border-rounded w-full'
              type='number'
              name='displacement'
              value={car.displacement}
              onChange={onChange}
              required
            />
          </div>
          <div className='mb-4 w-full md:w-1/3 ml-2'>
            <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Body Type</label>
            <input className='shadow appearance-none border-rounded w-full'
              type='text'
              name='bodyType'
              value={car.bodyType}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className='mb-4 w-full'>
          <label className='block text-gray-700 text-sm font-bold mb-2' >Secondary Description</label>
          <input className='shadow appearance-none border-rounded w-full'
            type='text'
            name='secondDesc'
            value={car.secondDesc}
            onChange={onChange}
            required
          />
        </div>
        <div className="flex w-full items-center justify-center bg-grey-lighter">
          <label className="flex flex-col items-center p-1 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-500">
            <svg className="w-16 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Select Photos</span>
            <input type='file' name='photos' className="hidden" onChange={onChange} />
          </label>
        </div>
        <input
          type='submit'
          value='Create Car'
          className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer'
        />
      </form>
    </div>
  )
}

export default CreateCar
