import React, { Fragment, useContext, useEffect } from 'react';
import CarContext from '../../context/cars/carContext';
import AuthContext from '../../context/auth/authContext';
import CarCard from './CarCard';
import CarSearch from './CarSearch';
import Modal from './Modal';
import Paginate from '../layout/Paginate';
import Spinner from '../layout/Spinner';

const Cars = () => {
  const carContext = useContext(CarContext);
  const authContext = useContext(AuthContext);
  const { cars, filtered, carPicked, carSelected, carsPerPage, indexOfLastPost, changePage, currentPage } = carContext;
  const { saveVehicle, user, saved } = authContext;

  useEffect(() => {
    carContext.getCars();
    authContext.loadUser();
    carContext.changeCarsPerPage(window.innerWidth);
    //Change num of cars render based on the screen width (prevents uneven row)
    window.addEventListener("resize", ()=>carContext.changeCarsPerPage(window.innerWidth))
    //carContext.changeCarsPerPage(window.innerWidth); //set num per page just on intial load
  }, [])

  
//    TESTING ABILITY TO SHUFFLE CARS WHEN RETURNING TO INVENTORY
  // const shuffle = (array) => {
  //   if (true) return array
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // }

  if (filtered !== null && filtered.length === 0) {

    return (
      <Fragment>
        <CarSearch />
        <p className='w-full flex justify-center text-red-600'>No vehicles found, please revise your search!</p>
      </Fragment>
    )
  }


  return (
    <Fragment>
      <CarSearch />
      {carSelected && <Modal

      />
      }
      <div className={!cars ? `` : (filtered ? `flex flex-wrap justify-center` : `grid`)}>   {/*No Styling if loading / use grid if not filter / use wrap if filtered */}
        {!cars ? <Spinner /> :
          (
            !filtered ?
              cars.slice((indexOfLastPost - carsPerPage), indexOfLastPost).map(car => //paginate / map over selected vehicles.
                (
                  <CarCard
                    key={car._id}
                    car={car}
                    user={user && user._id}
                    saveVehicle={saveVehicle}
                    saved={saved ? saved.indexOf(car._id) > -1 : false}
                    carPicked={carPicked}
                  />
                )
              )
              :
              (
                filtered.map(car => (
                  <CarCard
                    key={car._id}
                    car={car}
                    user={user && user._id}
                    saveVehicle={saveVehicle}
                    saved={saved ? saved.indexOf(car._id) > -1 : false}
                    carPicked={carPicked}
                  />
                )
                )
              )
          )
        }
      </div>
      {
        (cars && filtered === null) && 
        <Paginate
          pageNumbers={cars.length / carsPerPage}
          changePage={changePage}
          currentPage={currentPage}
        />
      }
    </Fragment>
  )
}

export default Cars;