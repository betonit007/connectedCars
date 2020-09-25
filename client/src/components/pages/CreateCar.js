import React, { useState, useContext, useEffect } from 'react';
import CarContext from '../../context/cars/carContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';
import PreviewModal from './PreviewModal';
import CreateCarInputs from './CreateCarInputs'
import FileUpload from '../../components/cars/FileUpload'
import { initialState } from '../../utils/carInitialState'

const CreateCar = (props) => {

  const carContext = useContext(CarContext);
  const authContext = useContext(AuthContext);

  const { isAuthenticated, user } = authContext;
  const { createCar, cars } = carContext;

  const [loading, setLoading] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [nextStockNum, setNextStockNum] = useState(null);
  const [images, setImages] = useState([])
  const [carInfo, setCarInfo] = useState(initialState)

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/');
    }
    let nextStockNum = cars.reduce((acc, car) => {
      if (car.stockNo > acc) {
        return car.stockNo
      } else return acc
    }, 0)
    setNextStockNum(nextStockNum + 1);
  }, [])

  const handleAddCar = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      carInfo.photos = images.map(image => image.url)
      carInfo.stockNo = nextStockNum
      let res = await createCar(carInfo);
      console.log(res)
      setLoading(false);
      setCreateModal(res.data);
    } catch (error) {
      console.log(error);
    }

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
          setCreateModal={setCreateModal}
          history={props.history}
        />
      }
      <div className="w-full relative">
        <div className="text-2xl text-center m-4">Create A New Car</div>
        <form onSubmit={handleAddCar} className="m-auto bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4 lg:w-3/4">
          <CreateCarInputs carInfo={carInfo} setCarInfo={setCarInfo} />
          <input
            type='submit'
            value='Create Car'
            className='btn-blue cursor-pointer'
          />

          <FileUpload
            picLoading={picLoading}
            setPicLoading={setPicLoading}
            setImages={setImages}
            images={images}
            user={user}
          />
        </form>
      </div>
    </>
  )
}

export default CreateCar
