import React, { useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom'; //withRouter adds history to props (history.push)
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/cars/carContext';

import CarIcon from './CarIcon.js';
import UserIcon from'./UserIcon';

const Navbar = props => {

  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearFilter } = contactContext;

  // useEffect(() => {
  //   const thisUrl = props.location.pathname;
  // }, [])

  const onLogout = () => {
    logout();
    props.history.push('/');
  }

  const authLinks = (
    <ul className='flex justify-center'>
      <li className='text-white pr-5'>
        <div className="flex"><UserIcon/>{user && user.name}</div>
      </li>
      <li className='text-white pr-5'>{props.location.pathname !== '/saved' ? <Link to='/saved'>Saved Cars</Link> : <Link to='/cars'>Inventory</Link>}</li>
      <li>
        <span onClick={onLogout} className="pr-5 text-white">Logout</span>
      </li>
    </ul>
  )

  const guestLinks = (
    <div className='flex justify-center text-white'>
      <ul className='flex'>
        <li className='px-3'>
          <Link to="/register">Register</Link>
        </li>

        <li className='px-3'>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  )

  return (
    <div className="bg-blue-500 w-full border h-20 flex items-center flex-wrap mb-5">
      <div className='m-auto'>
        <div className="flex w-full pr-5 justify-center">
          <Link to='/'> <CarIcon /> </Link>
          <span className='text-2xl text-white italic'>Connected Cars</span>
        </div>
      </div>
      <div className="flex w-full justify-center md:w-2/3 md:justify-end md:pr-10">
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </div >
  )
}

export default withRouter(Navbar);