import React, { Fragment, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/cars/carContext';

import CarIcon from './CarIcon.js';

const Navbar = props => {

  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearFilter } = contactContext;

  const onLogout = () => {
    logout();
    props.history.push('/');
  }

  const authLinks = (
    <ul className='flex justify-end'>
      <li className='text-white pr-5'>
        <span>Welcome {user && user.name}!</span>
      </li>
      <li className='text-white pr-5'><Link to='/saved'>Saved Cars</Link></li>
      <li>
        <span onClick={onLogout} className="pr-5 text-white">Logout</span>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul className='flex justify-end'>
      <li className='px-5 text-white'>
        <Link to="/register" >Register</Link>
      </li>

      <li>
        <Link to="/login" className='text-white'>Login</Link>
      </li>
    </ul>
  )

  return (
    <div className="bg-blue-500 w-full border h-20 flex items-center flex-wrap mb-5">
      <div className="flex w-full px-5 justify-center md:w-1/3 md:px-5">
       <Link to='/'> <CarIcon /> </Link>
        <span className='text-2xl text-white italic'>Connected Cars</span>
      </div>
      <div className="flex w-full justify-center md:w-2/3 md:justify-end md:pr-10">
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </div >
  )
}

export default withRouter(Navbar);